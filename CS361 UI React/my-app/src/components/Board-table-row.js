import React from "react";
import "../App.css"
import Cell from "./Board-table-row-cell";

export default function Row(props){
    const columns = props.rowData.map(function(column, index){
        return(
            <Cell 
            {...props}
            key = {index}
            columnIndex = {index}
            columnData = {column}
            />
        )
    })
    const nameOfClass = (props.rowIndex + 1) % (props.sudokuBoardSize ** .5) === 0 ? "puzzleRow borderRow" : "puzzleRow"

    return(
        <tr id={props.rowIndex} className={nameOfClass}>
            {columns}
        </tr>
    )
}