"use strict";

// Boat
var Boat = function() {

};

// AircraftCarrier
var AircraftCarrier = function() {
	this.size = 5;
};
AircraftCarrier.prototype = Objects.create(Boat);

// Battleship
var Battleship = function() {
	this.size = 4;
};
Battleship.prototype = Objects.create(Boat);

// Submarine
var Submarine = function() {
	this.size = 3;
};
Submarine.prototype = Objects.create(Boat);

// Destroyer
var Destroyer = function() {
	this.size = 3;
};
Destroyer.prototype = Objects.create(Boat);

// PatrolBoat
var PatrolBoat = function() {
	this.size = 2;
};
PatrolBoat.prototype = Objects.create(Boat);
