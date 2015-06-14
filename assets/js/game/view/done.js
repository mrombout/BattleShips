define(['jquery', 'text!/BattleShipsters/assets/html/done.html', 'container'], function($, doneHtml, $container) {
    var Done = function() {
        this.$domElement = $(doneHtml);
        this.$domElement.hide();

        $container.prepend(this.$domElement);
    };

    Done.prototype.show = function() {
        this.$domElement.show();
    };

    Done.prototype.hide = function() {
        this.$domElement.hide();
    };

    Done.prototype.setGame = function(game) {
        this.game = game;
    };

    return new Done();
});