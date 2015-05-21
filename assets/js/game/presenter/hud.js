"use strict";

define(['three', 'scene', 'camera', 'game', 'service/setup', 'text!/BattleShipsters/assets/html/_ship.html'], function(THREE, scene, camera, game, setupService, shipHtml) {
    var HUDController = function(hudView) {
        this.hudView = hudView;

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
    };

    HUDController.prototype.loadShips = function() {
        var me = this;

        setupService.getShips().done(function(ships) {
            for(var key in ships) {
                if(ships.hasOwnProperty(key)) {
                    var ship = ships[key];
                    var template = shipHtml.replace(/\{name\}/g, ship.name)
                        .replace(/\{length\}/g, ship.length);
                    console.log(me);
                    me.hudView.addShipItem($(template));
                }
            }
        });
    };

    HUDController.prototype.selectShip = function(ship) {
        this.selectedShip = ship;
        this.isVertical = false;

        game.state.disableControls();

        var shipLength = ship.data('length');
        var testGeometry = new THREE.BoxGeometry(20 * shipLength, 20, 20);
        testGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(10 * shipLength, 0, 10)); // normalize positions to top-left
        var testMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, opacity: 0.5, transparent: true });
        this.testMesh = new THREE.Mesh(testGeometry, testMaterial);
        scene.add(this.testMesh);

        this.onDocumentMouseMoveBind = function(e) {
            this.onDocumentMouseMove(e);
        }.bind(this);
        document.addEventListener('mousemove', this.onDocumentMouseMoveBind, false);
    };

    HUDController.prototype.deselectShip = function() {
        this.selectedShip = null;

        game.state.enableControls();

        document.removeEventListener('mousemove', this.onDocumentMouseMoveBind);

        scene.remove(this.testMesh);
    };

    HUDController.prototype.rotateSelectedShip = function() {
        if(this.isVertical) {
            console.log('turning to horizontal');
            this.testMesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 20));
            this.testMesh.rotation.y = 0;
        } else {
            console.log('turning to vertical');
            this.testMesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -20));
            this.testMesh.rotation.y = -Math.PI / 2;
        }
        this.isVertical = !this.isVertical;
    };

    HUDController.prototype.onDocumentMouseMove = function(e) {
        e.preventDefault();

        this.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
        this.raycaster.setFromCamera(this.mouse, camera);

        var intersects = this.raycaster.intersectObject(scene.getObjectByName("dank"));
        if(intersects.length > 0) {
            var intersect = intersects[0];

            this.testMesh.position.copy(intersect.point).add(intersect.face.normal);
            this.testMesh.position.divideScalar(20).floor().multiplyScalar(20);
        }
    };

    return HUDController;
});