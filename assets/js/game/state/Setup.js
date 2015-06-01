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
    'entity/Board3D',
    'model/Board',
    'entity/Environment',
    'model/GameStatus',
    'state/Started',
    'game',
    'factory/board'], function(State, renderer, scene, camera, HUDView, THREE, setupService, ShipFactory, Board3D, Board, Environment, GameStatus, Started, game, boardFactory) {
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
        this.createEnvironment();
        this.createControls();
        this.createGrid();
        this.registerListeners();

        this.hudView.show();

        camera.position.set(0, 200, 300);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        scene.add(this.parent);
    };

    Setup.prototype.hide = function() {
        scene.remove(this.parent);
    };

    Setup.prototype.registerListeners = function() {
        this.hudView.on('rotateShip', function() {
            this.rotateShip();
        }.bind(this));
        this.hudView.on('ready', function() {
            this.onReady();
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
        this.board = boardFactory.create(this.game.myGameboard);
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
        var me = this;

        setupService.getShips().done(function(ships) {
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
        this.parent.add(this.selectedShip.getObject());

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

        this.parent.remove(this.selectedShip.getObject());

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

        this.selectedShip.setInvalid(!this.board.isWithinBounds(this.selectedShip) || this.board.isOverlapping(this.selectedShip));

        var intersects = this.raycaster.intersectObject(scene.getObjectByName("dank"));
        if(intersects.length > 0) {
            var intersect = intersects[0];

            this.selectedShip.getObject().position.copy(intersect.point).add(intersect.face.normal);
            this.selectedShip.getObject().position.divideScalar(20).floor().multiplyScalar(20).add(new THREE.Vector3(10, 0, 10));
        }
    };

    Setup.prototype.onReady = function() {
        var me = this;

        this.hudView.setWaitingForEnemy(true);

        var pollGameState = function() {
            setTimeout(function() {
                setupService.saveBoard(me.game.id, me.board.model).done(function(data) {
                    if(data.status === GameStatus.STARTED) {
                        setupService.getGame(me.game.id).done(function(gameModel) {
                            game.setState(new Started(gameModel));
                        });
                    }
                }).fail(function(data) {
                    console.error(data);
                });
            }, 3000);
        }();
    };

    Setup.prototype.render = function(delta) {
        this.environment.render();

        renderer.render(delta);
    };

    return Setup;
});
