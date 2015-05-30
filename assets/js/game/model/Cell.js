define(['jquery'], function($) {
    var Cell = function(cell) {
        if($.type(cell.x) === 'string') {
            // set from server response (a, 1)
            this.x = cell.x.charCodeAt(0) - 97;
            this.y = cell.y - 1;
        } else {
            // set from x, y (0, 0)
            this.x = cell.x;
            this.y = cell.y;
        }
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