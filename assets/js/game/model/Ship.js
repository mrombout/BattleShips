"use strict";

define(function() {
	var Ship = function(shipJson) {
        this._id = shipJson._id;
        this.name = shipJson.name;
        this.length = shipJson.length;
        this.startCell = null;
        this.isVertical = false;
        this.__v = 0;
	};

    Ship.prototype.isOverlapping = function(x, y, length, isVertical) {
        if(!this.startCell || !this.length) {
            return false;
        }

        if(this.startCell.x === x && this.startCell.y === y)
            return true;

        // calculate occupied
        var occupied = [];
        for(var i = 0; i < this.length; i++) {
            if(this.isVertical)
                occupied.push({ x: this.startCell.x, y: this.startCell.y + i });
            else
                occupied.push({ x: this.startCell.x + i, y: this.startCell.y });
        }

        for(var i = 0; i < length; i++) {
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
