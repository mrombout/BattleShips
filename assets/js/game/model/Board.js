"use strict";

define(['three', 'model/Cell', 'model/Ship', 'model/Shot'], function(THREE, Cell, Ship, Shot) {
	var Board = function(board) {
        this.ships = [];
        this.shots = [];

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

            if(board.shots) {
                for(var key in board.shots) {
                    if(board.shots.hasOwnProperty(key)) {
                        var shot = board.shots[key];
                        var cell = new Shot(shot);
                        this.shots.push(cell);
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
