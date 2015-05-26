"use strict";

define(['three', 'container', 'camera', 'scene', 'util/debug'], function(THREE, $container, camera, scene, debug) {
    function updateFXAAResolution() {
        effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    }

    // create renderer
    var renderer= new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;

    container.appendChild(renderer.domElement);

    // create composer
    var composer = new THREE.EffectComposer(renderer);

    // RenderPass
    var renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    // BeachBypassShader
    var effectBleach = new THREE.ShaderPass(THREE.BleachBypassShader);
    effectBleach.uniforms['opacity'].value = 0.4;
    composer.addPass(effectBleach);
    debug.add(effectBleach, 'enabled').name('Bleach Bypass');

    // ColorCorrectionShader
    var effectColor = new THREE.ShaderPass(THREE.ColorCorrectionShader);
    effectColor.uniforms['powRGB'].value.set(1.4, 1.45, 1.45);
    effectColor.uniforms['mulRGB'].value.set(1.1, 1.1, 1.1);
    composer.addPass(effectColor);
    debug.add(effectColor, 'enabled').name('Color Correction');

    // FXAA
    var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    composer.addPass(effectFXAA);

    updateFXAAResolution();
    window.addEventListener('resize', updateFXAAResolution, false);

    debug.add(effectFXAA, 'enabled').name('FXAA');

    // CopyShader
    var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    effectCopy.renderToScreen = true;
    composer.addPass(effectCopy);

    return composer;
});