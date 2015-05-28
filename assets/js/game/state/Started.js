define(['state/State', 'three', 'renderer', 'scene', 'camera', 'entity/Environment', 'entity/Board3D', 'model/Board', 'service/api', 'spe', 'assets', 'factory/board'], function(State, THREE, renderer, scene, camera, Environment, Board3D, Board, API, SPE, assets, boardFactory) {
    var Started = function(gameModel) {
        this.game = gameModel;
        this.parent = new THREE.Object3D();
    };
    Started.prototype = Object.create(State.prototype);
    Started.prototype.constructor = Started;

    Started.prototype.show = function() {
        this.createEnvironment();
        this.createControls();
        this.createPlayerGrid();
        this.createEnemyGrid();

        scene.add(this.parent);
    };

    Started.prototype.hide = function() {

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