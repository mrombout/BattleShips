define(['entity/Shot3D', 'particles/Splash'], function(Shot3D, Splash) {
    var SplashShot3D = function(shot) {
        Shot3D.call(this, shot);

        this.createEmitter();
    };
    SplashShot3D.prototype = Object.create(Shot3D.prototype);
    SplashShot3D.prototype.constructor = SplashShot3D;

    SplashShot3D.prototype.createEmitter = function() {
        this.splash = new Splash();
        this.parent.add(this.splash.getObject());
    };

    SplashShot3D.prototype.update = function(delta) {
        this.splash.update(delta)
    };

    return SplashShot3D;
});