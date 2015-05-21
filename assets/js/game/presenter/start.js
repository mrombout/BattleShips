define(['view/lobby'], function(lobbyView) {
    var StartPresenter = function(startView) {
        this.view = startView;
    };

    StartPresenter.prototype.goToLobby = function() {
        this.view.hide();
        lobbyView.show();
    };

    StartPresenter.prototype.hideLobby = function() {
        lobbyView.hide();
    };

    return StartPresenter;
});