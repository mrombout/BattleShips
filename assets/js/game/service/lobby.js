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

        API.user.me.games.get().fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            for(var key in data) {
                if(data.hasOwnProperty(key)) {
                    var game = data[key];
                    game.prototype = Object.create(Game.prototype);
                }
            }

            deferred.resolve(data);
        });

        return deferred;
    };

    /**
     * Retrieves the information of the game with the provided ID.
     *
     * @param {string} id
     * @returns {$.Deferred}
     */
    LobbyService.prototype.getGame = function(id) {
        var deferred = $.Deferred();

        API.games.get(id).fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            var game = new Game(data);
            deferred.resolve(game);
        });

        return deferred;
    };

    /**
     * Clears all current games.
     *
     * @returns {$.Deferred}
     */
    LobbyService.prototype.clearGames = function() {
        var deferred = $.Deferred();

        API.user.me.games.delete().fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function() {
            deferred.resolve();
        });

        return deferred;
    };

    /**
     * Creates a new AI game.
     *
     * @returns {$.Deferred}
     */
    LobbyService.prototype.createAiGame = function() {
        var deferred = $.Deferred();

        API.games.ai.get().fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data) {
            deferred.resolve(data);
        });

        return deferred;
    };

    /**
     * Creates a new game and starts a match lookup.
     *
     * @return Game
     */
    LobbyService.prototype.createGame = function() {
        var deferred = $.Deferred();

        API.games.get().fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data) {
            deferred.resolve(data);
        });

        return deferred;
    };

    return new LobbyService();
});
