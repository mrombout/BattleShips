define(['.Boat'], function() {
    var Submarine = function() {
	    this.size = 3;
    };
    Submarine.prototype = Objects.create(Boat);

    return Submarine;
});
