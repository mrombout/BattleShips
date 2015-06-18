define(['entity/Shot3D', 'particles/Splash', 'assets'], function(Shot3D, Splash, assets) {
    /**
     * Represents a SPLASH shot in 3D space.
     *
     * @param {Shot} shot
     * @constructor
     */
    var SplashShot3D = function(shot) {
        Shot3D.call(this, shot);

        this.createEmitter();
    };
    SplashShot3D.prototype = Object.create(Shot3D.prototype);
    SplashShot3D.prototype.constructor = SplashShot3D;

    /**
     * Creates the emitter.
     */
    SplashShot3D.prototype.createEmitter = function() {
        var geometry = assets.geometries.splash;
        var material = new THREE.MeshLambertMaterial({
            map: assets.textures.splash
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 2;

        this.parent.add(mesh);
    };

    /**
     * Updates this shot.
     *
     * @param {number} delta
     */
    SplashShot3D.prototype.update = function(delta) {

    };

    return SplashShot3D;
});