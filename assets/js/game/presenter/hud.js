"use strict";

define(['three', 'scene', 'camera', 'game'], function(THREE, scene, camera, game) {
    var HUDController = function(hudView) {
        this.hudView = hudView;

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
    };

    HUDController.prototype.selectShip = function(ship) {
        console.log('selected ship', ship);
        this.selectedShip = ship;

        var testGeometry = new THREE.BoxGeometry(20, 5, 20);
        var testMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, opacity: 0.5, transparent: true });
        this.testMesh = new THREE.Mesh(testGeometry, testMaterial);
        scene.add(this.testMesh);

        document.addEventListener('mousemove', function(e) {
            this.onDocumentMouseMove(e);
        }.bind(this), false);
    };

    HUDController.prototype.deselectShip = function() {
        console.log('deselected ship');
        this.selectedShip = null;

        scene.remove(this.testMesh);
    };

    HUDController.prototype.onDocumentMouseMove = function(e) {
        e.preventDefault();

        this.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
        this.raycaster.setFromCamera(this.mouse, camera);

        var intersects = this.raycaster.intersectObject(scene.getObjectByName("dank"));
        if(intersects.length > 0) {
            var intersect = intersects[0];

            this.testMesh.position.copy(intersect.point).add(intersect.face.normal);
            this.testMesh.position.divideScalar(20).floor().multiplyScalar(20).addScalar(10);
        }
    };

    return HUDController;
});