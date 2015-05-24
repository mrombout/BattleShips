"use strict";

define(['state/State', 'scene', 'renderer', 'camera', 'view/start', 'assets', 'entity/Skydome', 'entity/Water', 'entity/Skybox'], function(State, scene, renderer, camera, startView, assets, Skydome, Water, Skybox) {
    var Lobby = function() {
        State.call(this);
        console.info('LOBBY', 'Constructed');
    };
    Lobby.prototype = Object.create(State.prototype);
    Lobby.prototype.constructor = Lobby;

    Lobby.prototype.show = function() {
        console.info('LOBBY', 'Show');

        assets.audio.ocean.play();
        setTimeout(function() {
            //assets.audio.intro.play()
        }, 3000);

        this.clock = new THREE.Clock(true);
        this.clock.start();

        this.parent = new THREE.Object3D();
        this.parent.name = "lobby";

        this.createLight();
        this.createSkydome();
        this.createWater();

        //this.loadBattleship();
        //this.loadLogo();

        scene.add(this.parent);

        startView.show();

        camera.position.set(0, 20, 70);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();
    };

    Lobby.prototype.hide = function() {
        scene.remove(scene.getObjectByName("lobby"));
        startView.hide();
    };

    Lobby.prototype.createLight = function() {
        // ambient
        var ambient = new THREE.AmbientLight(0xFFFFFF);
        scene.add(ambient);

        // directional
        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(0, 1, 1).normalize();
        scene.add(directionalLight);

        // hemilight
        var hemiLight = new THREE.HemisphereLight( 0x99FF99, 0x18FFBF, 1 );
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(-1, 1, -1);
        scene.add(hemiLight);
    };

    Lobby.prototype.createSkydome = function() {
        //this.sky = new Skydome();
        this.sky = new Skybox();
        scene.add(this.sky.getObject());
    };

    Lobby.prototype.createWater = function() {
        this.water = new Water();
        window.water = this.water;
        scene.add(this.water.getObject());
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

    Lobby.prototype.update = function() {
        // update water
        this.water.update();

        // update battleship
        if(this.battleship) {
            this.clock.getElapsedTime();
            this.battleship.rotation.x = Math.sin(this.clock.elapsedTime) / 64;
            this.battleship.rotation.z = Math.sin(this.clock.elapsedTime) / 64;
            this.battleship.rotation.y = -Math.cos(this.clock.elapsedTime) / 64;
        }
    };

    Lobby.prototype.render = function() {
        renderer.render();
    };

    return new Lobby();
});
