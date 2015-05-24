"use strict";

define(['three', 'container', 'camera', 'scene', 'util/debug'], function(THREE, $container, camera, scene, debug) {
    function updateFXAAResolution() {
        effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    }

    // create renderer
    var renderer= new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = true;

    container.appendChild(renderer.domElement);

    var renderModel = new THREE.RenderPass(scene, camera);

    var effectBleach = new THREE.ShaderPass(THREE.BleachBypassShader);
    var effectColor = new THREE.ShaderPass(THREE.ColorCorrectionShader);
    var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    var effectCopy = new THREE.ShaderPass(THREE.CopyShader);

    debug.add(effectBleach, 'enabled').name('Bleach Bypass');
    debug.add(effectColor, 'enabled').name('Color Correction');
    debug.add(effectFXAA, 'enabled').name('FXAA');

    updateFXAAResolution();
    window.addEventListener('resize', updateFXAAResolution, false);

    effectBleach.uniforms['opacity'].value = 0.4;

    effectColor.uniforms['powRGB'].value.set(1.4, 1.45, 1.45);
    effectColor.uniforms['mulRGB'].value.set(1.1, 1.1, 1.1);

    effectCopy.renderToScreen = true;

    var composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderModel);

    composer.addPass(effectBleach);
    composer.addPass(effectColor);
    composer.addPass(effectFXAA);
    composer.addPass(effectCopy);

    return composer;
});