package api;

import game.Board;
import game.Cell;
import game.GameResult;
import game.Move;
import game.Player;

import boards.TicTacToeBoard;

public class GameEngine {

    public Board start(String type) {
        if (type.equals("TicTacToe")) {
            return new TicTacToeBoard();
        } else {
            throw new IllegalArgumentException();
        }
    }

    public void move(Board board, Player player, Move move) {
        if (board instanceof TicTacToeBoard) {
            TicTacToeBoard board1 = (TicTacToeBoard) board;
            board1.setCell(move.getCell(), player.symbol());
        } else {
            throw new IllegalArgumentException();
        }
    }

    // Method to handle move by board, move, player (alternative signature)
    public void makeMove(Board board, Move move, Player player) {
        move(board, player, move);
    }

    public GameResult isComplete(Board board) {
        if (board instanceof TicTacToeBoard) {
            TicTacToeBoard board1 = (TicTacToeBoard) board;
            boolean rowComplete, columnComplete, diagonalComplete, revdiagonalComplete;
            String firstCharacter;

            // Row checking
            for (int i = 0; i < 3; i++) {
                rowComplete = true;
                firstCharacter = board1.getCell(i, 0);
                if (firstCharacter == null) continue; // Skip empty row

                for (int j = 1; j < 3; j++) {
                    if (board1.getCell(i, j) == null || !board1.getCell(i, j).equals(firstCharacter)) {
                        rowComplete = false;
                        break;
                    }
                }
                if (rowComplete) {
                    return new GameResult(true, firstCharacter);
                }
            }

            // Column checking
            for (int i = 0; i < 3; i++) {
                columnComplete = true;
                firstCharacter = board1.getCell(0, i);
                if (firstCharacter == null) continue; // Skip empty column

                for (int j = 1; j < 3; j++) {
                    if (board1.getCell(j, i) == null || !board1.getCell(j, i).equals(firstCharacter)){
                        columnComplete = false;
                        break;
                    }
                } if (columnComplete) {
                    return new GameResult(true, firstCharacter);
                }
            }

            // Checking diagonals
            diagonalComplete = true;
            firstCharacter = board1.getCell(0, 0);
            if (firstCharacter != null) {
                for (int i = 1; i < 3; i++) {
                    if (board1.getCell(i, i) == null || !board1.getCell(i, i).equals(firstCharacter)) {
                        diagonalComplete = false;
                        break;
                    }
                }
                if (diagonalComplete) {
                    return new GameResult(true, firstCharacter);
                }
            }

            // Checking reverse diagonals
            revdiagonalComplete = true;
            firstCharacter = board1.getCell(0, 2);
            if (firstCharacter != null) {
                for (int i = 1; i < 3; i++) {
                    if (board1.getCell(i, 2 - i) == null || !board1.getCell(i, 2 - i).equals(firstCharacter)) {
                        revdiagonalComplete = false;
                        break;
                    }
                }
                if (revdiagonalComplete) {
                    return new GameResult(true, firstCharacter);
                }
            }

            // Checking if board is full (draw condition)
            int countOfFilledCells = 0;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) { // Fix j starting from 0
                    if (board1.getCell(i, j) != null) {
                        countOfFilledCells++;
                    }
                }
            }
            if (countOfFilledCells == 9) {
                return new GameResult(true, "-"); // Draw
            }

            return new GameResult(false, "-"); // Game is still ongoing
        }

        return new GameResult(false, "-"); // Default return if board is not boards.TicTacToeBoard
    }

    // Additional method for convenience - same as isComplete but with alternative name
    public GameResult isGameComplete(Board board) {
        return isComplete(board);
    }

    // Additional method for convenience
    public GameResult getGameResult(Board board) {
        return isComplete(board);
    }

    // Method to suggest next move for AI
    public Move suggestMove(Board board) {
        if (board instanceof TicTacToeBoard) {
            TicTacToeBoard board1 = (TicTacToeBoard) board;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    if (board1.getCell(i, j) == null) {
                        return new Move(new Cell(i, j));
                    }
                }
            }
            throw new IllegalStateException("No valid moves available!");
        } else {
            throw new IllegalArgumentException();
        }
    }

    public static void main(String[] args) {
    }
}

