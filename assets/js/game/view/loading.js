define(['container', 'text!/BattleShipsters/assets/html/loading.html', 'presenter/start'], function($container, viewHtml, LoadPresenter) {
    var Loading = function() {
        this.domElement = $(viewHtml);
        this.domElement.hide();

        this.sweeper = this.domElement.find('.sweeper');

        this.presenter = new LoadPresenter(this);

        $container.prepend(this.domElement);
    };

    Loading.prototype.setProgress = function(progressPercentage) {
        this.sweeper.css('transform', 'rotate(' + 360 * progressPercentage  + 'deg)');
    };

    Loading.prototype.show = function() {
        this.domElement.show();
    };

    Loading.prototype.hide = function() {
        this.domElement.hide();
    };

    return new Loading();
});