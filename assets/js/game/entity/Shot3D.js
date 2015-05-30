define(['three'], function(THREE) {
    var Shot3D = function(shot) {
        this.model = shot;

        this.parent = new THREE.Object3D();

        this.createObject();
    };

    Shot3D.prototype.createObject = function() {
        var material = new THREE.MeshLambertMaterial();
        material.color.setRGB(this.model.isHit ? 0 : 1, this.model.isHit ? 1 : 0, 0);
        var geometry = new THREE.BoxGeometry(20, 0, 20);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 1;

        this.parent.add(mesh);
    };

    Shot3D.prototype.update = function(delta) {

    };

    Shot3D.prototype.getObject = function() {
        return this.parent;
    };

    return Shot3D;
});