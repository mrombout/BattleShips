define(['state/State', 'three', 'renderer', 'scene', 'camera', 'entity/Environment', 'entity/Board3D', 'model/Board', 'service/api', 'spe', 'assets', 'factory/board', 'view/started', 'service/started', 'entity/Torpedo', 'model/Shot'], function(State, THREE, renderer, scene, camera, Environment, Board3D, Board, API, SPE, assets, boardFactory, startedView, startedService, Torpedo, Shot) {
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

        startedView.show();
        startedView.setGame(this.game);

        if(this.game.yourTurn) {
            this.setPlayersTurn();
        } else {
            this.setEnemyTurn();
        }

        scene.add(this.parent);
    };

    Started.prototype.setPlayersTurn = function() {
        // focus controls on enemy board
        this.controls.target = this.enemyBoard.getObject().position.clone();

        // change camera to enemy board
        camera.lookAt(this.enemyBoard.getObject().position);
        camera.position.x = this.enemyBoard.getObject().position.x;
    };

    Started.prototype.setEnemyTurn = function() {
        var me = this;

        // focus controls on player board
        this.controls.target = this.playerBoard.getObject().position.clone();

        // change camera to player board
        camera.lookAt(this.playerBoard.getObject().position);
        camera.position.x = this.playerBoard.getObject().position.x;

        // start polling gamestate
        var pollGameState = function() {
            startedService.getGame(me.game.id).fail(function() {
                // TODO Show Error dialog
            }).done(function(game) {
                if(game.yourTurn) {
                    console.log('old game', me.game, 'new game', game);

                    // update model
                    me.game.update(game);

                    // simulate last shot
                    var latestShots = me.playerBoard.getLatestShots();
                    console.log('latest shots');
                    for(var key in latestShots) {
                        if(latestShots.hasOwnProperty(key)) {
                            var shot = latestShots[key];
                            console.log('shot=', shot);

                            if(me.torpedo) {
                                me.parent.remove(me.torpedo.getObject());
                            }

                            console.log('enemy target', shot);
                            me.torpedo = new Torpedo(me.enemyBoard.getObject(), {position: new THREE.Vector3(shot.cell.x, 0, shot.cell.y)});
                            me.torpedo.isHit = (shot.isHit);
                            me.torpedo.shoot().done(function() {
                                me.setPlayersTurn();
                            }).fail(function() {
                                me.setPlayersTurn();
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
        }();
    };

    Started.prototype.hide = function() {

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
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;

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

    Started.prototype.onDocumentMouseClick = function(e) {
        var me = this;
        var intersects = this.raycaster.intersectObject(this.enemyBoard.getSupport());
        if(intersects.length > 0) {
            var shootPosition = this.enemyBoard.worldToGrid(this.cursor.position);
            startedService.shoot(this.game.id, shootPosition.x, shootPosition.y).done(function(data) {
                if(data === Shot.BOOM || data === Shot.SPLASH) {
                    if(me.torpedo) {
                        me.parent.remove(me.torpedo.getObject());
                    }

                    me.torpedo = new Torpedo(me.playerBoard.getObject(), me.cursor);
                    me.torpedo.isHit = (data === Shot.BOOM);
                    me.torpedo.shoot().done(function() {
                        me.setEnemyTurn();
                    }).fail(function() {
                        me.setEnemyTurn();
                    }).then(function() {
                        console.log('then');
                    });
                    me.parent.add(me.torpedo.getObject());
                } else {
                    // fail
                    console.error('Its not your turn! Silly!');
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

        this.playerBoard.update(delta);
        this.enemyBoard.update(delta);
    };

    Started.prototype.render = function(clock) {
        this.environment.render();

        renderer.render(scene, camera);
    };

    return Started;
});