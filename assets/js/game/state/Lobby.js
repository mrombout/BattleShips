"use strict";

define(['state/State', 'scene', 'renderer', 'camera', 'view/start', 'shader!skydome.vert', 'shader!skydome.frag', 'assets'], function(State, scene, renderer, camera, startView, skydomeVert, skydomeFrag, assets) {
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

        this.loadBattleship();
        this.loadLogo();

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
        // directional
        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(0, 1, 1).normalize();
        scene.add(directionalLight);
    };

    Lobby.prototype.createSkydome = function() {
        // hemilight
        var hemiLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(-1, 1, -1);
        scene.add(hemiLight);

        // fog
        var uniforms = {
            topColor: 	 { type: "c", value: new THREE.Color( 0x0077ff ) },
            bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
            offset:		 { type: "f", value: 33 },
            exponent:	 { type: "f", value: 0.6 }
        }
        uniforms.topColor.value.copy(hemiLight.color );

        scene.fog.color.copy( uniforms.bottomColor.value );

        // sky
        var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
        var skyMat = new THREE.ShaderMaterial({
            vertexShader: skydomeVert.value,
            fragmentShader: skydomeFrag.value,
            uniforms: uniforms,
            side: THREE.BackSide
        });

        var sky = new THREE.Mesh( skyGeo, skyMat );
        scene.add( sky );
    };

    Lobby.prototype.createWater = function() {
        var waterNormals = assets.textures.water_normal;

        this.water = new THREE.Water(renderer.renderer, camera, scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            alpha: 1.0,
            sunColor: 0xFFFFFF,
            waterColor: 0x001E0F,
            distortionScale: 50.0
        });

        var mirrorMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2000 * 500, 2000 * 500),
            this.water.material
        );
        mirrorMesh.name = "water";
        mirrorMesh.add(this.water);
        mirrorMesh.rotation.x = -Math.PI * 0.5;
        scene.add(mirrorMesh);
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
        this.water.material.uniforms.time.value += 1.0 / 60.0;

        // update battleship
        if(this.battleship) {
            this.clock.getElapsedTime()
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
