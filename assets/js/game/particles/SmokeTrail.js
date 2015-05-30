define(['three', 'assets'], function(THREE, assets) {
    var SmokeTrail = function() {
        this.parent = new THREE.Object3D();

        this.createEmitter();
    };

    SmokeTrail.prototype.createEmitter = function() {

        // create particle group
        this.particleGroup = new SPE.Group({
            texture: assets.textures.smoke_particle,
            maxAge: 2,
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

            sizeStart: 1,
            sizeEnd: 128,

            opacityStart: 1,
            opacityEnd: 0.0,

            colorStart: new THREE.Color(0.4, 0.4, 0.4),
            colorEnd: new THREE.Color(0.8, 0.8, 0.8),

            particlesPerSecond: 200
        });

        // add the emitter to the group
        this.particleGroup.addEmitter(this.particleEmitter);

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