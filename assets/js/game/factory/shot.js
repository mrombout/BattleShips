define(['entity/Shot3D', 'entity/BoomShot3D', 'entity/SplashShot3D'], function(Shot3D, BoomShot3D, SplashShot3D) {
    var ShotFactory = function() {

    };

    ShotFactory.prototype.create = function(shot) {
        if(shot.isHit) {
            console.debug('SHOT FACTORY', 'Creating BoomShot3D');
            return new BoomShot3D(shot);
        } else {
            console.debug('SHOT FACTORY', 'Creating Shot3D');
            return new SplashShot3D(shot);
        }
    };

    return new ShotFactory();
});