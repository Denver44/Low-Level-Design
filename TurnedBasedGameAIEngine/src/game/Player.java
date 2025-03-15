package game;

public class Player {

    private String name;
    private String playerSymbol;

    public Player(String name, String playerSymbol) {
        this.name = name;
        this.playerSymbol = playerSymbol;
    }

    public String getName() {
        return name;
    }

    public String symbol() {
        return playerSymbol;
    }
}
