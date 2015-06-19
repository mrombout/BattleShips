"use strict";

define(['model/Cell'], function(Cell) {

    /**
     * Represents a single game ship.
     *
     * @param shipJson
     * @constructor
     */
    var Ship = function(shipJson) {
        this._id = shipJson._id;
        this.name = shipJson.name;
        this.length = shipJson.length;
        this.hits = shipJson.hits;

        if(shipJson.startCell) {
            this.startCell = new Cell(shipJson.startCell);
        }
        this.isVertical = shipJson.isVertical;
        this.__v = 0;
    };

    /**
     * Updates this ship with new data.
     *
     * @param {{hits: Array}} data
     */
    Ship.prototype.update = function(data) {
        this.hits = data.hits;
    };

    /**
     * Returns whether this ship of overlapping with the given boat position
     * and length.
     *
     * @param {number} x
     * @param {number} y
     * @param {number} length
     * @param {boolean} isVertical
     * @returns {boolean}
     */
    Ship.prototype.isOverlapping = function(x, y, length, isVertical) {
        if(!this.startCell || !this.length) {
            return false;
        }

        if(this.startCell.x === x && this.startCell.y === y)
            return true;

        // calculate occupied
        var occupied = [];
        var i;
        for(i = 0; i < this.length; i++) {
            if(this.isVertical)
                occupied.push({ x: this.startCell.x, y: this.startCell.y + i });
            else
                occupied.push({ x: this.startCell.x + i, y: this.startCell.y });
        }

        for(i = 0; i < length; i++) {
            var testCell = {};
            if(isVertical) {
                testCell = { x: x, y: y + i };
            } else {
                testCell = { x: x + i, y: y };
            }

            for(var o = 0; o < this.length; o++) {
                var occupiedCell = occupied[o];

                if(occupiedCell.x === testCell.x && occupiedCell.y === testCell.y) {
                    return true;
                }
            }
        }
    };

    return Ship;
});
