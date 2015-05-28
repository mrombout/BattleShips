define(['jquery', 'text!/BattleShipsters/assets/html/started.html', 'container'], function($, startedHtml, $container) {
    var Started = function() {
        this.$domElement = $(startedHtml);
        this.$domElement.hide();

        $container.prepend(this.$domElement);
    };

    Started.prototype.show = function() {
        this.$domElement.show();
    };

    Started.prototype.hide = function() {

    };

    return new Started();
});