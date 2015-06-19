define(['jquery'], function($) {

    /**
     * Represents a Cell on a board. This prototype is mainly used as a
     * parameter to provide convenience functions and the convertion of
     * char based coordinate system from the API to the zero-int based
     * system used by this game.
     *
     * A board is not composed out of Cells.
     *
     * @param cell
     * @constructor
     */
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

    /**
     * Returns the X coordinate in the char based format used by the Zeeslag
     * API.
     *
     * @returns {string}
     */
    Cell.prototype.getX = function() {
        return String.fromCharCode(97 + this.x);
    };

    /**
     * Returns the Y coordinate in the char based and zero-int based system
     * used by the Zeeslag API and this game respectively.
     *
     * @returns {number}
     */
    Cell.prototype.getY = function() {
        return this.y + 1;
    };

    /**
     * Converts this call to JSON to be sent to the Zeeslap API. This method
     * will automatically be called by JSON.stringify.
     *
     * @returns {{x: string, y: number}}
     */
    Cell.prototype.toJSON = function() {
        return {
            x: this.getX(),
            y: this.getY()
        }
    };

    return Cell;
});