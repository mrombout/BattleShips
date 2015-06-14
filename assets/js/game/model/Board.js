"use strict";

define(['three', 'jquery', 'model/Cell', 'model/Ship', 'model/Shot'], function(THREE, $, Cell, Ship, Shot) {
	var Board = function(board) {
        this.ships = {};
        this.shots = {};

        this.latestShots = [];

        if(board) {
            this._id = board._id;

            if(board.ships) {
                for(var key in board.ships) {
                    if(board.ships.hasOwnProperty(key)) {
                        var ship = new Ship(board.ships[key]);
                        this.ships[ship._id] = ship;
                    }
                }
            }

            if(board.shots) {
                for(var key in board.shots) {
                    if(board.shots.hasOwnProperty(key)) {
                        var shot = board.shots[key];
                        var cell = new Shot(shot);
                        this.shots[shot._id] = cell;
                    }
                }
            }
        }
	};

    Board.prototype.update = function(data) {
        this.latestShots = [];

        // update ships
        for(var key in data.ships) {
            if(data.ships.hasOwnProperty(key)) {
                var ship = data.ships[key];
                if(this.ships.hasOwnProperty(ship._id)) {
                    this.ships[ship._id].update(ship);
                } else {
                    this.ships.push(new Ship(ship));
                }
            }
        }

        // update shots
        for(var key in data.shots) {
            if(data.shots.hasOwnProperty(key)) {
                var shot = data.shots[key];
                if(this.shots.hasOwnProperty(shot._id)) {
                    console.log('just updating shots');
                    this.shots[shot._id].update(shot);
                } else {
                    console.log('actually creating shots');
                    this.shots[shot._id] = shot;
                    this.latestShots.push(shot);
                }
            }
        }
    };

	Board.prototype.placeShip = function(x, y, ship) {
		if(x instanceof THREE.Vector2) {
            var vec2 = x;
            var ship = y;
            ship.startCell = new Cell({ x: vec2.x, y: vec2.y });
            this.ships[ship._id] = ship;
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

    Board.prototype.getLatestShots = function() {
        return this.latestShots;
    };

    Board.prototype.getHits = function() {
        var hits = [];
        for(var key in this.shots) {
            if(this.shots.hasOwnProperty(key)) {
                var shot = this.shots[key];
                if(shot.isHit) {
                    hits.push(shot);
                }
            }
        }

        return hits;
    };

    Board.prototype.resetShips = function() {
        this.ships = [];
    };

    return Board;
});
