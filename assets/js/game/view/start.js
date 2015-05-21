define(['container', 'text!/BattleShipsters/assets/html/start.html', 'presenter/start'], function($container, viewHtml, StartPresenter) {
    var Start = function() {
        this.domElement = $(viewHtml);
        this.domElement.hide();

        this.presenter = new StartPresenter(this);

        this.domElement.on('click', 'button', function(e) {
            this.onButtonClick(e);
        }.bind(this));

        $container.prepend(this.domElement);
    };

    Start.prototype.onButtonClick = function() {
        this.presenter.goToLobby();
    };

    Start.prototype.show = function() {
        this.domElement.show();
    };

    Start.prototype.hide = function() {
        this.domElement.hide();
        this.presenter.hideLobby();
    }

    return new Start();
});