"use strict";

define(['entity/Ship3D', 'assets'], function(Ship3D, assets) {
    var ShipFactory = function() {

    };

    ShipFactory.prototype.create = function(ship) {
        var ship3d = new Ship3D(ship);
        var shipLength = ship.length;
        var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
        var geometry = new THREE.BoxGeometry(20 * shipLength, 20, 20);
        if(ship.name === 'Destoryer') {
            geometry = assets.geometries.destroyer;
            material = assets.materials.destroyer.default;
        } else if(ship.name === 'Patrol boat') {
            geometry = assets.geometries.patrol_boat;
            material = assets.materials.patrol_boat.default;
        } else if(ship.name === 'Submarine') {
            geometry = assets.geometries.submarine;
            material = assets.materials.submarine.default;
        } else if(ship.name === 'Battleship') {
            geometry = assets.geometries.battleship_dummy;
            material = assets.materials.battleship_dummy.texture;
        } else if(ship.name === 'Aircraft carrier') {
            geometry = assets.geometries.aircraft_carrier;
            material = assets.materials.aircraft_carrier.default;
        }

        var testMesh = new THREE.Mesh(geometry, material);

        ship3d.addObject(testMesh);

        return ship3d;
    };

    return new ShipFactory();
});