"use strict";

define(['three', 'container', 'scene', 'camera'], function(THREE, $container, scene, camera) {
    var StereoRenderer = function() {
        console.info("RENDERER", "Using StereoRenderer");
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);

        $container.append(this.renderer.domElement);

        this.effect = new THREE.StereoEffect(this.renderer);
        this.effect.eyeSeparation = 10;
        this.effect.setSize(window.innerWidth, window.innerHeight);
    };

    StereoRenderer.prototype.setSize = function(w, h) {
        this.effect.setSize(w, h);
    };

    StereoRenderer.prototype.render = function() {
        this.effect.render(scene, camera);
    };

    return StereoRenderer;
});

