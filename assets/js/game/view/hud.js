"use strict";

define(['container', 'text!/BattleShipsters/assets/html/hud.html', 'jquery', '../presenter/hud'], function(container, viewHtml, $, HUDPresenter) {
    var HUD = function() {
        this.domElement = $(viewHtml);
        this.domElement.hide();

        this.ul = this.domElement.find('ul');

        this.domElement.on('mousedown', 'li', function(e) {
            this.onMenuItemMouseDown(e);
        }.bind(this));
        container.on('mouseup', function(e) {
            this.onDocumentMouseUp(e);
        }.bind(this));

        this.presenter = new HUDPresenter(this);

        container.append(this.domElement);
    };

    HUD.prototype.addShipItem = function(shipItem) {
        this.ul.append(shipItem);
    };

    HUD.prototype.onMenuItemMouseDown = function(e) {
        var $this = $(e.target);

        console.log('mousedown');

        if(e.button === 0) {
            this.presenter.selectShip($this);

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
        var $selectedShip = this.presenter.selectedShip;

        console.log('mouseup');

        if(e.button === 0 && $selectedShip) {
            if($selectedShip) {
                $selectedShip.stop();
                $selectedShip.show();
                $selectedShip.css('opacity', '1');
                $selectedShip.animate({
                    height: 48
                }, 500);

                this.presenter.deselectShip();
            }
        }

        if(e.button === 2 && $selectedShip) {
            this.presenter.rotateSelectedShip();
        }
    };

    HUD.prototype.show = function() {
        this.presenter.loadShips();
        this.domElement.show();
    };

    return new HUD();
});