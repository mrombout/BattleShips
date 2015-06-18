define(['three'], function(THREE) {
    /**
     * Represents the sky in 3D space using a skybox.
     *
     * @constructor
     */
    var Skybox = function() {
        // load skybox
        var cubeMap = new THREE.CubeTexture( [] );
        cubeMap.format = THREE.RGBFormat;
        cubeMap.flipY = false;

        var loader = new THREE.ImageLoader();
        loader.load( 'assets/texture/Above_The_Sea.jpg', function ( image ) {
            var getSide = function ( x, y ) {
                var size = 1024;

                var canvas = document.createElement( 'canvas' );
                canvas.width = size;
                canvas.height = size;

                var context = canvas.getContext( '2d' );
                context.drawImage( image, - x * size, - y * size );

                return canvas;
            };

            cubeMap.images[ 0 ] = getSide( 2, 1 ); // px
            cubeMap.images[ 1 ] = getSide( 0, 1 ); // nx
            cubeMap.images[ 2 ] = getSide( 1, 0 ); // py
            cubeMap.images[ 3 ] = getSide( 1, 2 ); // ny
            cubeMap.images[ 4 ] = getSide( 1, 1 ); // pz
            cubeMap.images[ 5 ] = getSide( 3, 1 ); // nz
            cubeMap.needsUpdate = true;
        } );

        var cubeShader = THREE.ShaderLib['cube'];
        cubeShader.uniforms['tCube'].value = cubeMap;

        var skyBoxMaterial = new THREE.ShaderMaterial( {
            fragmentShader: cubeShader.fragmentShader,
            vertexShader: cubeShader.vertexShader,
            uniforms: cubeShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        this.skyBox = new THREE.Mesh(
            new THREE.BoxGeometry( 1000000, 1000000, 1000000 ),
            skyBoxMaterial
        );
    };

    /**
     * Returns the parent object of this skybox
     *
     * @returns {THREE.Mesh}
     */
    Skybox.prototype.getObject = function() {
        return this.skyBox;
    };

    return Skybox;
});