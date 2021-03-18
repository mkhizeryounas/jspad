import { useState, useEffect } from 'react';
import { getSessionRef } from '../../utils/firebase';
import { removeName, getName } from '../../utils/localstorage';

import './style.css';

const Component = (props) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    let firepadRef = getSessionRef().child('users');
    firepadRef.on('value', function (data) {
      setUsers(data.val());
    });
  };

  return (
    <div className='container mb-2'>
      <div className='row'>
        <div className='col'>
          <strong className='mb-2 row'>Active Users</strong>
        </div>
        <div className='col-auto'>
          <span
            className='text-light edit-username-btn'
            onClick={() => {
              removeName();
              window.location.reload();
            }}
          >
            <i className='fa fa-edit fa-xs'></i> {getName()}
          </span>
        </div>
      </div>
      {users ? (
        Object.entries(users).map(([key, value], index) => {
          return (
            <div key={`${index}-${key}`} className='row mb-1'>
              <i
                className='fa fa-user-circle mr-1'
                style={{
                  color: value.color,
                }}
              ></i>{' '}
              {key}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Component;
