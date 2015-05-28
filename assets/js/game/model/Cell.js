define(['jquery'], function($) {
    var Cell = function(cell) {
        if($.type(cell.x) === 'string') {
            this.x = cell.x.charCodeAt(0) - 97;
        } else {
            this.x = cell.x;
        }
        this.y = cell.y;
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