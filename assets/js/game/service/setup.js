"use strict";

define(['service/api', 'jquery', 'model/Ship'], function(API, $, Ship) {
    var SetupService = function() {

    };

    /**
     * Retrieves a list of ships available in the game
     */
    SetupService.prototype.getShips = function() {
        var deferred = $.Deferred();

        API.ships().fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            var ships = [];
            for(var key in data) {
                var shipJson = data[key];
                ships.push(new Ship(shipJson));
            }

            console.log(ships);
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

        API.games.gameboards(id, board).fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            deferred.resolve(data);
        });

        return deferred;
    }

    return new SetupService();
});
