import { useState } from 'react';

import Split from 'react-split';

import Codepad from './components/Codepad';
import Console from './components/Console';
import Runner from './components/Runner';
import Account from './components/Account';
import { getSessionRef } from './utils/firebase';

import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';

const App = () => {
  const [script, setScript] = useState(
    '// JavaScript Editing with Pushgun!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}\ngo();'
  );
  const [output, setOutput] = useState(null);

  const fb = getSessionRef().child('output');

  fb.on('value', (snapshot) => {
    let val = snapshot.val();
    if (val) {
      if (!output || (output && val && output?.date !== val?.date)) {
        setOutput(val);
      }
    }
  });

  return (
    <div className='App'>
      <Split sizes={[60, 40]} gutterSize={5}>
        <Codepad
          value={script}
          onChange={(value) => {
            setScript(value);
          }}
        />
        <div>
          <Console output={output} />
          <Runner
            script={script}
            onOutput={(value) => {
              fb.set(value);
            }}
          />
        </div>
      </Split>
      <Account />
    </div>
  );
};

export default App;
