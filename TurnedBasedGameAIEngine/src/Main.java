import api.GameEngine;
import game.Board;
import game.Cell;
import game.GameResult;
import game.Move;
import game.Player;
import boards.TicTacToeBoard;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        GameEngine gameEngine = new GameEngine();
        Board board = gameEngine.start("TicTacToe");

        Player computer = new Player("Computer", "O");
        Player opponent = new Player("Opponent", "X");
        Scanner scanner = new Scanner(System.in);

        // Print initial empty board
        printBoard(board);

        while (!gameEngine.isGameComplete(board).isOver()) {
            System.out.println("Make your move! Enter row and column (0-2):");
            int row = scanner.nextInt();
            int col = scanner.nextInt();
            Move opponentMove = new Move(new Cell(row, col));
            gameEngine.move(board, opponent, opponentMove);
            printBoard(board);

            if (gameEngine.isGameComplete(board).isOver()) {
                break; // Stop if the game is over
            }

            System.out.println("Computer's turn...");
            Move computerMove = gameEngine.suggestMove(board);
            gameEngine.move(board, computer, computerMove);
            
            printBoard(board);
        }

        GameResult result = gameEngine.getGameResult(board);
        if (result.getWinner().equals("-")) {
            System.out.println("Game Over! It's a draw!");
        } else {
            System.out.println("Game Over! Winner: " + result.getWinner());
        }
        
        scanner.close();
    }

    /**
     * Prints the current state of the board in a formatted manner
     * @param board The game board to print
     */
    public static void printBoard(Board board) {
        if (!(board instanceof TicTacToeBoard)) {
            System.out.println("Unsupported board type");
            return;
        }
        
        TicTacToeBoard ticTacToeBoard = (TicTacToeBoard) board;
        System.out.println("Current Board:");
        System.out.println("-------------");
        
        for (int i = 0; i < 3; i++) {
            System.out.print("| ");
            for (int j = 0; j < 3; j++) {
                String cell = ticTacToeBoard.getCell(i, j);
                System.out.print((cell == null ? " " : cell) + " | ");
            }
            System.out.println("\n-------------");
        }
        System.out.println();
    }
}