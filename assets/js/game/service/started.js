define(['three', 'service/api', 'model/Cell', 'service/lobby'], function(THREE, API, Cell, lobbyService) {
    var Started = function() {

    };

    /**
     * Shoots at the given X and Y coordinates for the game with the given id.
     *
     * @param {string} gameId
     * @param {char} x
     * @param {number} y
     * @returns {$.Deferred}
     */
    Started.prototype.shoot = function(gameId, x, y) {
        var deferred = $.Deferred();

        API.games.id(gameId).shots.post(new Cell({ x: x, y: y })).fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            deferred.resolve(data);
        });

        return deferred;
    };

    /**
     * Retrieves the information of the game with the provided ID.
     *
     * @param {string} gameId
     * @returns {$.Deferred}
     */
    Started.prototype.getGame = function(gameId) {
        return lobbyService.getGame(gameId);
    };

    return new Started();
});