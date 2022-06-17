import React from "react";
import "../App.css";
import MyVerticallyCenteredModal from "./Navbar-modal";
import Button from 'react-bootstrap/Button';

export default function NavbarButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <div className="modalButton">
        <Button variant="primary" onClick={() => {setModalShow(true); props.timer_action()}}>
          {props.main_button_name}
        </Button>
  
        <MyVerticallyCenteredModal
          {...props}
          show={modalShow}
          onHide={() => {setModalShow(false); props.timer_action()}}
        />
      </div>
    );
  }