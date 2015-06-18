define(['three', 'entity/Skybox', 'entity/Water', 'entity/Skydome'], function(THREE, Skybox, Water, Skydome) {
    /**
     * Represents the ambient environment of the game.
     *
     * This object contains the following elements:
     *   - Skybox
     *   - Ocean
     *   - Lights
     *
     * @constructor
     */
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

    /**
     * Creates the environment lights
     */
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

    /**
     * Updates the environment
     *
     * @param {number} delta
     */
    Environment.prototype.update = function(delta) {
        this.water.update(delta);
    };

    /**
     * Renders the environment
     */
    Environment.prototype.render = function() {
        this.water.render();
    };

    /**
     * Returns the parent object of the environment.
     *
     * @returns {THREE.Object3D|*}
     */
    Environment.prototype.getObject = function() {
        return this.parent;
    };

    return Environment;
});