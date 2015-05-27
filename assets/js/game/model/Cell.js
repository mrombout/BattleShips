define(function() {
    var Cell = function(x, y) {
        this.x = x;
        this.y = y;
    };

    Cell.prototype.getX = function() {
        return String.fromCharCode(97 + x);
    };

    Cell.prototype.getY = function() {
        return y + 1;
    };

    return Cell;
});