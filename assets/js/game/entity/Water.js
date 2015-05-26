define(['three', 'renderer', 'camera', 'scene', 'shader!seascape.vert', 'shader!seascape.frag', 'assets', 'util/debug'], function(THREE, renderer, camera, scene, seascapeVert, seascapeFrag, assets, debug) {
    var Water = function() {
        this.lastTime = 0;

        this.water = new THREE.Water(renderer.renderer, camera, scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: assets.textures.water_normal,
            alpha: 0.8,
            //sunDirection: camera.position.clone().normalize(),
            sunColor: 0xFFFFFF,
            waterColor: 0x002600,
            distortionScale: 50.0,
            //noiseScale: 1,
            fog: false,
            eye: camera.position
        });

        this.mirrorMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2000 * 500, 2000 * 500),
            this.water.material
        );
        this.mirrorMesh.add(this.water);
        this.mirrorMesh.rotation.x = -Math.PI / 2;
        this.mirrorMesh.renderDepth = 1000;
    };

    Water.prototype.update = function(clock) {
        this.water.material.uniforms.time.value += clock.getDelta();
    };

    Water.prototype.render = function() {
        this.water.render();
    };

    Water.prototype.getObject = function() {
        return this.mirrorMesh;
    };

    return Water;
});