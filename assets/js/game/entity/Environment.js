define(['three', 'entity/Skybox', 'entity/Water'], function(THREE, Skydome, Water) {
    var Environment = function() {
        this.parent = new THREE.Object3D();
        this.parent.name = "environment";

        this.sky = new Skydome();
        this.water = new Water();

        this.parent.add(this.sky.getObject());
        this.parent.add(this.water.getObject());
    };

    Environment.prototype.update = function() {
        this.water.update();
    };

    Environment.prototype.render = function() {
        this.water.render();
    };

    Environment.prototype.getObject = function() {
        return this.parent;
    };

    return Environment;
});