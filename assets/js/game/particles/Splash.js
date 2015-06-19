define(['three', 'assets', 'particles/ParticleEffect'], function(THREE, assets, ParticleEffect) {
    var Splash = function() {
        this.parent = new THREE.Object3D();

        this.createEmitter();
    };
    Splash.prototype = Object.create(ParticleEffect.prototype);
    Splash.prototype.constructor = Splash;

    Splash.prototype.createParticleGroup = function() {
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

    return Splash;
});