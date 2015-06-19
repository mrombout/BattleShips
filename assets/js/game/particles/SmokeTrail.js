define(['three', 'assets', 'particles/ParticleEffect'], function(THREE, assets, ParticleEffect) {
    var SmokeTrail = function() {
        ParticleEffect.call(this);
    };
    SmokeTrail.prototype = Object.create(ParticleEffect.prototype);
    SmokeTrail.prototype.constructor = SmokeTrail;

    SmokeTrail.prototype.createParticleGroup = function() {
        // create particle group
        this.particleGroup = new SPE.Group({
            texture: assets.textures.smoke_particle,
            maxAge: 6,
            alphaTest: 1,
            blending: THREE.NormalBlending
        });

        // create a single emitter
        this.particleEmitter = new SPE.Emitter({
            type: 'cube',

            position: new THREE.Vector3(0, 0, 0),
            positionSpread: new THREE.Vector3(2, 0, 2),

            velocity: new THREE.Vector3(0, 55, 0),
            velocitySpread: new THREE.Vector3(20, 0, 20),

            acceleration: new THREE.Vector3(0, -5, 0),

            angleStart: -Math.PI / 2,
            angleStartSpread: Math.PI,
            angleEnd: 0,
            angleEndSpread: Math.PI,

            sizeStart: 32,
            sizeEnd: 256,

            //opacityStart: 1,
            //opacityEnd: 0.0,

            colorStart: new THREE.Color(0.4, 0.4, 0.4),
            colorEnd: new THREE.Color(0.8, 0.8, 0.8),

            particlesPerSecond: 1800
        });

        // add the emitter to the group
        this.particleGroup.addEmitter(this.particleEmitter);

        // add the particle group to the scene so it can be drawn
        this.particleGroup.mesh.frustumCulled = false;
        this.parent.add(this.particleGroup.mesh);
    };

    return SmokeTrail;
});