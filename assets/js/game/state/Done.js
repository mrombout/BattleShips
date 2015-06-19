define([
    'state/State',
    'three',
    'renderer',
    'scene',
    'camera',
    'entity/Environment',
    'view/Done'], function(
    State,
    THREE,
    renderer,
    scene,
    camera,
    Environment,
    DoneView) {

    /**
     * State when a game is won by either the player or the enemy. This state
     * displays a summary and the end results of the game.
     *
     * @param gameModel
     * @constructor
     */
    var Done = function(gameModel) {
        this.game = gameModel;

        this.parent = new THREE.Object3D();

        this.doneView = new DoneView(this.game);
    };
    Done.prototype = Object.create(State.prototype);
    Done.prototype.constructor = Done;

    Done.prototype.show = function() {
        this.createEnvironment();

        // show view
        this.doneView.setGame(this.game);
        this.doneView.show();

        // set camera position
        camera.position.set(0, 200, 300);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        // add parent to scene
        scene.add(this.parent);
    };

    Done.prototype.hide = function() {
        // hide view
        this.doneView.hide();

        // remove parent from scene
        scene.remove(this.parent);
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
