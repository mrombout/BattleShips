define(['./Boat'], function() {
    var Destroyer = function() {
	    this.size = 3;
    };
    Destroyer.prototype = Objects.create(Boat);

    return Destroyer;
});
