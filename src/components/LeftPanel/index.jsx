import Split from 'react-split';
import Codepad from '../Codepad';
// import Meet from '../Meet';

const Component = (props) => {
  return (
    <div>
      <Split
        // sizes={[60, 40]}
        sizes={[100]}
        gutterSize={5}
        style={{ display: 'block', width: '100%' }}
        direction='vertical'
      >
        <Codepad
          value={props.script || ''}
          onChange={(value) => {
            props.setScript && props.setScript(value);
          }}
        />
        {/* <Meet /> */}
      </Split>
    </div>
  );
};

export default Component;
