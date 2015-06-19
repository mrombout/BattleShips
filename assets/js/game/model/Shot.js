define(['model/Cell'], function(Cell) {

    /**
     * Represents a shot made by the player of the enemy and provides the
     * available responses from the server when a shot is made.
     *
     * @param shot
     * @constructor
     */
    var Shot = function(shot) {
        this._id = shot._id;
        this.cell = new Cell({ x: shot.x, y: shot.y });
        this.isHit = shot.isHit;
    };

    /**
     * Updates this shot with new data retrieved from the server.
     */
    Shot.prototype.update = function() {

    };

    Shot.BOOM ="BOOM";
    Shot.SPLASH = "SPLASH";
    Shot.FAIL = "FAIL";
    Shot.WINNER = "WINNER";

    return Shot;
});