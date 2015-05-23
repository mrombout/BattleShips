"use strict";

define(['container', 'text!/BattleShipsters/assets/html/hud.html', 'jquery', 'text!/BattleShipsters/assets/html/_ship.html'], function($container, viewHtml, $, shipHtml) {
    var HUD = function(presenter) {
        this.presenter = presenter;

        this.$domElement = $(viewHtml);
        this.$domElement.hide();
        $container.append(this.$domElement);

        this.$ul = this.$domElement.find('ul');

        this.registerEvents();
    };

    HUD.prototype.registerEvents = function() {
        this.$domElement.on('mousedown', 'li', function(e) { this.onMenuItemMouseDown(e); }.bind(this));
        $container.on('mouseup', function(e) { this.onDocumentMouseUp(e); }.bind(this));
    }

    HUD.prototype.addShipItem = function(ship) {
        var shipItem = $(shipHtml.replace(/\{name\}/g, ship.name)
            .replace(/\{length\}/g, ship.length));
        shipItem.data('ship', ship);
        shipItem.data('test', {cool:'nice'});
        this.$ul.append(shipItem);
    };

    HUD.prototype.onMenuItemMouseDown = function(e) {
        var $this = $(e.currentTarget);

        if(e.button === 0) {
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

        if(e.button === 0 && this.$selectedShip) {
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
            this.presenter.rotateSelectedShip();
        }
    };

    HUD.prototype.show = function() {
        this.presenter.loadShips();
        this.$domElement.show();
    };

    return HUD;
});