"use strict";

define([
    'state/State',
    'three',
    'renderer',
    'scene',
    'camera',
    'entity/Environment',
    'view/Done',
    'game'], function(
    State,
    THREE,
    renderer,
    scene,
    camera,
    Environment,
    DoneView,
    game) {

    /**
     * State when a game is won by either the player or the enemy. This state
     * displays a summary and the end results of the game.
     *
     * @param gameModel
     * @constructor
     */
    var DoneTest = function(gameModel, backState) {
        State.call(this);

        this.game = gameModel;
        this.backState = backState;

        this.parent = new THREE.Object3D();

        this.doneView = new DoneView(this.game);
    };
    DoneTest.prototype = Object.create(State.prototype);
    DoneTest.prototype.constructor = DoneTest;

    /**
     * Shows this state by creating the environment and showing the view.
     */
    DoneTest.prototype.show = function() {
        this.createEnvironment();

        this.registerListeners();

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

    DoneTest.prototype.hide = function() {
        // hide view
        this.doneView.hide();

        // remove parent from scene
        scene.remove(this.parent);
    };

    /**
     * Registers any listeners this state uses.
     */
    DoneTest.prototype.registerListeners = function() {
        this.doneView.on('back', function() {
            console.log('on back thi');
            this.onBack();
        }.bind(this));
    };

    /**
     * Creates the environment for this state.
     */
    DoneTest.prototype.createEnvironment = function() {
        this.environment = new Environment();

        this.parent.add(this.environment.getObject());
    };

    /**
     * Updates this state by updating its environment.
     *
     * @param {number} delta
     */
    DoneTest.prototype.update = function(delta) {
        this.environment.update(delta);
    };

    /**
     * Renders this state by rendering the environment.
     *
     * @param {number} delta
     */
    DoneTest.prototype.render = function(delta) {
        this.environment.render();

        renderer.render(scene, camera);
    };

    /**
     * Sets the state back to the lobby state.
     */
    DoneTest.prototype.onBack = function() {
        game.setState(this.backState);
    };

    return DoneTest;
});
