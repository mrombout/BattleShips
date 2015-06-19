"use strict";

define(['model/Board'], function(Board) {
    /**
     * Represents a single Zeeslag game.
     *
     * @param data
     * @constructor
     */
    var Game = function(data) {
        console.log('game data', data);
        this.id = data._id;
        this.status = data.status;
        this.yourTurn = data.yourTurn;

        this.youWon = data.youWon;

        this.enemyId = data.enemyId;
        this.enemyName = data.enemyName;

        this.myGameboard = new Board(data.myGameboard);
        this.enemyGameboard = new Board(data.enemyGameboard);
    };

    /**
     * Updates this game with new data retrieved from the Zeeslag API.
     *
     * @param data
     */
    Game.prototype.update = function(data) {
        this.status = data.status;
        this.yourTurn = data.yourTurn;

        this.youWon = data.youWon;

        console.log('data is now', data);

        this.myGameboard.update(data.myGameboard);
        this.enemyGameboard.update(data.enemyGameboard);
    };

    /**
     * Returns the players score.
     *
     * @returns {Array.length}
     */
    Game.prototype.getPlayerScore = function() {
        return this.enemyGameboard.getHits().length;
    };

    /**
     * Returns the enemys score.
     *
     * @returns {Array.length}
     */
    Game.prototype.getEnemyScore = function() {
        return this.myGameboard.getHits().length;
    };

    return Game;
});
