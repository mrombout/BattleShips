define(['state/State', 'three', 'renderer', 'scene', 'camera', 'entity/Environment', 'entity/Board3D', 'model/Board', 'service/api', 'spe', 'assets', 'factory/board'], function(State, THREE, renderer, scene, camera, Environment, Board3D, Board, API, SPE, assets, boardFactory) {
    var Started = function(gameModel) {
        this.game = gameModel;

        this.parent = new THREE.Object3D();

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
    };
    Started.prototype = Object.create(State.prototype);
    Started.prototype.constructor = Started;

    Started.prototype.show = function() {
        this.createEnvironment();
        this.createControls();
        this.createPlayerGrid();
        this.createEnemyGrid();
        this.createCursor();

        this.registerEvents();

        scene.add(this.parent);
    };

    Started.prototype.hide = function() {

    };

    Started.prototype.registerEvents = function() {
        document.addEventListener('mousemove', function(e) {
            this.onDocumentMouseMove(e);
        }.bind(this), false);
    };

    Started.prototype.createEnvironment = function() {
        this.environment = new Environment();
        this.parent.add(this.environment.getObject());
    };

    Started.prototype.createControls = function() {
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

    Started.prototype.createPlayerGrid = function() {
        this.playerBoard = boardFactory.create(this.game.myGameboard);
        console.log(this.playerBoard);
        this.parent.add(this.playerBoard.getObject());
    };

    Started.prototype.createEnemyGrid = function() {
        this.enemyBoard = boardFactory.create(this.game.enemyGameboard);
        this.enemyBoard.getObject().position.x = 400;
        this.parent.add(this.enemyBoard.getObject());
    };

    Started.prototype.createCursor = function() {
        var material = new THREE.MeshLambertMaterial();
        var geometry = new THREE.CircleGeometry(10, 20);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1, 0));
        this.cursor = new THREE.Mesh(geometry, material);
        this.parent.add(this.cursor);
    };

    Started.prototype.onDocumentMouseMove = function(e) {
        this.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
        this.raycaster.setFromCamera(this.mouse, camera);

        var intersects = this.raycaster.intersectObject(this.enemyBoard.getSupport());
        console.log(intersects);
        if(intersects.length > 0) {
            var intersect = intersects[0];

            this.cursor.position.copy(intersect.point).add(intersect.face.normal);
            this.cursor.position.divideScalar(20).floor().multiplyScalar(20).add(new THREE.Vector3(10, 0, 10));
        }
    };

    Started.prototype.update = function(clock) {
        this.controls.update();
        this.environment.update(clock);

        //this.playerBoard.update(clock);
        //this.enemyBoard.update(clock);
    };

    Started.prototype.render = function(clock) {
        this.environment.render();

        renderer.render(scene, camera);
    };

    return Started;
});