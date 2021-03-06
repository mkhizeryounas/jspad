import { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, InputGroup, Input } from 'reactstrap';
import { setName as setLsName, getName } from '../../utils/localstorage';
import { useToasts } from 'react-toast-notifications';

const Component = (props) => {
  const [name, setName] = useState(getName());
  const [initalSetup, setInitalSetup] = useState(false);
  const [modal, setModal] = useState(!name);
  const { addToast } = useToasts();
  const { handleUsernameChange = null } = props;
  useEffect(() => {
    if (name && !initalSetup) {
      window.firepad.setUserId(name);
      handleUsernameChange && handleUsernameChange(name);
    }
    setInitalSetup(true);
  }, [name, initalSetup, handleUsernameChange]);

  const toggle = () => setModal(!modal);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} fade={false} backdrop='static'>
        <ModalBody>
          <center>
            <i className='fa fa-comment-dots fa-3x'></i>
            <br />
            <strong>Please enter your name</strong>
            <p>Your name is visible to other participants of this interview.</p>

            <InputGroup>
              <Input
                placeholder='Your Name'
                style={{
                  borderRadius: 0,
                }}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button
                color='primary'
                style={{
                  borderRadius: 0,
                }}
                onClick={() => {
                  if (!name) {
                    addToast('Please enter your full name', {
                      appearance: 'error',
                    });
                    return;
                  }
                  setModal(false);
                  setLsName(name);
                  window.firepad && window.firepad.setUserId(name);
                  handleUsernameChange && handleUsernameChange(name);
                }}
              >
                Join!
              </Button>
            </InputGroup>
          </center>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Component;
