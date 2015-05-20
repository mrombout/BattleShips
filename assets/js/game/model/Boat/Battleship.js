define(['./Boat'], function(Boat) {
	var Battleship = function() {
		this.size = 4;
	};
	Battleship.prototype = Objects.create(Boat);

    return Battleship;
});
