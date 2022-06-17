import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GamePage from "./pages/GamePage";
import NewGamePage from "./pages/NewGamePage";
import puzzle from "./content/Sudoku-puzzle";


function App() {
  // Board useStates SetUp
  const [puzzleBoard, setPuzzleBoard] = React.useState(puzzle['puzzleBoard'])
  const [solvedBoard, setSolvedBoard] = React.useState(puzzle['solvedBoard'])

  return (
    <div className="App">
      <Router>
        <header className="App-header">
        <Routes>
          <Route path="/" exact element={
          <NewGamePage 
          setPuzzleBoard = {setPuzzleBoard}
          setSolvedBoard = {setSolvedBoard}
          />} 
          />
          <Route path="/sudoku" exact element={
          <GamePage 
          puzzleBoard = {puzzleBoard}
          solvedBoard = {solvedBoard}
          />} 
          />
        </Routes>
        </header>
      </Router>
    </div>
  )
}

export default App;
