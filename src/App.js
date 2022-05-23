import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Crossword from './components/Crossword';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';

import Checkbox from './components/Checkbox';
import './App.scss';
import MoonIcon from './assets/MoonIcon';
import SunIcon from './assets/SunIcon';

function initialColorScheme() {
  const color = localStorage.getItem("crossword_color_scheme");

  if (color === 'dark' || color === 'light') {
    return color;
  }
  
  if (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches) {
    return 'dark';
  }

  return 'light';
}

function App() {

  const [msgDecrypted, setMsgDecrypted] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(() => isMobile);
  const [cypher, setCypher] = useState(null);

  const [colorScheme, setColorScheme] = useState(() => initialColorScheme());

  useEffect(() => {
    const fetchCypher = async () => {
      const res = await fetch('/cypher.txt');
      const data = await res.text();
      setCypher(data);
    }

    fetchCypher();
  }, []);

  const toggleColorScheme = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('crossword_color_scheme', newScheme);
    setColorScheme(newScheme);
  }

  return (
    <div className={classNames("App", `__scheme-${colorScheme}`)}>
      <div role='button' onClick={toggleColorScheme} className='theme-toggle'>
        { colorScheme === 'dark' ? <SunIcon /> : <MoonIcon /> }
      </div>
      <h1 className='narrow'>A Bounty Hides Behind This Crossword</h1>

      <section className='crossword-explanation'>
        <Crossword solved={msgDecrypted} onSolvePuzzle={msg => setMsgDecrypted(msg)} showKeyboard={showKeyboard} cypher={cypher} />
        <div className='instructions'>
          <p>Decipher the following crossword, and you will find a handsome magic bounty that can be claimed quickly and economically by <b>anyone in the world,</b> regardless of nationality, social class, or background. Hurry up before someone takes it first!</p>

          <h3>USEFUL SHORTCUTS</h3>

          <ul>
            <li><strong>Tab:</strong> Switch between words.</li>
            <li><strong>Arrow Keys:</strong> Move between cells.</li>
            <li><strong>Alt / Cmd:</strong> Switch between two words in a cross.</li>
            <li><strong>Backspace:</strong> Delete a letter.</li>
          </ul>

          { !msgDecrypted && <div className='keyboard-toggle'><Checkbox checked={showKeyboard} onChange={() => setShowKeyboard(!showKeyboard)}>Show On Screen Keyboard</Checkbox></div> }
        </div>        
      </section>

      { msgDecrypted && (
        <div className='message'>
          <ReactMarkdown children={msgDecrypted} />
        </div>
      )}

      { !msgDecrypted && (
        <div className='clues'>
          <h2>WORD HINTS</h2>

          <ol>
            <li>Institutions that custody your hard work but frequently <em>lend it out with barely fraction in reserves.</em></li>
            <li>A common verb.</li>
            <li>Fiat money is ___ backed by any commodity.</li>
            <li><em>All ____ base are belong to us.</em></li>
            <li>Those whom we can trust.</li>
          </ol>

          <h2>CLUES</h2>

          <ul>
            <li>A letter "E" was discovered by <a href="https://www.reddit.com/r/Bitcoin/comments/uva9za/comment/i9kaxf9/?utm_source=reddit&utm_medium=web2x&context=3">PerformanceVarious45</a>.</li>
            <li>Words are all in English, and together they form a complete, simple sentence in English.</li>
            <li>No knowledge about the BIP-39 wordlist is needed or was used as a reference for this crossword.</li>
            <li>Pizza Day and Laszlo Hanyecz are not related, just honored because of the date: May 22nd.</li>
            <li>Instead, Bitcoin, Satoshi Nakamoto, and the <strong>Genesis Block</strong> are all part of the riddle.</li>
          </ul>
        </div>
      )}

      <div className={classNames({'keyboard-visible': showKeyboard && !msgDecrypted })}>Created by <a href='https://handsomelatino.com'>handsomelatino.com</a><a href="https://mempool.space/address/bc1qe926cfhzyh438fyvn9snyrcrsfujp6ur3zcrrn" target="_blank" rel="noreferrer"><pre>bc1qe926cfhzyh438fyvn9snyrcrsfujp6ur3zcrrn</pre></a></div>
      
    </div>
  );
}

export default App;
