"use strict";

define(['service/api', 'jquery', 'model/Game'], function(API, $, Game) {
    var LobbyService = function() {

    };

    /**
     * Retrieves a list of games the current player participates in.
     *
     * @return Game
     */
    LobbyService.prototype.getGames = function() {
        var deferred = $.Deferred();

        API.user.me.games().fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            for(var key in data) {
                var game = data[key];
                game.prototype = Object.create(Game.prototype);
            }

            deferred.resolve(data);
        });

        return deferred;
    };

    LobbyService.prototype.getGame = function(id) {
        var deferred = $.Deferred();

        API.games(id).fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            deferred.resolve();
        });

        return deferred;
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

    return new LobbyService();
});
