"use strict";

define(['state/State', 'scene', 'renderer', 'camera', 'assets', 'entity/Environment', 'view/lobby', 'service/lobby', 'text!/BattleShipsters/assets/html/_game.html', 'model/GameStatus', 'game', 'state/Setup', 'state/Started', 'service/audio', 'state/Done', 'service/speech'], function(State, scene, renderer, camera, assets, Environment, LobbyView, lobbyService, gameHtml, GameStatus, game, Setup, Started, audioService, Done, speech) {
    var Lobby = function() {
        State.call(this);

        this.view = new LobbyView(this);
    };
    Lobby.prototype = Object.create(State.prototype);
    Lobby.prototype.constructor = Lobby;

    Lobby.prototype.loadGames = function() {
        var me = this;

        this.view.clearGameItems();

        lobbyService.getGames().done(function(data) {
            if(data.length === 0) {
                setTimeout(function() {
                    me.loadGames();
                }, 3000);
            }

            for(var key in data) {
                if(data.hasOwnProperty(key)) {
                    var game = data[key];
                    var template = gameHtml.replace('{enemy}', game.enemyName ? game.enemyName : "unknown")
                        .replace('{status}', game.status)
                        .replace('{id}', game._id);
                    me.view.addGameItem($(template));
                }
            }
        });
    };

    Lobby.prototype.clearGames = function() {
        var me = this;
        lobbyService.clearGames().done(function(data) {
            me.loadGames();
        });
    };

    Lobby.prototype.createAiGame = function() {
        var me = this;
        lobbyService.createAiGame().done(function(data) {
            if(data.status === "setup") {
                me.joinGame(data._id);
            }
        });
    };

    Lobby.prototype.createGame = function() {
        var me = this;
        lobbyService.createGame().done(function(data) {
            if(data.status === "setup") {
                me.joinGame(data._id);
            } else {
                me.loadGames();
            }
        });
    };

    Lobby.prototype.joinGame = function(gameId) {
        var me = this;
        lobbyService.getGame(gameId).done(function(gameModel) {
            if(gameModel.status === GameStatus.SETUP) {
                game.setState(new Setup(gameModel));
            } else if(gameModel.status === GameStatus.STARTED) {
                game.setState(new Started(gameModel));
            } else if(gameModel.status === GameStatus.DONE) {
                game.setState(new Done(gameModel));
            }
        });
    };

    Lobby.prototype.show = function() {
        console.info('LOBBY', 'Show');

        this.elapsedTime = 0;

        audioService.play(assets.audio.bgm);
        audioService.play(assets.audio.ocean);

        this.parent = new THREE.Object3D();
        this.parent.name = "lobby";
        scene.add(this.parent);

        this.createEnvironment();

        this.loadBattleship();
        this.loadLogo();

        this.view.show();

        camera.position.set(0, 20, 70);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();
    };

    Lobby.prototype.hide = function() {
        scene.remove(scene.getObjectByName("lobby"));
        this.view.hide();

        audioService.stop(assets.audio.bgm);
    };

    Lobby.prototype.createEnvironment = function() {
        this.environment = new Environment();
        this.parent.add(this.environment.getObject());
    };

    Lobby.prototype.loadBattleship = function() {
        var me = this;

        var diffuse = assets.textures.battleship_diffuse;
        var bump = assets.textures.battleship_bump;
        var normal = assets.textures.battleship_normal;
        var specular = assets.textures.battleship_specular;
        var battleshipGeometry = assets.geometries.battleship;

        var material = new THREE.MeshPhongMaterial({
            map: diffuse,
            bumpMap: bump,
            bumpScale: 10,
            normalMap: normal,
            specularMap: specular,
            normalScale: new THREE.Vector2(0.8, 0.8),
            shininess: 10,
            specular: 0x222222,
            shading: THREE.SmoothShading,
            colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
            colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
            colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
        });
        me.battleship = new THREE.Mesh(battleshipGeometry, material);
        me.battleship.position.z = -15;

        me.parent.add(me.battleship);
    };

    Lobby.prototype.loadLogo = function() {
        var me = this;

        var diffuse = assets.textures.logo_diffuse;
        var bump = assets.textures.logo_bump;
        var normal = assets.textures.logo_normal;
        var specular = assets.textures.logo_specular;
        var logoGeometry = assets.geometries.logo;

        var material = new THREE.MeshPhongMaterial({
            map: diffuse,
            bumpMap: bump,
            bumpScale: 1,
            normalMap: normal,
            normalScale: new THREE.Vector2(0.8, 0.8),
            specularMap: specular,
            shininess: 10,
            specular: 0x111111,
            shading: THREE.SmoothShading,
            colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
            colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
            colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
        });
        var mesh = new THREE.Mesh(logoGeometry, material);
        mesh.position.y = 9;
        mesh.position.x = 0;
        mesh.position.z = 52;
        mesh.rotation.x = -Math.PI / 4 / 2;
        window.test = mesh;

        me.parent.add(mesh);
    };

    Lobby.prototype.update = function(delta) {
        // update environment
        this.environment.update(delta);

        // update battleship
        if(this.battleship) {
            this.elapsedTime += delta;
            this.battleship.rotation.x = Math.sin(this.elapsedTime) / 64;
            this.battleship.rotation.z = Math.sin(this.elapsedTime) / 64;
            this.battleship.rotation.y = -Math.cos(this.elapsedTime) / 64;
        }
    };

    Lobby.prototype.render = function(delta) {
        // render environment
        this.environment.render();

        // render
        renderer.render(delta);
    };

    return new Lobby();
});
