define(['jquery', 'text!../../../html/done.html', 'container', 'util/sprintf', 'view/View'], function($, doneHtml, $container, sprintf, View) {
    var DoneView = function(gameModel) {
        View.call(this);

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
    DoneView.prototype = Object.create(View.prototype);
    DoneView.prototype.constructor = DoneView;

    DoneView.prototype.onBackClick = function() {
        console.log('back lcick');
        $(this).trigger('back');
    };

    DoneView.prototype.show = function() {
        this.$domElement.show();
    };

    DoneView.prototype.hide = function() {
        this.$domElement.hide();
    };

    DoneView.prototype.setGame = function(game) {
        this.game = game;
    };

    return DoneView;
});