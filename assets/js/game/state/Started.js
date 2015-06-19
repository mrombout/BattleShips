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
    'game',
    'state/Done',
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
        game,
        Done,
        TWEEN) {

    /**
     * State when actually playing the game. This state is active when the
     * player is playing an actualy game of Battleships!
     *
     * @param gameModel
     * @constructor
     */
    var Started = function(gameModel) {
        this.game = gameModel;

        this.parent = new THREE.Object3D();

        this.timeRunning = 0;

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        this.torpedo = null;

        this.playerCanShoot = false;
    };
    Started.prototype = Object.create(State.prototype);
    Started.prototype.constructor = Started;

    Started.prototype.show = function() {
        // initialize graphics
        this.createEnvironment();
        this.createControls();
        this.createPlayerGrid();
        this.createEnemyGrid();
        this.createCursor();

        // register events
        this.registerEvents();

        // show view
        startedView.show();
        startedView.setGame(this.game);

        // initialize turn
        if(this.game.yourTurn) {
            this.setPlayersTurn();
        } else {
            this.setEnemyTurn();
        }

        // set camera position
        camera.position.set(0, 200, 300);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        // add parent to scene
        scene.add(this.parent);
    };

    /**
     * Gives the turn to the player. The camers will focus on the enemys board
     * and the user may now click any cell to hurl a torpedo towards the
     * enemy.
     */
    Started.prototype.setPlayersTurn = function() {
        var me = this;

        this.playerCanShoot = true;
        this.game.yourTurn  = true;

        startedView.setGame(this.game);

        // change camera to enemy board
        this.controls.enabled = false;
        camera.target = me.playerBoard.getObject().position.clone();
        var tweenCameraPosition = new TWEEN.Tween(camera.position).to({
            x: me.enemyBoard.getObject().position.x,
            y: 200,
            z: 300
        }, 2000).easing(TWEEN.Easing.Back.InOut).onUpdate(function() {
        }).onComplete(function() {
            me.controls.enabled = true;
        }).start();

        var tweenCameraTarget = new TWEEN.Tween(camera.target).to({
            x: me.enemyBoard.getObject().position.x
        }, 1000).easing(TWEEN.Easing.Quadratic.In).onUpdate(function() {
            camera.lookAt(camera.target);
        }).onComplete(function() {
            me.controls.target = me.enemyBoard.getObject().position.clone();
        }).start();
    };

    Started.prototype.setEnemyTurn = function() {
        var me = this;

        this.game.yourTurn = false;

        startedView.setGame(this.game);

        // change camera to player board
        camera.target = this.enemyBoard.getObject().position.clone();
        this.controls.enabled = false;
        var tweenCameraPosition = new TWEEN.Tween(camera.position).to({
            x: this.playerBoard.getObject().position.x,
            y: 200,
            z: 300
        }, 2000).easing(TWEEN.Easing.Back.InOut).onUpdate(function() {

        }).onComplete(function() {
            me.controls.enabled = true;
        }).start();

        var tweenCameraTarget = new TWEEN.Tween(camera.target).to({
            x: me.playerBoard.getObject().position.x
        }, 1000).easing(TWEEN.Easing.Quadratic.In).onUpdate(function() {
            camera.lookAt(camera.target);
        }).onComplete(function() {
            me.controls.target = me.playerBoard.getObject().position.clone();
        }).start();

        // start polling gamestate
        var pollGameState = function() {
            startedService.getGame(me.game.id).fail(function() {
                // TODO Show Error dialog
            }).done(function(gameData) {
                if(gameData.status === GameStatus.DONE) {
                    // update model
                    me.game.update(gameData);

                    game.setState(new Done(me.game));
                }

                if(gameData.yourTurn) {
                    // update model
                    me.game.update(gameData);

                    // update board
                    me.enemyBoard.sync();

                    // simulate last shot
                    audioService.play(assets.audio.sfx_shoot);

                    var latestShots = me.playerBoard.getLatestShots();
                    for(var key in latestShots) {
                        if(latestShots.hasOwnProperty(key)) {
                            var shot = latestShots[key];

                            if(me.torpedo) {
                                me.parent.remove(me.torpedo.getObject());
                            }

                            var worldTarget = me.playerBoard.gridToWorld(shot.cell);
                            me.torpedo = new Torpedo(me.enemyBoard.getObject(), { position: worldTarget });
                            me.torpedo.isHit = (shot.isHit);
                            me.torpedo.shoot().done(function() {
                                audioService.play(assets.audio.sfx_boom);
                            }).fail(function() {
                                audioService.play(assets.audio.sfx_splash);
                            }).always(function() {
                                setTimeout(function() {
                                    me.playerBoard.sync();
                                    me.setPlayersTurn();
                                }, 2000);
                            });
                            me.parent.add(me.torpedo.getObject());
                        }
                    }
                } else {
                    setTimeout(function() {
                        pollGameState();
                    }, 3000);
                }
            });
        };
        pollGameState();
    };

    Started.prototype.hide = function() {
        scene.remove(this.parent);
        startedView.hide();
    };

    Started.prototype.registerEvents = function() {
        document.addEventListener('mousemove', function(e) {
            this.onDocumentMouseMove(e);
        }.bind(this), false);
        document.addEventListener('click', function(e) {
            this.onDocumentMouseClick(e);
        }.bind(this), false);
    };

    Started.prototype.createEnvironment = function() {
        this.environment = new Environment();
        this.parent.add(this.environment.getObject());
    };

    Started.prototype.createControls = function() {
        this.controls = new THREE.OrbitControls(camera, renderer.domElement);
        this.controls.rotateSpeed = 1.5;
        this.controls.zoomSpeed   = 1.2;
        this.controls.panSpeed    = 0.8;

        //this.controls.minDistance = 150;
        //this.controls.maxDistance = 350;
        this.controls.noPan = false;

        this.controls.minPolarAngle = 0; // radians
        this.controls.maxPolarAngle = Math.PI / 2 - 0.1; // radians

        this.controls.staticMoving = false;
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

    /**
     * Moves the cursor to a new position when the player moves their mouse.
     *
     * @param e
     */
    Started.prototype.onDocumentMouseMove = function(e) {
        this.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
        this.raycaster.setFromCamera(this.mouse, camera);

        var intersects = this.raycaster.intersectObject(this.enemyBoard.getSupport());
        if(intersects.length > 0) {
            var intersect = intersects[0];

            this.cursor.position.copy(intersect.point).add(intersect.face.normal);
            this.cursor.position.divideScalar(20).floor().multiplyScalar(20).add(new THREE.Vector3(10, 0, 10));
        }
    };

    /**
     * Shoots a torpedo towards the enemy when the left mouse is clicked and it
     * is the player turn.
     *
     * @param e
     */
    Started.prototype.onDocumentMouseClick = function(e) {
        if(!this.playerCanShoot)
            return;

        var me = this;
        var intersects = this.raycaster.intersectObject(this.enemyBoard.getSupport());
        if(intersects.length > 0) {
            this.playerCanShoot = false;

            var shootWorldPosition = this.cursor.position.clone();
            var shootGridPosition = this.enemyBoard.worldToGrid(shootWorldPosition);

            if(me.torpedo) {
                me.parent.remove(me.torpedo.getObject());
            }

            me.torpedo = new Torpedo(me.playerBoard.getObject(), shootWorldPosition);
            startedService.shoot(this.game.id, shootGridPosition.x, shootGridPosition.y).done(function(data) {
                if(data === Shot.BOOM || data === Shot.SPLASH || data === Shot.WINNER) {

                    audioService.play(assets.audio.sfx_shoot);
                    me.torpedo.isHit = (data === Shot.BOOM);
                    me.torpedo.shoot().done(function() {
                        audioService.play(assets.audio.sfx_boom);
                    }).fail(function() {
                        audioService.play(assets.audio.sfx_splash);
                    }).always(function() {
                        setTimeout(function() {
                            me.setEnemyTurn();
                        }, 2000);
                    });
                    me.parent.add(me.torpedo.getObject());
                } else {
                    me.playerCanShoot = true;
                }
            });
        }
    };

    Started.prototype.update = function(delta) {
        this.controls.update();
        this.environment.update(delta);

        if(this.torpedo) {
            this.torpedo.update(delta);
        }

        this.timeRunning += delta;
        TWEEN.update();

        this.playerBoard.update(delta);
        this.enemyBoard.update(delta);
    };

    Started.prototype.render = function(clock) {
        this.environment.render();

        renderer.render(scene, camera);
    };

    return Started;
});
