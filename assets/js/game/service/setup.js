"use strict";

define(['service/api', 'jquery', 'model/Ship', 'service/lobby'], function(API, $, Ship, lobbyService) {
    var SetupService = function() {

    };

    /**
     * Retrieves a list of ships available in the game.
     */
    SetupService.prototype.getShips = function() {
        var deferred = $.Deferred();

        API.ships.get().fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            var ships = [];
            for(var key in data) {
                var shipJson = data[key];
                ships.push(new Ship(shipJson));
            }

            deferred.resolve(ships);
        });

        return deferred;
    };

    /**
     * Save the setup board a the given game.
     *
     * @param board
     */
    SetupService.prototype.saveBoard = function(id, board) {
        var deferred = $.Deferred();

        API.games.id(id).gameboards.post(board).fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject({ msg: textStatus });
        }).done(function(data, textStatus, jqXhr) {
            if(data.msg === "success") {
                deferred.resolve(data);
            } else {
                deferred.reject(data);
            }
        });

        return deferred;
    };

    /**
     * Retrieves the information of the game with the provided ID.
     *
     * @param gameId
     * @returns {*|$.Deferred}
     */
    SetupService.prototype.getGame = function(gameId) {
        return lobbyService.getGame(gameId);
    };


    return new SetupService();
});
