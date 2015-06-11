define(['model/Cell'], function(Cell) {
    var Shot = function(shot) {
        this._id = shot._id;
        this.cell = new Cell({ x: shot.x, y: shot.y });
        this.isHit = shot.isHit;
    };

    Shot.prototype.update = function() {

    };

    Shot.BOOM ="BOOM";
    Shot.SPLASH = "SPLASH";
    Shot.FAIL = "FAIL";
    Shot.WINNER = "WINNER";

    return Shot;
});