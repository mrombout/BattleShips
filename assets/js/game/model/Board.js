"use strict";

define(function() {
	var Board = function() {
        this.id = null;

		this.tiles = [];
		this.boats = [];
	};

	Board.prototype.addTile = function(tile) {
		this.tiles.append(tile);
	};

	Board.prototype.addBoat = function(boat) {
		this.boats.append(boat);
	};

    return Boat;
});
