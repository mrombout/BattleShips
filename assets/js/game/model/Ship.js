"use strict";

define(function() {
	var Ship = function(shipJson) {
        this.name = shipJson.name;
        this.length = shipJson.length;
        this.startCell = null;
        this.isVertical = false;
	};

    Ship.prototype.isOverlapping = function(x, y, length, isVertical) {
        if(!this.startCell || !this.length) {
            return false;
        }

        if(this.startCell.x === x && this.startCell.y === y)
            return true;

        for(var i = 0; i < this.length; i++) {
            var occupied = {};
            if(this.isVertical)
                occupied = { x: this.startCell.x, y: this.startCell.y + i };
            else
                occupied = { x: this.startCell.x + i, y: this.startCell.y };


        }
    };

    return Ship;
});
