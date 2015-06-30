"use strict";

define(['container', 'text!../../../html/hud.html', 'jquery', 'text!../../../html/_ship.html', 'view/View'], function($container, viewHtml, $, shipHtml, View) {
    var HUD = function(presenter) {
        View.call(this);
        this.presenter = presenter;

        this.selectElements();
        this.registerEvents();
    };
    HUD.prototype = Object.create(View.prototype);
    HUD.prototype.constructor = HUD;

    HUD.prototype.selectElements = function() {
        this.$domElement = $(viewHtml);
        this.$domElement.hide();
        $container.prepend(this.$domElement);

        this.$ul = this.$domElement.find('ul');

        this.$readyButton = this.$domElement.find('button#setup-ready');
        this.$readyButton.prop('disabled', true);

        this.$resetButton = this.$domElement.find('button#setup-reset');
        this.$resetButton.prop('disabled', true);

        this.$waiting = this.$domElement.find('#waiting');
        this.$waiting.hide();
    };

    HUD.prototype.registerEvents = function() {
        this.$domElement.on('mousedown', 'li', function(e) { this.onMenuItemMouseDown(e); }.bind(this));
        this.$domElement.on('touchstart', 'li', function(e) { console.log(e); this.onMenuItemMouseDown(e); }.bind(this));
        $container.on('mouseup', function(e) { this.onDocumentMouseUp(e); }.bind(this));
        $container.on('touchend', function(e) { this.onDocumentMouseUp(e); }.bind(this));
        this.$readyButton.on('click', function(e) { this.onReadyClick(e); }.bind(this));
        this.$resetButton.on('click', function(e) { this.onResetClick(e);}.bind(this));
    };

    /**
     * Adds a new ship elements to the menu.
     *
     * @param ship
     */
    HUD.prototype.addShipItem = function(ship) {
        var shipItem = $(shipHtml.replace(/\{name\}/g, ship.name)
            .replace(/\{length\}/g, ship.length));
        shipItem.data('ship', ship);
        this.$ul.append(shipItem);
    };

    /**
     * Enables or disables the "Ready" button used to post a gameboard to the
     * server.
     *
     * @param {bool} isReady
     */
    HUD.prototype.setIsReady = function(isReady) {
        this.$readyButton.prop('disabled', !isReady);
    };

    /**
     * Enables or disables the "Reset" button used to reset the currently
     * placed ships.
     *
     * @param canReset
     */
    HUD.prototype.setCanReset = function(canReset) {
        this.$resetButton.prop('disabled', !canReset);
    };

    /**
     * Notifies the presenter that a ship should be placed on the board and
     * hides the ship from the menu.
     *
     * This method is triggered when the user clicks down on an item in the
     * ship menu.
     *
     * @param e
     */
    HUD.prototype.onMenuItemMouseDown = function(e) {
        var $this = $(e.currentTarget);

        if(e.button === 0 || e.type === "touchstart") {
            this.presenter.selectShip($this.data('ship'));
            this.$selectedShip = $this;

            $this.stop();
            $this.css('opacity', '0');
            $this.animate({
                height: 0
            }, 500, function() {
                $this.hide();
            });
        }
    };

    /**
     * Notifies the presenter that a ship should be dropped on its current
     * position. It permanently removes the ship from the menu when the
     * placement has been succesful or shows the item when it failed.
     *
     * This method is triggered when the user releases the mouse button
     * from a previous click on a ship menu item.
     *
     * @param e
     */
    HUD.prototype.onDocumentMouseUp = function(e) {
        var $this = $(e.target);

        if((e.button === 0 || e.type === 'touchend') && this.$selectedShip) {
            if(this.$selectedShip) {
                this.$selectedShip.stop();
                if(this.presenter.placeShip()) {
                    this.$selectedShip.remove();
                    this.$selectedShip = null;
                } else {
                    this.$selectedShip.show();
                    this.$selectedShip.css('opacity', '1');
                    this.$selectedShip.animate({
                        height: 48
                    }, 500);
                }
            }
        }

        if(e.button === 2 && this.$selectedShip) {
            $(this).trigger('rotateShip', [this.$selectedShip.data('ship')]);
        }
    };

    /**
     * Notifies the presenter that the user wants to reset the board.
     *
     * This method is triggered when the user clicks the "Reset" button.
     */
    HUD.prototype.onResetClick = function() {
        $(this).trigger('resetShips');

        this.$ul.empty();
    };

    /**
     * Notifies the presenter that the users wants to place the ships on the
     * board.
     *
     * This method is triggered when the user clicks the "Ready" button.
     */
    HUD.prototype.onReadyClick = function() {
        $(this).trigger('ready');
    };

    /**
     * Shows this view and notifies the presenter to load the ships.
     */
    HUD.prototype.show = function() {
        this.presenter.loadShips();
        this.$domElement.show();
    };

    /**
     * Hides this view.
     */
    HUD.prototype.hide = function() {
        this.$waiting.hide();
        this.$domElement.hide();
    };

    /**
     * Sets whether the user is currently waiting for an enemy. When they are
     * show the waiting spinner to the users.
     *
     * @param waiting
     */
    HUD.prototype.setWaitingForEnemy = function(waiting) {
        this.setIsReady(false);

        if(waiting) {
            this.$waiting.show();
        } else {
            this.$waiting.hide();
        }
    };

    return HUD;
});