import React from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarButton from "./Navbar-button"; 
import NavbarText from "../content/Navbar-text";

function Navbar(props) {
    const buttons = NavbarText.map(button =>{
        var action
        if (button.main_button_name === "Start Over"){
            action = props.resetBoard
        } else if(button.main_button_name === "Solve It"){
            action = props.revealBoard
        } else if(button.main_button_name === "Hint"){
            action = props.revealCell
        } else if(button.main_button_name === "Check Answers"){
            action = props.checkAnswer
        } else if(button.main_button_name === "New Game"){
            action = props.newGame
        } 

        return(
                < NavbarButton 
                    key = {button.id}
                    main_button_name = {button.main_button_name}
                    modal_title = {button.modal_title}
                    modal_body = {button.modal_body}
                    modal_botton_1 = {button.modal_botton_1}
                    modal_botton_2 = {button.modal_botton_2}
                    modal_action = {action}
                    timer_action = {props.timerSetPause}
                />
        )
    })

    return(
        <div className="navbar">
            {buttons}
        </div>
    );
}

export default Navbar;