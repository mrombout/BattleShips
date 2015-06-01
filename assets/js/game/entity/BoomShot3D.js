define(['entity/Shot3D', 'particles/Smoke'], function(Shot3D, Smoke) {
    var BoomShot3D = function(shot) {
        Shot3D.call(this, shot);

        this.createEmitter();
    };
    BoomShot3D.prototype = Object.create(Shot3D.prototype);
    BoomShot3D.prototype.constructor = BoomShot3D;

    BoomShot3D.prototype.createEmitter = function() {
        this.smokeTrail = new Smoke();
        this.parent.add(this.smokeTrail.getObject());
    };

    BoomShot3D.prototype.update = function(delta) {
        this.smokeTrail.update(delta)
    };

    return BoomShot3D;
});