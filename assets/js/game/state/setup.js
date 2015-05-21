"use strict";

define(['state/State', 'renderer', 'scene', 'camera', 'view/hud'], function(State, renderer, scene, camera, hudView) {
    var Setup = function() {
        State.call(this);
    };
    Setup.prototype = Object.create(State.prototype);
    Setup.prototype.constructor = Setup;

    Setup.prototype.show = function() {
        this.parent = new THREE.Object3D();

        this.createControls();
        this.createGrid();
        this.createShips();

        hudView.show();

        camera.position.set(0, 200, 300);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        scene.add(this.parent);
    };

    Setup.prototype.hide = function() {
        scene.remove(this.parent);
    }

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
        // create grid
        var size = 100, step = 20;

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( { color: 0xcccccc, opacity: 0.2 } );

        for ( var i = - size; i <= size; i += step ) {

            geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
            geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

            geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
            geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

        }

        var line = new THREE.Line( geometry, material, THREE.LinePieces );
        line.position.y = 1;
        this.parent.add(line);

        // create supported plane
        var planeGeometry = new THREE.PlaneBufferGeometry(200, 200);
        planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        var planeMesh = new THREE.Mesh(planeGeometry);
        planeMesh.visible = false;
        planeMesh.name = "dank";

        this.parent.add(planeMesh);
    };

    Setup.prototype.createShips = function() {
        var aircraftCarrier = this.createShip(0, 0, 5);
        var battleship = this.createShip(2, 0, 4);
        var submarine = this.createShip(4, 0, 3);
        var destroyer = this.createShip(6, 0, 3);
        var patrolBoat = this.createShip(8, 0, 2);
    };

    Setup.prototype.createShip = function(x, y, size) {
        var geometry = new THREE.BoxGeometry(20 * size, 10, 20);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(10 * size, 0, 10)); // normalize positions to top-left
        var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
        var mesh = new THREE.Mesh(geometry, material);

        var vec2 = this.gridToWorld(new THREE.Vector2(x, y));
        mesh.position.x = vec2.x;
        mesh.position.z = vec2.y;

        this.parent.add(mesh);
    };

    Setup.prototype.enableControls = function() {
        this.controls.enabled = true;
    };

    Setup.prototype.disableControls = function() {
        this.controls.enabled = false;
    };

    Setup.prototype.gridToWorld = function(vec) {
        var newVec = new THREE.Vector2();

        // normalize
        newVec.x = -20 * 5;
        newVec.y = -20 * 5;

        // apply coords
        newVec.x += vec.y * 20;
        newVec.y += vec.x * 20;

        return newVec;
    };

    Setup.prototype.worldToGrid = function(vec3) {
        var convertorVec = new THREE.Vector2(vec3.x, vec3.z);
        convertorVec.divideScalar(20).floor().addScalar(5);

        return convertorVec;
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

    Setup.prototype.render = function() {
        renderer.render();
    };

    return new Setup();
});
