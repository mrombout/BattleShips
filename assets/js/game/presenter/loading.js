define(['view/lobby'], function(lobbyView) {

    var LoadingPresenter = function(loadingView) {
        this.view = loadingView;
    };

    return LoadingPresenter;
});