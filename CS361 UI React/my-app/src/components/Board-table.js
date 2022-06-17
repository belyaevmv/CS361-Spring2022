import React from "react";
import "../App.css"
import Row from "./Board-table-row";

export default function Table(props){
    const rows = props.sudokuBoard.map(function(row, index){
        return(
            <Row
                {...props}
                key = {index}
                rowData = {row}
                rowIndex = {index}
            />
        )
    })


    return(
        <table className="puzzleBoard">
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}