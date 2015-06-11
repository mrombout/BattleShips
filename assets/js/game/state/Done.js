define([
    'state/State',
    'three',
    'renderer',
    'scene',
    'camera',
    'entity/Environment',
    'entity/Board3D',
    'model/Board',
    'service/api',
    'spe',
    'assets',
    'factory/board',
    'view/started',
    'service/started',
    'entity/Torpedo',
    'model/Shot',
    'service/audio',
    'model/GameStatus',
    'tween'], function(
    State,
    THREE,
    renderer,
    scene,
    camera,
    Environment,
    Board3D,
    Board,
    API,
    SPE,
    assets,
    boardFactory,
    startedView,
    startedService,
    Torpedo,
    Shot,
    audioService,
    GameStatus,
    TWEEN) {
    var Done = function(gameModel) {
        this.game = gameModel;

        this.parent = new THREE.Object3D();
    };
    Done.prototype = Object.create(State.prototype);
    Done.prototype.constructor = Done;

    Done.prototype.show = function() {
        this.createEnvironment();

        camera.position.set(0, 200, 300);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        scene.add(this.parent);
    };

    Done.prototype.hide = function() {

    };

    Done.prototype.createEnvironment = function() {
        this.environment = new Environment();
        this.parent.add(this.environment.getObject());
    };

    Done.prototype.update = function(delta) {
        this.environment.update(delta);
    };

    Done.prototype.render = function(clock) {
        this.environment.render();

        renderer.render(scene, camera);
    };

    return Done;
});
