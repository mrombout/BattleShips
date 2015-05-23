define(['three'], function(THREE) {
    var Ship3D = function(model) {
        this.model = model;
        this.parent = new THREE.Object3D();
    };

    Ship3D.prototype.addObject = function(object) {
        this.parent.add(object);
    };

    Ship3D.prototype.getObject = function() {
        return this.parent;
    };

    return Ship3D;
});