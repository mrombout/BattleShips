define(function() {
    var Cell = function(x, y) {
        this.x = x;
        this.y = y;
    };

    Cell.prototype.getX = function() {
        return String.fromCharCode(97 + this.x);
    };

    Cell.prototype.getY = function() {
        return this.y + 1;
    };

    Cell.prototype.toJSON = function() {
        return {
            x: this.getX(),
            y: this.getY()
        }
    };

    return Cell;
});