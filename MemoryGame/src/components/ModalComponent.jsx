import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ title, body, show, handleClose, handleRestart, clearTime }) => {

  useEffect(() => {
    if (show) {
      clearTime(); // Stop the timer when the modal is shown
    }
  }, [show, clearTime]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className=''
      backdrop="static"
      size="" // Adjust size as needed
      aria-labelledby="modal-title"
      centered // Ensure the modal is centered vertically
    >
      {/* <Modal.Header className='' closeButton> */}
        <Modal.Title className='  text-md text-center p-2 text-sky-600' id="modal-title">
          {title}
        </Modal.Title>
      {/* </Modal.Header> */}
      <Modal.Body className='text-center'>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button className='' variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button variant="primary" onClick={handleRestart}>
          Restart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
