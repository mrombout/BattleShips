"use strict";

define(["three", "container"], function(THREE) {
    // Create renderer
    var renderer= new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    return renderer;
});