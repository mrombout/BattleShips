"use strict";

define(['three', 'jquery', 'model/Cell', 'model/Ship', 'model/Shot'], function(THREE, $, Cell, Ship, Shot) {
    /**
     * Represents the 10x10 board grid of the game.
     *
     * @param board
     * @constructor
     */
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
                        this.shots[shot._id] = new Shot(shot);
                    }
                }
            }
        }
	};

    /**
     * Updates this ships model with new data retrieved from the Zeeslag API.
     *
     * @param data
     */
    Board.prototype.update = function(data) {
        this.latestShots = [];

        // update ships
        for(var shipKey in data.ships) {
            if(data.ships.hasOwnProperty(shipKey)) {
                var ship = data.ships[shipKey];
                if(this.ships.hasOwnProperty(ship._id)) {
                    this.ships[ship._id].update(ship);
                } else {
                    this.ships.push(new Ship(ship));
                }
            }
        }

        // update shots
        for(var shotKey in data.shots) {
            if(data.shots.hasOwnProperty(shotKey)) {
                var shot = data.shots[shotKey];
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

    /**
     * Places a Ship on this board.
     *
     * @param {number} x
     * @param {number|Ship} y
     * @param {Ship|undefined} [ship]
     */
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

    /**
     * Return whether the given data overlaps with another ship in this board.
     *
     * @param {number} x
     * @param {number} y
     * @param {number} length
     * @param {boolean} isVertical
     * @returns {boolean}
     */
    Board.prototype.isOverlapping = function(x, y, length, isVertical) {
        for(var key in this.ships) {
            if(this.ships.hasOwnProperty(key)) {
                var ship = this.ships[key];
                if(ship.isOverlapping(x, y, length, isVertical))
                    return true;
            }
        }
    };

    /**
     * Returns the latest shots since the last sync.
     *
     * @returns {Array}
     */
    Board.prototype.getLatestShots = function() {
        return this.latestShots;
    };

    /**
     * Returns the hits made on this board.
     *
     * @returns {Array}
     */
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

    /**
     * Returns the misses made on this board.
     *
     * @returns {Array}
     */
    Board.prototype.getMiss = function() {
        var miss = [];
        for(var key in this.shots) {
            if(this.shots.hasOwnProperty(key)) {
                var shot = this.shots[key];
                if(!shot.isHit) {
                    miss.push(shot);
                }
            }
        }

        return miss;
    };

    /**
     * Returns the total shots (all) made on this board.
     *
     * @returns {Array}
     */
    Board.prototype.getTotalShots = function() {
        var shots = [];
        for(var key in this.shots) {
            if(this.shots.hasOwnProperty(key)) {
                var shot = this.shots[key];
                shots.push(shot);
            }
        }

        return shots;
    };

    /**
     * Returns the ratio of hit and miss shots.
     *
     * @returns {number}
     */
    Board.prototype.getRatio = function() {
        return Math.round(this.getHits().length / this.getTotalShots().length * 100);
    };

    /**
     * Resets the ships on this board.
     */
    Board.prototype.resetShips = function() {
        this.ships = [];
    };

    return Board;
});
