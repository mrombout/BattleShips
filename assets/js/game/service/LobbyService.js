"use strict";

define(function() {
    var LobbyService = function() {

    };

    /**
     * Retrieves a list of games the current player participates in.
     *
     * @return Game
     */
    LobbyService.prototype.getGames = function() {
        // TODO make a request to GET /users/me/games
    };

    /**
     * Creates a new game and starts a match lookup.
     *
     * @return Game
     */
    LobbyService.prototype.createGame = function(ai) {
        // TODO make a request to GET /games
        // TODO make a request to GET /games/AI
    };

    return LobbyService;
});
