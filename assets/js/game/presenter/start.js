define(['view/lobby'], function(lobbyView) {
    var StartPresenter = function(view) {
        this.view = view;

        this.registerListeners();

        console.info('PRESENTER', 'START', 'Constructed', view);
    };

    StartPresenter.prototype.registerListeners = function() {
        var me = this;
        this.view.on('start_click', function() {
            me.goToLobby();
        });
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