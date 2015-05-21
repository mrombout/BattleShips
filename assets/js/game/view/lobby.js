define(['container', 'text!/BattleShipsters/assets/html/lobby.html', 'presenter/lobby', 'jquery'], function($container, viewHtml, LobbyPresenter, $) {
    var Start = function() {
        this.domElement = $(viewHtml);
        this.domElement.hide();

        this.tbody = this.domElement.find('tbody');
        this.spinner = this.domElement.find('.load-spinner');
        this.refreshButton = this.domElement.find('.refresh');

        this.refreshButton.on('click', function(e) {
            this.onRefreshButtonClick(e);
        }.bind(this));
        this.tbody.on('click', '.join', function(e) {
            this.onJoinButtonClick(e);
        }.bind(this));

        this.presenter = new LobbyPresenter(this);

        $container.prepend(this.domElement);
    };

    Start.prototype.onRefreshButtonClick = function() {
        this.spinner.show();
        this.presenter.loadGames();
    };

    Start.prototype.onJoinButtonClick = function(e) {
        var $joinButton = $(e.target);
        var gameId = $joinButton.data('id');

        this.presenter.joinGame(gameId);
    };

    Start.prototype.addGameItem = function(gameItem) {
        this.tbody.append(gameItem);
        this.spinner.hide();
    };

    Start.prototype.clearGameItems = function() {
        this.tbody.empty();
    };

    Start.prototype.show = function() {
        this.domElement.show();

        this.spinner.show();

        this.presenter.loadGames();
    };

    Start.prototype.hide = function() {
        this.domElement.hide();
        this.spinner.hide();
    };

    return new Start();
});