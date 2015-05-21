define(['service/lobby', 'game', 'state/setup', 'text!/BattleShipsters/assets/html/_game.html'], function(lobbyService, game, setupState, gameHtml) {
    var LobbyPresenter = function(lobbyView) {
        this.view = lobbyView;
    };

    LobbyPresenter.prototype.loadGames = function() {
        var me = this;

        this.view.clearGameItems();

        lobbyService.getGames().done(function(data) {
            for(var key in data) {
                if(data.hasOwnProperty(key)) {
                    var game = data[key];
                    var template = gameHtml.replace('{enemy}', game.enemyName)
                        .replace('{status}', game.status)
                        .replace('{id}', game._id);
                    me.view.addGameItem($(template));
                }
            }
        });
    };

    LobbyPresenter.prototype.joinGame = function(gameId) {
        game.setState(setupState);
    };

    return LobbyPresenter;
});