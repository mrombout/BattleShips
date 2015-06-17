define(['jquery', 'text!/BattleShipsters/assets/html/done.html', 'container', 'util/sprintf'], function($, doneHtml, $container, sprintf) {
    var Done = function(gameModel) {
        this.$domElement = $(doneHtml);
        this.$domElement.hide();
        console.log('this is the ', gameModel);
        this.$domElement.html(sprintf(this.$domElement.html(), {
            "winMsg": gameModel.youWon ? "You won!" : "You lost!",
            "eHit": gameModel.myGameboard.getHits().length,
            "eMiss": gameModel.myGameboard.getMiss().length,
            "eTotal": gameModel.myGameboard.getTotalShots().length,
            "eRatio": gameModel.myGameboard.getRatio() + "%",
            "pHit": gameModel.enemyGameboard.getHits().length,
            "pMiss": gameModel.enemyGameboard.getMiss().length,
            "pTotal": gameModel.enemyGameboard.getTotalShots().length,
            "pRatio": gameModel.enemyGameboard.getRatio() + "%"
        }));

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

    return Done;
});