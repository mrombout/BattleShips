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
    var Done = function(gameModel) {
        this.game = gameModel;

        this.parent = new THREE.Object3D();

        this.doneView = new DoneView(this.game);
    };
    Done.prototype = Object.create(State.prototype);
    Done.prototype.constructor = Done;

    Done.prototype.show = function() {
        this.createEnvironment();

        this.doneView.setGame(this.game);
        this.doneView.show();

        camera.position.set(0, 200, 300);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        scene.add(this.parent);
    };

    Done.prototype.hide = function() {
        scene.remove(this.parent);
        this.doneView.hide();
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
