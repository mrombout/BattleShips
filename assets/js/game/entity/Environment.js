define(['three', 'entity/Skybox', 'entity/Water', 'entity/Skydome'], function(THREE, Skybox, Water, Skydome) {
    var Environment = function() {
        this.parent = new THREE.Object3D();
        this.parent.name = "environment";

        this.sky = new Skybox();
        //this.sky = new Skydome();
        this.water = new Water();
        this.createLights();

        this.parent.add(this.sky.getObject());
        this.parent.add(this.water.getObject());
    };

    Environment.prototype.createLights = function() {
        // directional
        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(0, 1, 1).normalize();
        this.parent.add(directionalLight);

        // hemilight
        var hemiLight = new THREE.HemisphereLight( 0x99FF99, 0x18FFBF, 1 );
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(-1, 1, -1);
        this.parent.add(hemiLight);
    };

    Environment.prototype.update = function(clock) {
        this.water.update(clock);
    };

    Environment.prototype.render = function() {
        this.water.render();
    };

    Environment.prototype.getObject = function() {
        return this.parent;
    };

    return Environment;
});