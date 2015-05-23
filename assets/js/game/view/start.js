"use strict";

define(['container', 'text!/BattleShipsters/assets/html/start.html', 'presenter/start', 'view/View'], function($container, viewHtml, StartPresenter, View) {
    var Start = function() {
        View.call(this);

        this.domElement = $(viewHtml);
        this.domElement.hide();

        this.presenter = new StartPresenter(this);

        this.domElement.on('click', 'button', function(e) {
            this.onButtonClick(e);
        }.bind(this));

        $container.prepend(this.domElement);
    };
    Start.prototype = Object.create(View.prototype);
    Start.prototype.constructor = Start;

    Start.prototype.onButtonClick = function() {
        $(this).trigger('start_click');
    };

    Start.prototype.show = function() {
        this.domElement.show();
    };

    Start.prototype.hide = function() {
        this.domElement.hide();
        this.presenter.hideLobby();
    };

    return new Start();
});