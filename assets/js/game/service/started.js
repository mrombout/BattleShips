define(['three', 'service/api', 'model/Cell', 'service/lobby'], function(THREE, API, Cell, lobbyService) {
    var Started = function() {

    };

    Started.prototype.shoot = function(gameId, x, y) {
        var deferred = $.Deferred();

        API.games.id(gameId).shots.post(new Cell({ x: x, y: y })).fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            deferred.resolve(data);
        });

        return deferred;
    };

    Started.prototype.getGame = function(gameId) {
        return lobbyService.getGame(gameId);
    };

    return new Started();
});