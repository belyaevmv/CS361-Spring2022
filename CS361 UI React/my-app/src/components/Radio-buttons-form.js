import React from "react";
import ToggleButton from 'react-bootstrap/ToggleButton'


export default function ToggleButtons(props) {
    function changeSize(value){
      console.log("changing size")
      console.log(value)
      props.setRadioValueSize(value)
    }

    function changeDifficulty(value){
      console.log("changing difficulty")
      console.log(value)
      props.setRadioValueDifficulty(value)
    }

    const size = [
      { name: 'Beginner 4x4', value: "4" },
      { name: 'Classic 9x9', value: "9" },
      { name: 'Advanced 16x16', value: "16" },
    ];
    const difficulty = [
        { name: 'Easy', value: 'Easy' },
        { name: 'Medium', value: 'Medium' },
        { name: 'Hard', value: 'Hard' },
      ];
  
    return (
      <>
        {size.map((radio, idx) => (
            <ToggleButton
            key={idx}
            className="radioButton"
            id={`radio-size-${idx}`}
            type="radio"
            name="Size"
            value={radio.value}
            checked={props.radioValueSize === radio.value}
            variant={props.radioValueSize === radio.value? 'outline-success' : 'outline-danger'}
            onChange={(e) => changeSize(e.currentTarget.value)}
            >
            {radio.name}
            </ToggleButton>
        ))}
        <br />
        {difficulty.map((radio, idx) => (
            <ToggleButton
            key={idx}
            className="radioButton"
            id={`radio-difficulty-${idx}`}
            type="radio"
            name="Difficulty"
            value={radio.value}
            checked={props.radioValueDifficulty === radio.value}
            variant={props.radioValueDifficulty === radio.value? 'outline-success' : 'outline-danger'}
            onChange={(e) => changeDifficulty(e.currentTarget.value)}
            >
            {radio.name}
            </ToggleButton>
        ))}
      </>
    );
  }
