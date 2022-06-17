import React from "react";
import "../App.css"
import Table from "./Board-table";

function Board(props) {
    return(
        <div className="board">
            <Table {...props}/>
        </div>
    )
}

export default Board;