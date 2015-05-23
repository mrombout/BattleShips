"use strict";

define(['state/State', 'renderer', 'scene', 'camera', 'view/hud', 'three', 'service/setup', 'factory/ship', 'entity/Board3D', 'model/Board'], function(State, renderer, scene, camera, HUDView, THREE, setupService, ShipFactory, Board3D, Board) {
    var Setup = function() {
        State.call(this);

        this.hudView = new HUDView(this);

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
    };
    Setup.prototype = Object.create(State.prototype);
    Setup.prototype.constructor = Setup;

    Setup.prototype.show = function() {
        this.parent = new THREE.Object3D();

        this.createControls();
        this.createGrid();

        this.hudView.show();

        camera.position.set(0, 200, 300);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        scene.add(this.parent);
    };

    Setup.prototype.hide = function() {
        scene.remove(this.parent);
    };

    Setup.prototype.createControls = function() {
        this.controls = new THREE.TrackballControls(camera, renderer.domElement);
        this.controls.rotateSpeed = 2.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;

        this.controls.noZoom = false;
        this.controls.noPan = false;

        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;

        this.controls.keys = [ 65, 83, 68 ];
    };

    Setup.prototype.createGrid = function() {
        this.board = new Board3D(new Board());
        this.parent.add(this.board.getObject());
    };

    Setup.prototype.enableControls = function() {
        this.controls.enabled = true;
    };

    Setup.prototype.disableControls = function() {
        this.controls.enabled = false;
    };

    Setup.prototype.update = function() {
        // update controls
        this.controls.update();

        // update water
        if(!this.water) {
            this.water = scene.getObjectByName("water")
        } else {
            this.water.material.uniforms.time.value += 1.0 / 60.0;
        }
    };

    /**
     * Loads the available ships from the API service and adds them to the
     * view.
     */
    Setup.prototype.loadShips = function() {
        var me = this;

        setupService.getShips().done(function(ships) {
            for(var key in ships) {
                if(ships.hasOwnProperty(key)) {
                    var ship = ships[key];
                    me.hudView.addShipItem(ship);
                }
            }
        });
    };

    Setup.prototype.selectShip = function(ship) {
        this.isVertical = false;

        this.disableControls();

        this.selectedShip = ShipFactory.create(ship);
        console.log(this.selectedShip.getObject());
        scene.add(this.selectedShip.getObject());

        this.onDocumentMouseMoveBind = function(e) {
            this.onDocumentMouseMove(e);
        }.bind(this);
        document.addEventListener('mousemove', this.onDocumentMouseMoveBind, false);
    };

    Setup.prototype.deselectShip = function() {
        this.enableControls();

        document.removeEventListener('mousemove', this.onDocumentMouseMoveBind);

        scene.remove(this.selectedShip.getObject());

        this.selectedShip = null;
    };

    Setup.prototype.placeShip = function() {
        if(!this.isWithinBoardBounds(this.selectedShip.getObject())) {
            this.deselectShip();
            return false;
        }

        this.board.placeShip(this.selectedShip);
        this.enableControls();
        document.removeEventListener('mousemove', this.onDocumentMouseMoveBind);
        this.selectedShip = null;

        return true;
    };

    Setup.prototype.isWithinBoardBounds = function(ship) {
        var box3 = new THREE.Box3();
        box3.setFromObject(ship);

        var coords = this.board.worldToGrid(ship.position);
        var size = box3.size();
        var length = size.x / 20;

        // horizontal
        if(ship.rotation.y === 0) {
            return coords.x + length <= 10;
        } else { // vertical
            return coords.y + length <= 10;
        }
    };

    Setup.prototype.rotateSelectedShip = function() {
        if(!this.selectedShip)
            return;

        if(this.isVertical) {
            console.log('SETUP', 'Rotating to horizontal position', this.selectedShip);
            this.selectedShip.getObject().applyMatrix(new THREE.Matrix4().makeTranslation(20, 20, 20));
            this.selectedShip.getObject().rotation.y = 0;
        } else {
            console.log('SETUP', 'Rotating to vertical position', this.selectedShip);
            this.selectedShip.getObject().applyMatrix(new THREE.Matrix4().makeTranslation(-20, -20, -20));
            this.selectedShip.getObject().rotation.y = -Math.PI / 2;
        }
        this.isVertical = !this.isVertical;
    };

    Setup.prototype.onDocumentMouseMove = function(e) {
        e.preventDefault();

        this.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
        this.raycaster.setFromCamera(this.mouse, camera);

        var intersects = this.raycaster.intersectObject(scene.getObjectByName("dank"));
        if(intersects.length > 0) {
            var intersect = intersects[0];

            console.log('moving that shit', this.selectedShip.getObject());
            this.selectedShip.getObject().position.copy(intersect.point).add(intersect.face.normal);
            this.selectedShip.getObject().position.divideScalar(20).floor().multiplyScalar(20).add(new THREE.Vector3(10, 0, 10));
        }
    };

    Setup.prototype.render = function() {
        renderer.render();
    };

    return new Setup();
});
