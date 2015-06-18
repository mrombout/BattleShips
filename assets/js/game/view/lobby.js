define(['container', 'text!../../../html/lobby.html', 'jquery'], function($container, viewHtml, $) {
    var Lobby = function(presenter) {
        this.presenter = presenter;

        this.domElement = $(viewHtml);
        this.domElement.hide();

        this.tbody = this.domElement.find('tbody');
        this.spinner = this.domElement.find('.load-spinner');
        this.refreshButton = this.domElement.find('.refresh');
        this.clearButton = this.domElement.find('.clear');
        this.aiButton = this.domElement.find('.AI');
        this.createButton = this.domElement.find('.create');

        this.refreshButton.on('click', function(e) {
            this.onRefreshButtonClick(e);
        }.bind(this));
        this.clearButton.on('click', function(e) {
            this.onClearButtonClick(e);
        }.bind(this));
        this.aiButton.on('click', function(e) {
            this.onAiButtonClick(e);
        }.bind(this));
        this.createButton.on('click', function(e) {
            this.onCreateButtonClick(e);
        }.bind(this));
        this.tbody.on('click', '.join', function(e) {
            this.onJoinButtonClick(e);
        }.bind(this));

        $container.prepend(this.domElement);
    };

    Lobby.prototype.onRefreshButtonClick = function() {
        this.spinner.show();
        this.presenter.loadGames();
    };

    Lobby.prototype.onClearButtonClick = function() {
        this.presenter.clearGames();
    };

    Lobby.prototype.onJoinButtonClick = function(e) {
        var $joinButton = $(e.target);
        var gameId = $joinButton.data('id');

        this.presenter.joinGame(gameId);
    };

    Lobby.prototype.onAiButtonClick = function(e) {
        this.presenter.createAiGame();
    };

    Lobby.prototype.onCreateButtonClick = function(e) {
        this.presenter.createGame();
    };

    Lobby.prototype.addGameItem = function(gameItem) {
        this.tbody.append(gameItem);
        this.spinner.hide();
    };

    Lobby.prototype.clearGameItems = function() {
        this.tbody.empty();
    };

    Lobby.prototype.show = function() {
        this.domElement.show();

        this.spinner.show();

        this.presenter.loadGames();
    };

    Lobby.prototype.hide = function() {
        this.domElement.hide();
        this.spinner.hide();
    };

    return Lobby;
});