define(['three', 'shader!skydome.vert', 'shader!skydome.frag', ], function(THREE, skydomeVert, skydomeFrag) {
    var Skydome = function() {
        this.parent = new THREE.Object3D();

        // sky
        var skyGeometry = new THREE.SphereGeometry(1000 * 500, 120, 80);
        var skyMaterial = new THREE.ShaderMaterial({
            vertexShader: skydomeVert.value,
            fragmentShader: skydomeFrag.value,
            uniforms: {
                texture: { type: 't', value: THREE.ImageUtils.loadTexture('assets/texture/skydome.jpg') }
            },
            side: THREE.BackSide
        });

        var skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
        skyMesh.rotation.order = 'XYZ';
        skyMesh.renderDepth = 1000.0;

        this.parent.add(skyMesh);
    };

    Skydome.prototype.getObject = function() {
        return this.parent;
    };

    return Skydome;
});