"use strict";

define(['container', 'text!../../../html/lobby.html', 'jquery'], function($container, viewHtml, $) {
    /**
     * Represents the lobby screen. This is first screen when the player starts
     * the game. It displays a list of all available games and allows the
     * player to start a new game, join an existing one or clear all
     * outstanding games.
     *
     * @param presenter
     * @constructor
     */
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

    /**
     * Notifies the presenter to reload the available games.
     *
     * This method is triggered when the players clicks the refresh button.
     */
    Lobby.prototype.onRefreshButtonClick = function() {
        this.spinner.show();
        this.presenter.loadGames();
    };

    /**
     * Notifies the presenter to clear all outstanding games.
     *
     * This method is triggered when the player clicks the clear button.
     */
    Lobby.prototype.onClearButtonClick = function() {
        this.presenter.clearGames();
    };

    /**
     * Notifies the presenter to join a specific game.
     *
     * This method is triggered when the players clicks one of the join
     * buttons.
     *
     * @param e
     */
    Lobby.prototype.onJoinButtonClick = function(e) {
        var $joinButton = $(e.target);
        var gameId = $joinButton.data('id');

        this.presenter.joinGame(gameId);
    };

    /**
     * Notifies the presenter to create a new game against the AI.
     *
     * This method is triggered when the player clicks the AI button.
     *
     * @param e
     */
    Lobby.prototype.onAiButtonClick = function(e) {
        this.presenter.createAiGame();
    };

    /**
     * Notifies the presenter to queue for a new game against nother player.
     *
     * This method is triggered when the players clicks the create button.
     *
     * @param e
     */
    Lobby.prototype.onCreateButtonClick = function(e) {
        this.presenter.createGame();
    };

    /**
     * Adds a new Game to the list of available games.
     *
     * @param gameItem
     */
    Lobby.prototype.addGameItem = function(gameItem) {
        this.tbody.append(gameItem);
        this.spinner.hide();
    };

    /**
     * Clears the list of available games from the view.
     */
    Lobby.prototype.clearGameItems = function() {
        this.tbody.empty();
    };

    /**
     * Shows this view and notifies the presenter to start loading the
     * available games.
     */
    Lobby.prototype.show = function() {
        this.domElement.show();

        this.spinner.show();

        this.presenter.loadGames();
    };

    /**
     * Hides this view.
     */
    Lobby.prototype.hide = function() {
        this.domElement.hide();
        this.spinner.hide();
    };

    return Lobby;
});