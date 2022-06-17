import random


def create_board(size):
    #  listen to the file

    # generate empty board
    board = [[0 for x in range(size)] for y in range(size)]

    # populate board
    candidates = [i for i in range(1, size+1)]

    # generate random coordinate
    random.shuffle(candidates)

    return helper_create_board([0, 0], board, candidates)


def helper_create_board(coord, board, candidates):

    for candidate in candidates:
        # check if random coordinate valid
        # check if number repeats in the row
        if not isInRow(coord, candidate, board):

            # check if number repeats in the column
            if not isInColumn(coord, candidate, board):

                # check if number repeats in the sub-grid
                if not isInSubset(coord, candidate, board):

                    # update board
                    board[coord[0]][coord[1]] = candidate

                    # update coordinate
                    if coord == [len(board[0])-1, len(board[0])-1]:  # end of board
                        return board
                    elif coord[1] == len(board[0])-1:  # end of row
                        new_coord = [coord[0]+1, 0]
                        candidates = [i for i in range(1, len(board[0])+1)]
                    else:
                        new_coord = [coord[0], coord[1]+1]

                    board = helper_create_board(new_coord, board, candidates)
                    if board[len(board[0])-1][len(board[1])-1] == 0:
                        board[coord[0]][coord[1]] = 0
    return board


def isInRow(coord, num, board):
    if num in board[coord[0]]:
        return True
    else:
        return False


def isInColumn(coord, num, board):
    if num in [row[coord[1]] for row in board]:
        return True
    else:
        return False


def isInSubset(coord, num, board):
    subset_size = int(round(len(board[0]) ** 0.5))
    column_lower = (coord[1] // subset_size)*subset_size
    column_upper = (coord[1] // subset_size + 1)*subset_size
    row_lower = (coord[0] // subset_size)*subset_size
    row_upper = (coord[0] // subset_size + 1)*subset_size

    subset = [board[row][column_lower: column_upper] for row in range(row_lower, row_upper)]
    for arr in subset:
        if num in arr:
            return True
    return False


if __name__ == "__main__":
    print('full board')
    board = create_board(9)
    for r in board:
        print(r)
