import { useEffect, useRef, useState } from 'react';

import Firepad from 'firepad';
import { getSessionRef } from '../../utils/firebase';

import './style.css';

const CodeMirror = window.CodeMirror;

const Component = (props) => {
  const { className = '' } = props;
  const firepadDivRef = useRef();
  let firepad;

  useEffect(() => {
    init();
  }, []);

  function init() {
    const sel = document.getElementById('firepad-container');
    if (sel.innerHTML) return;
    // Get Firebase Database reference.

    let firepadRef = getSessionRef();
    // Create CodeMirror (with line numbers and the JavaScript mode).
    let codeMirror = CodeMirror(sel, {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'material',
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: false,
      keyMap: 'sublime',
      continueComments: true,
      extraKeys: {
        'Ctrl-S': () => {},
        'Cmd-S': () => {},
        'Alt-Space': 'autocomplete',
        'Ctrl-Space': 'autocomplete',
      },
    });
    codeMirror.on('keyup', function (cm, event) {
      props.onChange && props.onChange(cm.getValue());
    });

    firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      defaultText:
        '// JavaScript Editing with Pushgun!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}',
    });
    firepad.on('ready', () => {
      props.onChange && props.onChange(firepad.getText());
    });
    window.firepad = firepad;
  }

  return (
    <div className={`codepad  ${className}`}>
      <div ref={firepadDivRef} id='firepad-container'></div>
    </div>
  );
};

export default Component;
