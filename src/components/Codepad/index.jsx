import { useEffect, useRef } from 'react';
import { getSessionRef } from '../../utils/firebase';
import './style.css';

const CodeMirror = window.CodeMirror;
const Firepad = window.Firepad;

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
      defaultText: props.value,
    });
    firepad.on('ready', () => {
      props.onChange && props.onChange(firepad.getText());
    });
    firepad.on('synced', function (isSynced) {
      props.onChange && props.onChange(firepad.getText());
    });
  }

  return (
    <div className={`codepad  ${className}`}>
      <div ref={firepadDivRef} id='firepad-container'></div>
    </div>
  );
};

export default Component;
