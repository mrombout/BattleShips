"use strict";

define(['./Boat'], function() {
    var PatrolBoat = function() {
	    this.size = 2;
    };
    PatrolBoat.prototype = Objects.create(Boat);

    return PatrolBoat;
});

