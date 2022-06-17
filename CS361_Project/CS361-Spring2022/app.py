import json
import mimetypes
from flask import Flask, render_template, redirect, jsonify, Response
from flask import request
from flask_cors import CORS, cross_origin
import time
import Sudoku_Board
import Sudoku_Obstructer
import time

app = Flask(__name__)
CORS(app)


# Routes

@app.route('/sudoku/API/<string:size>/<string:difficulty>')
def game_generator(size, difficulty):
    if difficulty not in ["Easy", "Medium", "Hard"]:
        return "Error: Invalid Difficulty. Accepted diffuculties are: Easy, Medum, Hard" 

    size = int(size)
    if int(size) not in [4, 9, 16]:
        return "Error: Invalid Size. Accepted size range is: 4, 9, 16" 

    start_board = time.time()
    solutionBoard = Sudoku_Board.create_board(size)
    end_board = time.time()

    start_puzzle = time.time()
    puzzleBoard = Sudoku_Obstructer.obstruct_sudoku_board(solutionBoard, difficulty)
    end_puzzle = time.time()

    response = app.response_class(
    response=json.dumps({"solvedBoard" : solutionBoard, "puzzleBoard": puzzleBoard}),
    status=200,
    mimetype='application/json'
    )
    return response


# Listener

if __name__ == "__main__":

    #Start the app on port 3000, it will be different once hosted

    app.run(port=3000, debug=True)