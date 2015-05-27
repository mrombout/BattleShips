"use strict";

define(['three', 'model/Cell'], function(THREE, Cell) {
	var Board = function() {
        //this.id = null;

		this.ships = [];
	};

	Board.prototype.placeShip = function(x, y, ship) {
		if(x instanceof THREE.Vector2) {
            var vec2 = x;
            var ship = y;
            ship.startCell = new Cell(vec2.x, vec2.y);
            this.ships.push(ship);
            return;
        }

        ship.startCell = new Cell(x, y);
        this.ships.push(ship);
        console.info('BOARD', 'Placed ship on ', x, y);
	};

    Board.prototype.isOverlapping = function(x, y, length, isVertical) {
        for(var key in this.ships) {
            if(this.ships.hasOwnProperty(key)) {
                var ship = this.ships[key];
                if(ship.isOverlapping(x, y, length, isVertical))
                    return true;
            }
        }
    };

    return Board;
});
