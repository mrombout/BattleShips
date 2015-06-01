"use strict";

define(['model/Board'], function(Board) {
    var Game = function(data) {
        console.log('game data', data);
        this.id = data._id;
        this.status = data.status;
        this.yourTurn = data.yourTurn;

        this.youWon = data.youWon;

        this.enemyId = data.enemyId;
        this.enemyName = data.enemyName;

        this.player1 = null;
        this.player2 = null;

        this.isAI = null;

        this.myGameboard = new Board(data.myGameboard);
        this.enemyGameboard = new Board(data.enemyGameboard);
    };

    Game.prototype.update = function(data) {
        this.status = data.status;
        this.yourTurn = data.yourTurn;

        this.youWon = data.youWon;

        this.myGameboard.update(data.myGameboard);
        this.enemyGameboard.update(data.enemyGameboard);
    };

    return Game;
});
