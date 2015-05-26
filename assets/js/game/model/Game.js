"use strict";

define(function() {
    var Game = function(data) {
        console.log('data', data);
        this.id = data._id;
        this.status = data.status;
        this.yourTurn = data.yourTurn;

        this.youWon = data.youWon;

        this.enemyId = data.enemyId;
        this.enemyName = data.enemyName;

        this.player1 = null;
        this.player2 = null;

        this.isAI = null;

        this.myGameboard = null;
        this.enemyGameboard = null;
    };

    return Game;
});
