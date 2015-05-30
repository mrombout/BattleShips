define(['three', 'assets'], function(THREE, assets) {
    var SmokeTrail = function() {
        this.parent = new THREE.Object3D();

        this.createEmitter();
    };

    SmokeTrail.prototype.createEmitter = function() {
        // create particle group
        this.particleGroup = new SPE.Group({
            texture: assets.textures.water_particle,
            maxAge: 2,
            blending: THREE.NormalBlending
        });

        // create a single emitter
        this.particleEmitter = new SPE.Emitter({
            position: new THREE.Vector3(0, 0, 0),

            acceleration: new THREE.Vector3(0, -5, 0),
            accelerationSpread: new THREE.Vector3(5, 0, 5),

            velocity: new THREE.Vector3(0, 10, 0),

            sizeStart: 5,
            sizeEnd: 0,

            particleCount: 1500
        });

        // add the emitter to the group
        this.particleGroup.addEmitter(this.particleEmitter);
        this.particleGroup.mesh.position.y = 0.2;

        // add the particle group to the scene so it can be drawn
        this.parent.add(this.particleGroup.mesh);
    };

    SmokeTrail.prototype.attach = function(obj) {
        this.particleEmitter.position = obj.position;
    };

    SmokeTrail.prototype.update = function() {
        this.particleGroup.tick(0.016);
    };

    SmokeTrail.prototype.getObject = function() {
        return this.parent;
    };

    return SmokeTrail;
});