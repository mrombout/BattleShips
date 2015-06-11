define(['jquery', 'text!/BattleShipsters/assets/html/started.html', 'container'], function($, startedHtml, $container) {
    var Started = function() {
        this.$domElement = $(startedHtml);
        this.$domElement.hide();

        this.$turn = this.$domElement.find('#turn');
        this.$playerScore = this.$domElement.find('#playerscore');
        this.$enemyScore = this.$domElement.find('#enemyscore');

        $container.prepend(this.$domElement);
    };

    Started.prototype.show = function() {
        this.$domElement.show();
    };

    Started.prototype.hide = function() {
        this.$domElement.hide();
    };

    Started.prototype.setGame = function(game) {
        this.game = game;

        console.log('this is the game', game);
        this.$turn.html(game.yourTurn ? "Your turn!" : "Enemy's Attacking!");
        this.$playerScore.html(game.getPlayerScore());
        this.$enemyScore.html(game.getEnemyScore());
    };

    return new Started();
});