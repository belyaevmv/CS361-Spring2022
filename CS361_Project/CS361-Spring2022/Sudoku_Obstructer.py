import random
import Sudoku_Board
import Sudoku_Solution_Counter
import copy


def obstruct_sudoku_board(board, difficulty):
    board = copy.deepcopy(board)

    size = len(board[0])

    # get difficulty value based on difficulty and board size
    if difficulty == "Easy":
        dif = round((size ** 2) * 0.3)
    elif difficulty == "Medium":
        dif = round((size ** 2) * 0.4)
    else:
        dif = round((size ** 2) * 0.5)

    # get list of coordinates
    coordinates = list()
    for row in range(size):
        for column in range(size):
            coordinates.append([row, column])

    return sudoku_obstructer_helper(dif, coordinates, board)


def sudoku_obstructer_helper(dif, coordinates, board):
    # base case
    if dif == 0:
        return board

    # shuffle coordinates to get random value at last index
    random.shuffle(coordinates)

    # obstruct board
    temp_square = board[coordinates[-1][0]][coordinates[-1][1]]  # save value at selected coordinate
    board[coordinates[-1][0]][coordinates[-1][1]] = 0  # obstruct board

    # check if board has only one solution
    if Sudoku_Solution_Counter.sudoku_solution_counter(board):
        dif -= 1
    else:
        board[coordinates[-1][0]][coordinates[-1][1]] = temp_square

    # recurse
    sudoku_obstructer_helper(dif, coordinates[:-1], board)
    return board


if __name__ == "__main__":
    print('full board')
    board = Sudoku_Board.create_board(16)
    for r in board:
        print(r)
    difficulty_level = ["Easy", "Medium", "Hard"]
    board = obstruct_sudoku_board(board, difficulty_level[2])
    print("obstructed board")
    for r in board:
        print(r)
    difficulty_level = ["Easy", "Medium", "Hard"]
