define(['model/Cell'], function(Cell) {
    var Shot = function(shot) {
        this.BOOM ="BOOM";
        this.SPLASH = "SPLASH";
        this.FAIL = "FAIL";

        this.cell = new Cell({ x: shot.x, y: shot.y });
        if(shot.isHit) {
            this.isHit = true;
        }
    };

    return Shot;
});