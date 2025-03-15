package game;

public abstract class Board {
    public abstract String getCell(int row, int col);
    public abstract void setCell(Cell cell, String symbol);
}
