define(['./Boat'], function(Boat) {
	// AircraftCarrier
	var AircraftCarrier = function() {
		this.size = 5;
	};
	AircraftCarrier.prototype = Objects.create(Boat);

	return AircraftCarrier;
});
