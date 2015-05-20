define(function() {
    var Game = function() {
        this.id = null;
        this.state = null;
        this.yourTurn = null;

        this.enemyId = null;
        this.enemyName = null;

        this.player1 = null;
        this.player2 = null;

        this.isAI = null;

        this.myGameboard = null;
        this.enemyGameboard = null;
    };

    return Game;
});
