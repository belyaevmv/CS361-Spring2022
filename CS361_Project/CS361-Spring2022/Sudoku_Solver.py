import Sudoku_Board


def sudoku_solver(board):
    """Sudoku solver function that takes board with empty cells being 0s and returning
    a solved board"""
    # get empty coordinates
    size = len(board[0])
    empty_coordinates = list()
    for r in range(size):
        for c in range(size):
            if board[r][c] == 0:
                empty_coordinates.append([r, c])

    candidates = [num for num in range(1, size + 1)]
    board = helper_solver(empty_coordinates, board, candidates)
    return board


def helper_solver(empty_coordinates, board, candidates):
    """Helper function that iterates through possible solutions"""
    if not empty_coordinates:
        return board

    # iterate through empty coordinates and look for valid solution:
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
                    board = helper_solver(empty_coordinates[1:], board, candidates)

                    # revert board to original state
                    board[coord[0]][coord[1]] = 0
    return board


if __name__ == "__main__":
    print('full board')
    board = [
        [2, 4, 0, 0],
        [1, 0, 0, 4],
        [0, 1, 0, 0],
        [4, 2, 3, 0]
    ]
    for r in board:
        print(r)
    print("solved board")
    board = sudoku_solver(board)
    for r in board:
        print(r)