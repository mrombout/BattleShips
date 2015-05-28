"use strict";

define(['three', 'model/Cell', 'model/Ship'], function(THREE, Cell, Ship) {
	var Board = function(board) {
        this.ships = [];

        if(board) {
            this._id = board._id;

            if(board.ships) {
                for(var key in board.ships) {
                    if(board.ships.hasOwnProperty(key)) {
                        var ship = new Ship(board.ships[key]);
                        this.ships.push(ship);
                    }
                }
            }
        }
	};

	Board.prototype.placeShip = function(x, y, ship) {
		if(x instanceof THREE.Vector2) {
            var vec2 = x;
            var ship = y;
            ship.startCell = new Cell({ x: vec2.x, y: vec2.y });
            this.ships.push(ship);
            return;
        }

        ship.startCell = new Cell({ x: x, y: y});
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
