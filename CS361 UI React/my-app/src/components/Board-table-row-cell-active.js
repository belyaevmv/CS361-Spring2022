import React from "react";
import "../App.css"


export default function BoardCell(props){
    const cellID = props.rowIndex * props.sudokuBoardSize + props.columnIndex

    if (props.columnData === 0){
        return(
            <input type="field" id={cellID} className={props.sudokuEmptyCells[cellID][2]} name={cellID} 
            value={props.sudokuEmptyCells[cellID][0]} 
            onChange={(e) => {props.handleChange(e.target.value, e.target.name)}}>
            </input>
        )
    } else {
        return(
            <input id={cellID} className="cellInactive" 
            value={props.columnData} 
            disabled>
            </input>
        ) 
    }
}

