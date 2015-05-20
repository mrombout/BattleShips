define(function() {
	var Board = function() {
        this.id = null;

		this.tiles = [];
		this.boats = [];
	};

	Board.prototype.addTile(tile) {
		this.tiles.append(tile);
	};

	Board.prototype.addBoat(boat) {
		this.boats.append(boat);
	};

    return Boat;
});
