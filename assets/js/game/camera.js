define(['scene'], function(scene) {
    var camera = new THREE.PerspectiveCamera(
        35,         // Field of view
        window.innerWidth / window.innerHeight,  // Aspect ratio
        5,          // Near
        4000000     // Far
    );
    camera.position.set(-250, 200, 200);
    camera.lookAt(scene.position);

    return camera;
});