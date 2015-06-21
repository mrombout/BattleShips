define(['jquery', 'text!../../../html/done.html', 'container', 'util/sprintf', 'view/View'], function($, doneHtml, $container, sprintf, View) {
    var Done = function(gameModel) {
        this.$domElement = $(doneHtml);
        this.$domElement.hide();

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

        this.$domElement.find('#back').on('click', function(e) {
            this.onBackClick(e);
        }.bind(this));

        $container.prepend(this.$domElement);
    };
    Done.prototype = Object.create(View.prototype);
    Done.prototype.constructor = Done;

    Done.prototype.onBackClick = function() {
        $(this).trigger('back');
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