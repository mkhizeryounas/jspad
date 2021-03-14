import { useEffect } from 'react';
import ActiveUsers from '../ActiveUsers/index.jsx';
import './style.css';

const Component = (props) => {
  const { output = [] } = props;
  const { className = '' } = props;

  return (
    <div className={`console col ${className}`}>
      <tt>
        <h5>Terminal</h5>
        <hr />
        <ActiveUsers />

        <hr />
        <span className='text-muted'>
          This is a real bash shell. <br />
          Everyone can modify this in real time. <br />
          <span>----------------------</span>
          <hr />
        </span>
        {output?.stdout ? (
          <div>
            <p>
              $~ Executed at <code>{output?.date}</code> with{' '}
              {!output.hasError ? (
                <code className='text-success'>
                  {' '}
                  <i className='fa fa-check-circle'></i> Success
                </code>
              ) : (
                <code className='text-danger'>
                  <i className='fa fa-times-circle'></i> Errors
                </code>
              )}
            </p>
            {output.stdout.map((e, i) => (
              <p key={e + '-' + i}>
                {typeof e === 'object' ? JSON.stringify(e) : e}
              </p>
            ))}
          </div>
        ) : (
          <></>
        )}
      </tt>
    </div>
  );
};

export default Component;
