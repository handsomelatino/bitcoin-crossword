import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Keyboard from 'react-simple-keyboard';
import useEventCallback from '../utils/useEventCallback';
import Confetti from 'react-dom-confetti';

import { CROSSWORD_LIST, GRID, GRID_HEIGHT, GRID_WIDTH, HORIZONTAL } from '../utils/crossword';
import { decodeMessage } from '../utils/codec';
import { KEYBOARD_DISPLAY, KEYBOARD_LAYOUT } from '../utils/keyboard';

import 'react-simple-keyboard/build/css/index.css';
import './Crossword.scss';

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const initializeWords = () => {
  const words = Array(CROSSWORD_LIST.length);

  for (let i = 0; i < words.length; ++i) {
    words[i] = '.'.repeat(CROSSWORD_LIST[i].length);
  }

  // A letter was discovered on the thumbnail image by reditto: PerformanceVarious45
  // https://www.reddit.com/r/Bitcoin/comments/uva9za/comment/i9kaxf9/?utm_source=reddit&utm_medium=web2x&context=3
  words[4] = '..E';

  return words;
}

const initializeLetters = () => {
  const letters = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(''));

  // A letter was discovered on the thumbnail image by reditto: PerformanceVarious45
  // https://www.reddit.com/r/Bitcoin/comments/uva9za/comment/i9kaxf9/?utm_source=reddit&utm_medium=web2x&context=3
  letters[8][1] = 'E';

  return letters;
}

export default function Crossword({ solved, onSolvePuzzle, showKeyboard, cypher }) {

  const [words, setWords] = useState(() => initializeWords());
  const [letters, setLetters] = useState(() => initializeLetters());
  const [activeColumn, setActiveColumn] = useState(CROSSWORD_LIST[0].x);
  const [activeRow, setActiveRow] = useState(CROSSWORD_LIST[0].y);
  const [selectedActiveWord, setSelectedActiveWord] = useState(0);

  const changeActiveCell = (i, j) => {
    setActiveColumn(j);
    setActiveRow(i);

    // if not word is selected, choose the first word
    if (!selectedActiveWord || GRID[i][j].findIndex(word => word.wordIndex === selectedActiveWord) === -1) {
      setSelectedActiveWord(GRID[i][j][0].wordIndex);
    }
  }
  
  const onCellKeyDown = useEventCallback(e => {
    if (solved) {
      return;
    }

    // Backspace -> clear the letter and move the cursor back
    if (e.key === 'Backspace') {
      const newWords = JSON.parse(JSON.stringify(words));
      const wordLetters = GRID[activeRow][activeColumn];

      const newLetters = JSON.parse(JSON.stringify(letters));
      newLetters[activeRow][activeColumn] = '';
      setLetters(newLetters);

      wordLetters.forEach(word => {
        const w = newWords[word.wordIndex];
        newWords[word.wordIndex] = w.substring(0, word.charPosition) + '.' + w.substring(word.charPosition + 1);
        setWords(newWords);
      });

      const cursorWord = wordLetters.find(word => word.wordIndex === selectedActiveWord);

      if (cursorWord.charPosition > 0) {
        CROSSWORD_LIST[cursorWord.wordIndex].direction === HORIZONTAL ? changeActiveCell(activeRow, activeColumn - 1) : changeActiveCell(activeRow - 1, activeColumn);
      }
    }

    // Alt / Cmd -> switch between possible active words (horizontal vs vertical)
    else if (e.key === 'Meta' || e.key === 'Meta') {
      const wordLetters = GRID[activeRow][activeColumn];

      if (wordLetters.length > 1) {
        setSelectedActiveWord(wordLetters.find(word => word.wordIndex !== selectedActiveWord).wordIndex);
      }
    }

    // Tab -> cycle between words:
    else if (e.key === 'Tab') {
      e.preventDefault?.();
      
      const wordIndex = CROSSWORD_LIST.findIndex((_, index) => index === selectedActiveWord);

      const nextIndex = (CROSSWORD_LIST.length + (wordIndex + (e.shiftKey ? -1 : 1))) % CROSSWORD_LIST.length;
      changeActiveCell(CROSSWORD_LIST[nextIndex].y, CROSSWORD_LIST[nextIndex].x);
      setSelectedActiveWord(nextIndex);
    }

    // Arrow keys -> move between cells
    else if (e.keyCode >= 37 && e.keyCode <= 40) {

      e.preventDefault?.();

      const moveCursor = (i, j) => {
        GRID[i][j] && changeActiveCell(i, j);
      }

      switch (e.key) {
        case 'ArrowUp':
          moveCursor(activeRow - 1, activeColumn);
          break;

        case 'ArrowDown':
          moveCursor(activeRow + 1, activeColumn);
          break;

        case 'ArrowLeft':
          moveCursor(activeRow, activeColumn - 1);
          break;

        default:
        case 'ArrowRight':
          moveCursor(activeRow, activeColumn + 1);
          break;
      }
    }
    
    else if (e.keyCode >= 65 && e.keyCode <= 90) {
      const newLetters = JSON.parse(JSON.stringify(letters));
      newLetters[activeRow][activeColumn] = e.key.toUpperCase();
      setLetters(newLetters);

      const wordLetters = GRID[activeRow][activeColumn];
      const newWords = JSON.parse(JSON.stringify(words));

      wordLetters.forEach(word => {
        const w = newWords[word.wordIndex];
        newWords[word.wordIndex] = w.substring(0, word.charPosition) + e.key.toUpperCase() + w.substring(word.charPosition + 1);
        setWords(newWords);
      });

      const cursorWord = wordLetters.find(word => word.wordIndex === selectedActiveWord);

      if (cursorWord.charPosition < CROSSWORD_LIST[cursorWord.wordIndex].length - 1) {
        CROSSWORD_LIST[cursorWord.wordIndex].direction === HORIZONTAL ? changeActiveCell(activeRow, activeColumn + 1) : changeActiveCell(activeRow + 1, activeColumn);
      }

      if (!newWords.find(word => word.includes('.'))) {
        const message = decodeMessage(cypher, newWords);

        if (message) {
          onSolvePuzzle(message);
        }
      }
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', onCellKeyDown);

    return () => {
      window.removeEventListener('keydown', onCellKeyDown);
    }
  }, [onCellKeyDown]);

  // Translate on-screen Keyboard to key press (synthetic event):
  const onKeyboardPress = button => {
    
    if (!button) {
      return;
    }

    switch (button) {
      case '{bksp}':
        return onCellKeyDown({ key: 'Backspace' });

      case '{tab}':
        return onCellKeyDown({ key: 'Tab' });

      case '{alt}':
        return onCellKeyDown({ key: 'Meta' });

      default:
        return onCellKeyDown({ key: button[0], keyCode: button.charCodeAt(0) });
    }
  }

  const renderCellLetter = (i, j) => {
    const classes = classNames('cell letter', { inputting: !solved && i === activeRow && j === activeColumn, active: !solved && GRID[i][j].findIndex(word => word.wordIndex === selectedActiveWord) !== -1 })

    return (
      <div key={j} className={classes} onClick={() => changeActiveCell(i, j)}>
        <span>{ letters[i][j] }</span>
        <div className='caret' />
      </div>
    );
  }

  return (
    <>
      <div className={classNames('__crossword', { solved: solved })}>
        <div className='confetti confetti-1'><Confetti active={solved} config={confettiConfig} /></div>
        <div className='confetti confetti-2'><Confetti active={solved} config={{ ...confettiConfig, stagger: 1000 }} /></div>
        <div className='confetti confetti-3'><Confetti active={solved} config={{ ...confettiConfig, STAGGER: 2000 }} /></div>
        { GRID.map((row, i) => (
          <div key={i} className='row'>
          { row.map((column, j) => (
            column === null
            ? <div key={j} className='cell empty' />
            : renderCellLetter(i, j)
          ))}
        </div>
      ))}
    </div>
    
    { !solved && showKeyboard && (
      <Keyboard onKeyPress={onKeyboardPress} layout={KEYBOARD_LAYOUT} display={KEYBOARD_DISPLAY} />
    )}
  </>
  );
}