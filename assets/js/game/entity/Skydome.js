define(['three', 'shader!skydome.vert', 'shader!skydome.frag', 'assets'], function(THREE, skydomeVert, skydomeFrag, assets) {
    /**
     * Represents the sky in 3D space using a skydome.
     *
     * @constructor
     */
    var Skydome = function() {
        this.parent = new THREE.Object3D();

        // sky
        var skyGeometry = new THREE.SphereGeometry(1000 * 500, 60, 40);
        var skyMaterial = new THREE.ShaderMaterial({
            vertexShader: skydomeVert.value,
            fragmentShader: skydomeFrag.value,
            uniforms: {
                texture: { type: 't', value: assets.textures.skydome_diffuse }
            },
            side: THREE.BackSide,
            depthWrite: false
        });

        var skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
        skyMesh.rotation.order = 'XYZ';
        skyMesh.renderDepth = 1000.0;

        this.parent.add(skyMesh);
    };

    /**
     * Returns the parent of this sky.
     *
     * @returns {THREE.Object3D|*}
     */
    Skydome.prototype.getObject = function() {
        return this.parent;
    };

    return Skydome;
});