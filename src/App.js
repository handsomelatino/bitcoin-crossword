// import { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import Crossword from './components/Crossword';
// import { isMobile } from 'react-device-detect';
// import classNames from 'classnames';

// import Checkbox from './components/Checkbox';
import './App.scss';

function App() {

  // const [msgDecrypted, setMsgDecrypted] = useState(null);
  // const [showKeyboard, setShowKeyboard] = useState(() => isMobile);
  // const [cypher, setCypher] = useState(null);

  // useEffect(() => {
  //   const fetchCypher = async () => {
  //     const res = await fetch('/cypher.txt');
  //     const data = await res.text();
  //     setCypher(data);
  //   }

  //   fetchCypher();
  // }, []);

  return (
    <div className="App">
      {/* <h1 className='narrow'>A Bounty Hides Behind This Crossword</h1>

      <section className={classNames('crossword-explanation', { 'keyboard-visible': showKeyboard && !msgDecrypted })}>
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
 */}
      <div>Created by <a href='https://handsomelatino.com'>handsomelatino.com</a> <pre>add</pre></div>
      
    </div>
  );
}

export default App;
