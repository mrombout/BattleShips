define(['three', 'assets'], function(THREE, assets) {
    var SmokeTrail = function() {
        this.parent = new THREE.Object3D();

        this.createEmitter();
    };

    SmokeTrail.prototype.createEmitter = function() {
        // create particle group
        this.particleGroup = new SPE.Group({
            texture: assets.textures.water_particle,
            maxAge: 1,
            blending: THREE.NormalBlending
        });

        // create a single emitter
        this.particleEmitter = new SPE.Emitter({
            type: 'disk',

            radius: 2,
            speed: 5,

            acceleration: new THREE.Vector3(5, 5, 5),

            sizeStart: 15,

            colorStart: new THREE.Color('white'),
            colorEnd: new THREE.Color('cyan'),

            particleCount: 800
        });

        // add the emitter to the group
        this.particleGroup.addEmitter(this.particleEmitter);
        this.particleGroup.mesh.rotation.x = Math.PI / 2;
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