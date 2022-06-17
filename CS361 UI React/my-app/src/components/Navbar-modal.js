import React from "react";
import "../App.css"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modal_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {props.modal_body}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.modal_action} onMouseUp={props.onHide}>{props.modal_botton_1}</Button>
          <Button onClick={props.onHide}>{props.modal_botton_2}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
export default MyVerticallyCenteredModal