import React from "react";
import "../App.css"
import TimerClock from "./Timer-clock";


export default function Timer(props){
    
    
    React.useEffect(() => {
      let interval = null;
    
      if (props.timerIsActive && props.timerIsPaused === false) {
        interval = setInterval(() => {
          props.timerSetTime((time) => time + 10);
        }, 10);
      } else {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }, [props.timerIsActive, props.timerIsPaused]);

    return(
        <div className="timerClock">
            <TimerClock time={props.timerTime} />
        </div>
    )
}

