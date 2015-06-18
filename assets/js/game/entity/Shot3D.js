define(['three'], function(THREE) {

    /**
     * Represents a shot in 3D space.
     *
     * @param {Shot} shot
     * @constructor
     */
    var Shot3D = function(shot) {
        this.model = shot;

        this.parent = new THREE.Object3D();
    };

    /**
     * Creates the shot object.
     */
    Shot3D.prototype.createObject = function() {
        var material = new THREE.MeshLambertMaterial();
        material.color.setRGB(this.model.isHit ? 0 : 1, this.model.isHit ? 1 : 0, 0);
        var geometry = new THREE.BoxGeometry(20, 0, 20);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 1;

        this.parent.add(mesh);
    };

    /**
     * Updates this shot
     *
     * @param {number} delta
     */
    Shot3D.prototype.update = function(delta) {

    };

    /**
     * Returns the parent object of this shot.
     *
     * @returns {THREE.Object3D}
     */
    Shot3D.prototype.getObject = function() {
        return this.parent;
    };

    return Shot3D;
});