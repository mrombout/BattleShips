"use strict";

define(['assets'], function(assets) {
    /**
     * Represents a particle effect in 3D space.
     *
     * @constructor
     */
    var ParticleEffect = function() {
        this.parent = new THREE.Object3D();
    };

    /**
     * Creates the particle group that represents this particle effect.
     */
    ParticleEffect.prototype.createParticleGroup = function() {

    };

    /**
     * Attach this particle effect to an THREE.Object3D.
     *
     * @param {THREE.Object3D} obj
     */
    ParticleEffect.prototype.attach = function(obj) {
        if(!this.particleGroup)
            this.createParticleGroup();

        this.particleEmitter.position = obj.position;
    };

    /**
     * Updates this particle effect.
     */
    ParticleEffect.prototype.update = function() {
        if(!this.particleGroup)
            this.createParticleGroup();

        this.particleGroup.tick(0.016);
    };

    /**
     * Returns the parent object of this particle effect.
     *
     * @returns {THREE.Object3D}
     */
    ParticleEffect.prototype.getObject = function() {
        return this.parent;
    };

    return ParticleEffect;
});