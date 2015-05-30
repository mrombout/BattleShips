define(['three'], function(THREE) {
    var Started = function() {

    };

    Started.prototype.shoot = function(gameId, x, y) {
        var deferred = $.Deferred();

        API.games.id(gameId).shots.post().fail(function(jqXhr, textStatus, errorThrown) {
            deferred.reject();
        }).done(function(data, textStatus, jqXhr) {
            deferred.resolve(data);
        });

        return deferred;
    };

    return new Started();
});