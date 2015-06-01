define(['model/Cell'], function(Cell) {
    var Shot = function(shot) {
        this.cell = new Cell({ x: shot.x, y: shot.y });
        if(shot.isHit) {
            this.isHit = true;
        }
    };

    Shot.prototype.update = function() {

    };

    Shot.BOOM ="BOOM";
    Shot.SPLASH = "SPLASH";
    Shot.FAIL = "FAIL";

    return Shot;
});