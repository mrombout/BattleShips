define(['three', 'particles/SmokeTrail', 'jquery'], function(THREE, SmokeTrail, $) {
    /**
     * Represents a torpedo in 3D space.
     *
     * @param origin
     * @param target
     * @constructor
     */
    var Torpedo = function(origin, target) {
        this.parent = new THREE.Object3D();

        this.origin = new THREE.Vector3().copy(origin.position);
        this.target = new THREE.Vector3().copy(target.position ? target.position : target);

        this.gravity = 9.81;
        this.velocity = 40;

        this.createShell();
        this.createEmitter();
    };

    /**
     * Creates the torpedo shell 3D representation.
     */
    Torpedo.prototype.createShell = function() {
        var material = new THREE.MeshLambertMaterial();
        var geometry = new THREE.SphereGeometry(5, 32, 32);
        this.projectile = new THREE.Mesh(geometry, material);
        this.projectile.position.copy(this.origin);

        this.parent.add(this.projectile);
    };

    /**
     * Creates the emitter used to create a smoke trail.
     */
    Torpedo.prototype.createEmitter = function() {
        this.smokeTrail = new SmokeTrail();
        console.log(this.smokeTrail);
        this.smokeTrail.attach(this.projectile);
        this.parent.add(this.smokeTrail.getObject());
    };

    /**
     * Shoots this torpedo to its target location.
     *
     * @returns {$.Deferred}
     */
    Torpedo.prototype.shoot = function() {
        this.deff = $.Deferred();

        this.direction = this.target.clone().sub(this.origin);
        this.distance = this.target.distanceTo(this.origin);
        this.isShot = true;
        this.travel = 0;

        return this.deff;
    };

    /**
     * Updates this torpedo.
     *
     * @param {number} delta
     */
    Torpedo.prototype.update = function(delta) {
        this.smokeTrail.update(delta);

        if(this.isShot) {
            var curDirection = this.direction.clone();
            this.projectile.position.add(curDirection.multiplyScalar(0.5).multiplyScalar(delta));
            this.travel = this.origin.distanceTo(this.projectile.position);
            this.projectile.position.y = Math.sin(Math.PI * (this.travel / this.distance)) * 100;

            if(this.travel > this.distance) {
                this.explode();
            }
        }
    };

    /**
     * Explodes the torpedo.
     */
    Torpedo.prototype.explode = function() {
        this.isShot = false;

        if(!this.isHit) {
            this.parent.remove(this.smokeTrail.getObject());
            this.deff.reject();
        } else {
            this.deff.resolve();
        }
    };

    /**
     * Returns the parent object of this torpedo.
     *
     * @returns {THREE.Object3D}
     */
    Torpedo.prototype.getObject = function() {
        return this.parent;
    };

    return Torpedo;
});