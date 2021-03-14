import { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, InputGroup, Input } from 'reactstrap';
import { setName as setLsName, getName } from '../../utils/localstorage';

const Component = () => {
  const [name, setName] = useState(getName());
  const [modal, setModal] = useState(!name);

  useEffect(() => {
    if (name) {
      window.firepad.setUserId(name);
    }
  });

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
                  setModal(false);
                  setLsName(name);
                  window.firepad.setUserId(name);
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
