import { useState } from 'react';
import './style.css';
import copy from 'copy-to-clipboard';
import { useToasts } from 'react-toast-notifications';

const fn = Function;

const Component = (props) => {
  const { script = '', language = 'nodejs' } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();

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
            .map((e) =>
              typeof e === 'object' ? JSON.stringify(e, null, 2) : e
            )
            .join(' ')
        );
      };
      new fn(script)();
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
        <a
          className='btn btn-primary text-white ml-2 btn-sm'
          href='/'
          target='_blank'
        >
          <i className='fa fa-plus-circle'></i>
        </a>
        <button
          className='btn btn-secondary ml-2 btn-sm'
          onClick={() => {
            copy(window.location.href);
            addToast('Copied to clipboard', {
              appearance: 'success',
            });
          }}
        >
          <i className='fa fa-share'></i>
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
