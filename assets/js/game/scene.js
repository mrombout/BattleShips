define(['three'], function(THREE) {
    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xFFFFFF, 1, 5000);
    scene.fog.color.setHSL(0.6, 0, 1);

    return scene;
});