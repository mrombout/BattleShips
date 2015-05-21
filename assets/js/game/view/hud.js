"use strict";

define(['container', 'text!/BattleShipsters/assets/html/hud.html', 'jquery', '../presenter/hud'], function(container, viewHtml, $, HUDPresenter) {
    var HUD = function() {
        this.domElement = $(viewHtml);
        this.domElement.hide();

        this.domElement.on('mousedown', 'li', this, this.onMenuItemMouseDown);

        this.presenter = new HUDPresenter();

        container.append(this.domElement);
    };

    HUD.prototype.onMenuItemMouseDown = function(e) {
        var $this = $(this);

        console.log('mousedown');

        container.on('mouseup', e.data, e.data.onDocumentMouseUp);

        e.data.presenter.selectShip($this);

        $this.css('opacity', '0');
        $this.animate({
            height: 0
        }, 500, function() {
            $this.hide();
        });
    };

    HUD.prototype.onDocumentMouseUp = function(e) {
        var $this = $(this);
        var $selectedShip = e.data.presenter.selectedShip;

        if($selectedShip) {
            $selectedShip.stop();
            $selectedShip.show();
            $selectedShip.css('opacity', '1');
            $selectedShip.animate({
                height: 48
            }, 500);

            e.data.presenter.deselectShip();
        }
    };

    HUD.prototype.show = function() {
        this.domElement.show();
    };

    return new HUD();
});