import React, {useState}from "react";
import "../App.css"
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToggleButtons from "../components/Radio-buttons-form";

function NewGamePage(props) {
    // redirect to game page
    const navigate = useNavigate();

    const [radioValueSize, setRadioValueSize] = React.useState("9");
    const [radioValueDifficulty, setRadioValueDifficulty] = React.useState("Medium");

    const [isLoading, setIsLoading] = React.useState(false);
    const [err, setErr] = React.useState('');

    // Modal Controls
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const generateGame = async () => {
        handleClose()
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/sudoku/API/${radioValueSize}/${radioValueDifficulty}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            });
    
            if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
            }
    
            const result = await response.json();
            props.setPuzzleBoard(result["puzzleBoard"])
            props.setSolvedBoard(result["solvedBoard"])

        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
        navigate("/sudoku");
        };


    return (
        <>
        <div className="newGameButton">
            <Button variant="primary" onClick={handleShow}>
                { isLoading ? "Loading..." : "New Game" }
            </Button>
        </div>
    
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>New Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="modalBody">
                <a href="https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/">How to Play</a>
                <div>
                <ToggleButtons 
                radioValueSize = {radioValueSize}
                setRadioValueSize = {setRadioValueSize}
                radioValueDifficulty = {radioValueDifficulty}
                setRadioValueDifficulty = {setRadioValueDifficulty}
                />
                </div>
            </div>

            </Modal.Body>
            
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={generateGame}>Start Game</Button>
            </Modal.Footer>
        </Modal>
        </>
    );    
}


export default NewGamePage;