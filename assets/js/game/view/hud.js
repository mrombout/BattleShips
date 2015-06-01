"use strict";

define(['container', 'text!/BattleShipsters/assets/html/hud.html', 'jquery', 'text!/BattleShipsters/assets/html/_ship.html', 'view/View'], function($container, viewHtml, $, shipHtml, View) {
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

        this.$button = this.$domElement.find('button');
        this.$button.prop('disabled', true);

        this.$waiting = this.$domElement.find('#waiting');
        this.$waiting.hide();
    };

    HUD.prototype.registerEvents = function() {
        this.$domElement.on('mousedown', 'li', function(e) { this.onMenuItemMouseDown(e); }.bind(this));
        this.$domElement.on('touchstart', 'li', function(e) { console.log(e); this.onMenuItemMouseDown(e); }.bind(this));
        $container.on('mouseup', function(e) { this.onDocumentMouseUp(e); }.bind(this));
        $container.on('touchend', function(e) { this.onDocumentMouseUp(e); }.bind(this));
        this.$button.on('click', function(e) { this.onReadyClick(e); }.bind(this));
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

    HUD.prototype.setIsReady = function() {
        this.$button.prop('disabled', false);
    };

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
            $(this).trigger('rotateShip', this.$selectedShip.data('ship'));
        }
    };

    HUD.prototype.onReadyClick = function() {
        $(this).trigger('ready');
    };

    HUD.prototype.show = function() {
        this.presenter.loadShips();
        this.$domElement.show();
    };

    HUD.prototype.hide = function() {
        this.$waiting.hide();
        this.$domElement.hide();
    };

    HUD.prototype.setWaitingForEnemy = function(waiting) {
        if(waiting) {
            this.$waiting.show();
        } else {
            this.$waiting.hide();
        }
    };

    return HUD;
});