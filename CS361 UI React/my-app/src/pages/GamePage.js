import React from "react";
import "../App.css"
import Board from "../components/Board";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";


function GamePage(props) {
    // Game SetUp
    const navigate = useNavigate();
    const boardSize = props.puzzleBoard.length
    const solvedBoard = props.solvedBoard
    const emptyCells = {}
    
    // Restructure empty cells from puzzle board in object form
    // cellID : [currentCellValue, SolverPuzzleValue, className]
    for (let i=0; i < boardSize; i++){
        for (let j=0; j < boardSize; j++){
            if (props.puzzleBoard[i][j] === 0) {
                const key = i*boardSize+j
                emptyCells[key] = ["", props.solvedBoard[i][j], "cellActive"]
            }
        }
    }
    const [cellsNumbers,setNumber] = React.useState(emptyCells)
    
    // Cell Input Change Hangle Function
    function handleChange(value, name){
        if (((!isNaN(value)) && (1 <= value && value <= boardSize)) || (value === "")){
            setNumber(prevCellNumbers => {
                prevCellNumbers[name][0] = value
                prevCellNumbers[name][2] = "cellActive"
                return{
                    ...prevCellNumbers,
                }
            })
        }
    }
    
    // Cell Reset to Empty Function
    function resetBoard(){
        for (const element in cellsNumbers){
            setNumber(prevCellNumbers => {
                for (const key in prevCellNumbers){
                    prevCellNumbers[key][0] = ""
                    prevCellNumbers[key][2] = "cellActive"
                }
                return{
                    ...prevCellNumbers,
                }
            })
        }
        handleReset()
        handleStart()
    }
    
    // Solve Board
    function showBoard(){
        for (const element in cellsNumbers){
            setNumber(prevCellNumbers => {
                for (const key in prevCellNumbers){
                    prevCellNumbers[key][0] = prevCellNumbers[key][1]
                    prevCellNumbers[key][2] = "cellActive correct"
                }
                return{
                    ...prevCellNumbers,
                }
            })
        }
        handleStop()
    }
    
    // Reveal Hint Value
    const [isLoading, setIsLoading] = React.useState(false);
    const [err, setErr] = React.useState('');
    const [emptyCellsKeys, setEmptyCellsKeys] = React.useState(Object.keys(cellsNumbers))
    const showHint = async () => {
        if (emptyCellsKeys.length !== 0) {
            let hintCellKey = 0
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/randomSelector`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"list": emptyCellsKeys}),
                });

                if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
                }
        
                const result = await response.json();
                hintCellKey = result['selectedElement']
                setEmptyCellsKeys(result['list'])

            } catch (err) {
                setErr(err.message);
            } finally {
                setIsLoading(false);
            }        

            setNumber(prevCellNumbers => {
                prevCellNumbers[hintCellKey][0] = prevCellNumbers[hintCellKey][1]
                prevCellNumbers[hintCellKey][2] = "cellActive hint"
                return{
                    ...prevCellNumbers,
                }
            })
        }
    };

    // Check Answers
    function checkAnswer(){
        var incorrectCells = true
        setNumber(prevCellNumbers => {
            for (const key in prevCellNumbers){
                if (parseInt(prevCellNumbers[key][0]) === parseInt(prevCellNumbers[key][1])){
                    prevCellNumbers[key][2] = "cellActive correct"
                } else{
                    prevCellNumbers[key][2] = "cellActive incorrect"
                    incorrectCells = false
                }
            }
            return{
                ...prevCellNumbers
            }
        });

        if (incorrectCells) {handleStop()} 
    }
    
    // Navigate to Start New Game Page
    function newGame(){
        navigate("/");
    }

    // Timer useStates SetUp
    const [isActive, setIsActive] = React.useState(true);
    const [isPaused, setIsPaused] = React.useState(false);
    const [time, setTime] = React.useState(0);

    const handleStop = () => {
        setIsActive(false);
        setIsPaused(false);
    };
    
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };
    
    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    return(
        <div className="page">
            <Timer 
            timerIsActive = {isActive}
            timerIsPaused = {isPaused}
            timerTime = {time}
            timerSetTime = {setTime}
            />

            < Board 
            sudokuBoard = {props.puzzleBoard}
            sudokuBoardSize = {boardSize}
            handleChange = {handleChange}
            sudokuEmptyCells = {cellsNumbers}
            />

            < Navbar 
            revealBoard = {showBoard} 
            resetBoard = {resetBoard} 
            revealCell = {showHint} 
            checkAnswer = {checkAnswer}
            newGame = {newGame}
            timerSetPause = {handlePauseResume}/>
        </div>
    )
}

export default GamePage;