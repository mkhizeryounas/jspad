import { useState } from 'react';

import Split from 'react-split';

import Console from './components/Console';
import Runner from './components/Runner';
import Account from './components/Account';
import LeftPanel from './components/LeftPanel';

import { getSessionRef } from './utils/firebase';
import { getName } from './utils/localstorage';
import { ToastProvider } from 'react-toast-notifications';

import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';

const App = () => {
  const [userName, setUserName] = useState(getName());

  const [script, setScript] = useState(
    '// JavaScript Editing with JSPad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}\ngo();'
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
    <ToastProvider autoDismiss autoDismissTimeout={6000}>
      <div className='App'>
        {userName ? (
          <Split sizes={[70, 30]} gutterSize={5}>
            <LeftPanel
              script={script}
              setScript={(value) => {
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
              <Account />
            </div>
          </Split>
        ) : (
          <Account
            handleUsernameChange={(name) => {
              setUserName(name);
            }}
          />
        )}
      </div>
    </ToastProvider>
  );
};

export default App;
