"use strict";

define(['entity/Ship3D', 'assets'], function(Ship3D, assets) {
    var ShipFactory = function() {

    };

    ShipFactory.prototype.create = function(ship) {
        var ship3d = new Ship3D(ship);
        var shipLength = ship.length;
        var testMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
        var geometry = new THREE.BoxGeometry(20 * shipLength, 20, 20);
        if(ship.name === 'Destoryer') {
            geometry = assets.geometries.destroyer;
        } else if(ship.name === 'Patrol boat') {
            geometry = assets.geometries.patrol_boat;
        } else if(ship.name === 'Submarine') {
            geometry = assets.geometries.submarine;
        } else if(ship.name === 'Battleship') {
            geometry = assets.geometries.battleship_dummy;
        } else if(ship.name === 'Aircraft carrier') {
            geometry = assets.geometries.aircraft_carrier;
        }

        var testMesh = new THREE.Mesh(geometry, testMaterial);

        ship3d.addObject(testMesh);

        return ship3d;
    };

    return new ShipFactory();
});