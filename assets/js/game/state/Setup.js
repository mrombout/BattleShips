"use strict";

define([
    'state/State',
    'renderer',
    'scene',
    'camera',
    'view/hud',
    'three',
    'service/setup',
    'factory/ship',
    'entity/Environment',
    'model/GameStatus',
    'state/Started',
    'game',
    'factory/board'], function(
        State,
        renderer,
        scene,
        camera,
        HUDView,
        THREE,
        setupService,
        ShipFactory,
        Environment,
        GameStatus,
        Started,
        game,
        boardFactory
    ) {
    /**
     * State when the player is setting up the boats. This state allows the
     * player to set up their boats before battle.
     *
     * @param game
     * @constructor
     */
    var Setup = function(game) {
        State.call(this);

        this.game = game;

        this.parent = new THREE.Object3D();

        this.hudView = new HUDView(this);

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        this.availableShips = [];
    };
    Setup.prototype = Object.create(State.prototype);
    Setup.prototype.constructor = Setup;

    Setup.prototype.show = function() {
        // create graphics
        this.createEnvironment();
        this.createControls();
        this.createGrid();

        // start listening
        this.registerListeners();

        // show view
        this.hudView.show();

        // set camera position
        camera.position.set(0, 200, 300);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        // initialize UI state
        if(this.board.ships.length === 0)
            this.hudView.setCanReset(true);
        if(this.board.ships.length === 5)
            this.onReady();

        // add parent to scene
        scene.add(this.parent);
    };

    Setup.prototype.hide = function() {
        this.hudView.hide();
        scene.remove(this.parent);
    };

    Setup.prototype.registerListeners = function() {
        this.hudView.on('rotateShip', function() {
            this.rotateShip();
        }.bind(this));
        this.hudView.on('ready', function() {
            this.onReady();
        }.bind(this));
        this.hudView.on('resetShips', function(e) {
            this.onResetShips(e);
        }.bind(this));
    };

    Setup.prototype.createEnvironment = function() {
        this.environment = new Environment();
        this.parent.add(this.environment.getObject());
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
        this.board = boardFactory.create(this.game.myGameboard, false);
        this.parent.add(this.board.getObject());
    };

    Setup.prototype.enableControls = function() {
        this.controls.enabled = true;
    };

    Setup.prototype.disableControls = function() {
        this.controls.enabled = false;
    };

    Setup.prototype.update = function(clock) {
        // update environment
        this.environment.update(clock);

        // update controls
        this.controls.update();

        // update board
        this.board.update();
    };

    /**
     * Loads the available ships from the API service and adds them to the
     * view.
     */
    Setup.prototype.loadShips = function() {
        if(this.board.ships.length === 5) {
            return;
        }

        var me = this;
        return setupService.getShips().done(function(ships) {
            me.availableShips = ships;
            for(var key in ships) {
                if(ships.hasOwnProperty(key)) {
                    var ship = ships[key];
                    me.hudView.addShipItem(ship);
                }
            }
        });
    };

    /**
     * Selects a ship by adding it to the scene allowing the user to place it
     * on the board.
     *
     * @param ship
     */
    Setup.prototype.selectShip = function(ship) {
        this.isVertical = false;

        this.disableControls();

        this.selectedShip = ShipFactory.create(ship);
        this.board.getObject().add(this.selectedShip.getObject());

        this.onDocumentMouseMoveBind = function(e) {
            this.onDocumentMouseMove(e);
        }.bind(this);
        document.addEventListener('mousemove', this.onDocumentMouseMoveBind, false);
        document.addEventListener('touchmove', this.onDocumentMouseMoveBind, false);
    };

    /**
     * Deselects a ship by removing it from the scene.
     */
    Setup.prototype.deselectShip = function() {
        this.enableControls();

        document.removeEventListener('mousemove', this.onDocumentMouseMoveBind);

        this.board.getObject().remove(this.selectedShip.getObject());

        this.selectedShip = null;
    };

    /**
     * Places a ship on the board if the selected position is valid. A position
     * is valid is it is within the bounds of the board and the ship does not
     * overlap other ships.
     *
     * @returns {boolean}
     */
    Setup.prototype.placeShip = function() {
        if(this.selectedShip.isInvalid()) {
            this.deselectShip();
            return false;
        }

        this.availableShips.splice(this.availableShips.indexOf(this.selectedShip), 1);
        this.board.placeShip(this.selectedShip);
        this.enableControls();
        document.removeEventListener('mousemove', this.onDocumentMouseMoveBind);
        this.selectedShip = null;

        if(this.availableShips.length === 0)
            this.hudView.setIsReady(true);

        return true;
    };

    /**
     * Rotates the selected ship by toggling between horizontal and vertical
     * positions.
     */
    Setup.prototype.rotateShip = function() {
        if(!this.selectedShip)
            return;

        this.selectedShip.rotate();
    };

    Setup.prototype.onDocumentMouseMove = function(e) {
        e.preventDefault();

        if(e.type === 'touchmove') {
            this.mouse.set((e.touches[0].clientX / window.innerWidth) * 2 - 1, -(e.touches[0].clientY / window.innerHeight) * 2 + 1);
        } else if(e.type === 'mousemove') {
            this.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
        }
        this.raycaster.setFromCamera(this.mouse, camera);

        this.selectedShip.setInvalid(!this.board.isWithinBounds(this.selectedShip) || this.board.isOverlapping(this.selectedShip) || this.selectedShip.getObject().position.y === 20);

        // Move ship according to grid
        var intersects = this.raycaster.intersectObject(scene.getObjectByName("dank"));
        if(intersects.length > 0) {
            var intersect = intersects[0];

            this.selectedShip.getObject().position.copy(intersect.point).add(intersect.face.normal);
            this.selectedShip.getObject().position.divideScalar(20).floor().multiplyScalar(20).add(new THREE.Vector3(10, 0, 10));
        }
    };

    /**
     * Resets all ships placed on the board by clearing them out and loading a
     * new list of boats from the server.
     */
    Setup.prototype.onResetShips = function() {
        this.board.resetShips();

        var me = this;

        this.hudView.setCanReset(false);
        this.loadShips().always(function() {
            me.hudView.setCanReset(true);
        });
    };

    /**
     * Submits the board to the Zeeslag API and starts waiting for the other
     * user to setup their game by polling every 3 seconds after the last
     * successful request.
     */
    Setup.prototype.onReady = function() {
        var me = this;

        this.hudView.setWaitingForEnemy(true);

        var pollGameState = function() {
            // TODO Why not always, if error we just want to keep trying
            setupService.getGame(me.game.id).done(function(gameModel) {
                if(gameModel.status === GameStatus.STARTED) {
                    me.hudView.setWaitingForEnemy(false);
                    game.setState(new Started(gameModel));
                } else {
                    setTimeout(function() {
                        pollGameState();
                    }, 3000);
                }
            });
        };

        setupService.saveBoard(me.game.id, me.board.model).always(function() {
            pollGameState();
        });

        // TODO: Verify polling
    };

    Setup.prototype.render = function(delta) {
        this.environment.render();

        renderer.render(delta);
    };

    return Setup;
});
