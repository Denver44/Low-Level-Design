public class Main {
    public void move(Board board, Player player, Move move) {
    }

    public GameResult isComplete(Board board) {
        if (board instanceof TicTacToeBoard) {
            TicTacToeBoard board1 = (TicTacToeBoard) board;
            boolean rowComplete, columnComplete, diagonalComplete, revdiagonalComplete;
            String firstCharacter;

            // Row checking
            for (int i = 0; i < 3; i++) {
                rowComplete = true;
                firstCharacter = board1.cells[i][0];
                if (firstCharacter == null) continue; // Skip empty row

                for (int j = 1; j < 3; j++) {
                    if (board1.cells[i][j] == null || !board1.cells[i][j].equals(firstCharacter)) {
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
                firstCharacter = board1.cells[0][i];
                if (firstCharacter == null) continue; // Skip empty column

                for (int j = 1; j < 3; j++) {
                    if (board1.cells[j][i] == null || !board1.cells[j][i].equals(firstCharacter)) {
                        columnComplete = false;
                        break;
                    }
                }
                if (columnComplete) {
                    return new GameResult(true, firstCharacter);
                }
            }

            // Checking diagonals
            diagonalComplete = true;
            firstCharacter = board1.cells[0][0];
            if (firstCharacter != null) {
                for (int i = 1; i < 3; i++) {
                    if (board1.cells[i][i] == null || !board1.cells[i][i].equals(firstCharacter)) {
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
            firstCharacter = board1.cells[0][2];
            if (firstCharacter != null) {
                for (int i = 1; i < 3; i++) {
                    if (board1.cells[i][2 - i] == null || !board1.cells[i][2 - i].equals(firstCharacter)) {
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
                    if (board1.cells[i][j] != null) {
                        countOfFilledCells++;
                    }
                }
            }
            if (countOfFilledCells == 9) {
                return new GameResult(true, "-"); // Draw
            }

            return new GameResult(false, "-"); // Game is still ongoing
        }

        return new GameResult(false, "-"); // Default return if board is not TicTacToeBoard
    }

    public static void main(String[] args) {
    }
}

class Board {
}

class Player {
}

class Move {
}

class GameResult {
    boolean isOver;
    String winner;

    public GameResult(boolean isOver, String winner) {
        this.winner = winner;
        this.isOver = isOver;
    }
}

class TicTacToeBoard extends Board {
    String[][] cells = new String[3][3];
}
