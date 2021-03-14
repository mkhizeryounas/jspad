import { useState } from 'react';
import './style.css';

const Component = (props) => {
  const { script = '', language = 'nodejs' } = props;
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (d) => {
    return d.toString();
  };

  const executeCode = async ({ script, language }) => {
    setIsLoading(true);
    props.onOutput && props.onOutput(null);
    await new Promise((resolve) => setTimeout(resolve, 500));
    let output = { hasError: false, date: formatDate(new Date()) };
    try {
      const response = [];
      console.oldLog = console.log;
      console.log = function () {
        response.push(
          [...arguments]
            .map((e) => (typeof e === 'object' ? JSON.stringify(e) : e))
            .join(' ')
        );
      };
      const EVAL_IS_BAD__AVOID_THIS = eval;
      EVAL_IS_BAD__AVOID_THIS(script);

      output['stdout'] = response;
    } catch (err) {
      output['stdout'] = [err.message || err];
      output['hasError'] = true;
    }
    props.onOutput && props.onOutput(output);
    console.log = console.oldLog;
    console.log(output);
    setIsLoading(false);
  };
  return (
    <div className='row runner'>
      <div className='col'>
        <button
          type='button'
          disabled={isLoading}
          onClick={() => executeCode({ script, language })}
          className='btn btn-success btn-sm'
        >
          {!isLoading ? (
            <>
              <i className='fa fa-play '></i> Run
            </>
          ) : (
            <>
              <i className='fa fa-cog fa-spin'></i> Running...
            </>
          )}
        </button>
      </div>

      <div className='col-auto'>
        <tt className='text-light'>
          <i className='fa fa-rocket'></i> Powered by{' '}
          <a
            href='https://pushgun.com'
            className='text-success'
            rel='noreferrer'
            target='_blank'
          >
            Pushgun
          </a>
        </tt>
      </div>
    </div>
  );
};

export default Component;
