import api.GameEngine;
import game.Board;
import game.Cell;
import game.GameResult;
import game.Move;
import game.Player;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        GameEngine gameEngine = new GameEngine();
        Board board = gameEngine.start("TicTacToe");

        Player computer = new Player("Computer", "O");
        Player opponent = new Player("Opponent", "X");
        Scanner scanner = new Scanner(System.in);

        // Print initial empty board
        board.printBoard();

        while (!gameEngine.isGameComplete(board).isOver()) {
            System.out.println("Make your move! Enter row and column (0-2):");
            int row = scanner.nextInt();
            int col = scanner.nextInt();
            Move opponentMove = new Move(new Cell(row, col));
            gameEngine.move(board, opponent, opponentMove);
            board.printBoard();

            if (gameEngine.isGameComplete(board).isOver()) {
                break; // Stop if the game is over
            }

            System.out.println("Computer's turn...");
            Move computerMove = gameEngine.suggestMove(board);
            gameEngine.move(board, computer, computerMove);
            
            board.printBoard();
        }

        GameResult result = gameEngine.getGameResult(board);
        if (result.getWinner().equals("-")) {
            System.out.println("Game Over! It's a draw!");
        } else {
            System.out.println("Game Over! Winner: " + result.getWinner());
        }
        
        scanner.close();
    }
}