import Sudoku_Board
import Sudoku_Obstructer


def sudoku_solution_counter(board):

    # get empty coordinates
    size = len(board[0])
    empty_coordinates = list()
    for row in range(size):
        for column in range(size):
            if board[row][column] == 0:
                empty_coordinates.append([row, column])

    candidates = [num for num in range(1, size + 1)]

    number_of_solutions = helper_solve_board(empty_coordinates, board, candidates, 0)
    if number_of_solutions == 1:
        return True
    else:
        return False


def helper_solve_board(empty_coordinates, board, candidates, num_of_solutions):

    if not empty_coordinates:
        num_of_solutions += 1
        return num_of_solutions
    if num_of_solutions > 1:
        return num_of_solutions

    # for coord in empty_coordinates:
    coord = empty_coordinates[0]
    for candidate in candidates:

        # check if number repeats in the row
        if not Sudoku_Board.isInRow(coord, candidate, board):

            # check if number repeats in the column
            if not Sudoku_Board.isInColumn(coord, candidate, board):

                # check if number repeats in the sub-grid
                if not Sudoku_Board.isInSubset(coord, candidate, board):

                    # update board
                    board[coord[0]][coord[1]] = candidate
                    num_of_solutions += helper_solve_board(empty_coordinates[1:], board, candidates, num_of_solutions)

                    # revert board to original state
                    board[coord[0]][coord[1]] = 0
    return num_of_solutions


if __name__ == "__main__":
    print('full board')
    board = Sudoku_Board.create_board(4)
    for r in board:
        print(r)
    difficulty_level = ["Easy", "Medium", "Hard"]
    board = Sudoku_Obstructer.obstruct_sudoku_board(board, difficulty_level[2])
    for r in board:
        print(r)
    print(sudoku_solution_counter(board))
