"use strict";

define(['three'], function(THREE) {
	var Board = function() {
        this.id = null;

		this.ships = [];
	};

	Board.prototype.placeShip = function(x, y, ship) {
		if(typeof x instanceof THREE.Vector2) {

        }

        console.info('BOARD', 'Placed ship on ', x, y);
	};

    return Board;
});
