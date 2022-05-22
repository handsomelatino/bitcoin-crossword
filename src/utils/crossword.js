export const HORIZONTAL = 'horizontal';
export const VERTICAL = 'vertical';

export const GRID_WIDTH = 5;
export const GRID_HEIGHT = 9;

/**
 * Array of words 
 */
export const CROSSWORD_LIST = [
  { x: 2, y: 0, length: 3, direction: VERTICAL },
  { x: 4, y: 0, length: 7, direction: VERTICAL },
  { x: 1, y: 1, length: 4, direction: HORIZONTAL },
  { x: 0, y: 6, length: 5, direction: HORIZONTAL },
  { x: 1, y: 6, length: 3, direction: VERTICAL },
];

export const GRID = (function() {
  const grid = new Array(GRID_HEIGHT);
  
  for (let i = 0; i < GRID_HEIGHT; ++i) {
    grid[i] = new Array(GRID_WIDTH).fill(null);
  }

  const addItem = (letter, i , j) => {
    grid[j][i] = (grid[j][i] === null) ? [letter] : [...grid[j][i], letter];
  }

  CROSSWORD_LIST.forEach((word, index) => {
    const i = word.x;
    const j = word.y;

    for (let d = 0; d < word.length; d++) {
      const wordLetter = { wordIndex: index, charPosition: d };
      word.direction === HORIZONTAL ? addItem(wordLetter, i + d, j) : addItem(wordLetter, i, j + d);
    }
  });

  return grid;
}
)();
