import React from "react";
import "../App.css"
import BoardCell from "./Board-table-row-cell-active";


export default function Cell(props){
    const nameOfClass = (props.columnIndex + 1) % (props.sudokuBoardSize ** .5) === 0 ? "puzzleCell borderCell" : "puzzleCell"

    const handleMouseEnter = e => {
        // set up
        const color = "cornflowerblue"
        const fontSize = "15pt"
        const cell = e.target.firstChild != null ? e.target.firstChild : e.target
        // highlight cells of the same column
        for (const r of document.getElementsByTagName("tr")){
            // highlight cells of the same row
            r.childNodes[props.columnIndex].childNodes[0].style.background = color
            for (const c of r.childNodes){
                if (r.id === String(props.rowIndex))  {
                    c.childNodes[0].style.background = color
                } 
                if (c.childNodes[0].value === cell.value) {
                    c.childNodes[0].style.fontSize = fontSize
                }
            }
        }
        cell.style.background = cell.disabled ? "lightblue" : "white"
        cell.style.fontSize = fontSize
        cell.style.border = "blue solid 1pt"
    }

      const handleMouseLeave = e => {
        for (const c of document.getElementsByTagName("td")){
                c.childNodes[0].style = ""
        }
      }

    return(
        <td id={props.columnIndex} className={nameOfClass} onMouseEnter={e=>handleMouseEnter(e)} onMouseLeave={handleMouseLeave}> 
            <BoardCell 
            {...props}
            handleChange = {props.handleChange}
            />
        </td> 
    )
}