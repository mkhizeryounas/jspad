import { useState, useEffect } from 'react';
import { getSessionRef } from '../../utils/firebase';
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
      <strong className='mb-2 row '>Active Users</strong>

      {Object.entries(users).map(([key, value], index) => {
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
      })}
    </div>
  );
};

export default Component;
