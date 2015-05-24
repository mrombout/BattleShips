"use strict";

define(['three', 'container', 'camera', 'scene', 'util/debug'], function(THREE, $container, camera, scene, debug) {
    function updateFXAAResolution() {
        effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    }

    var material_depth = new THREE.MeshDepthMaterial();

    // create renderer
    var renderer= new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild(renderer.domElement);

    // create composer
    var composer = new THREE.EffectComposer(renderer);

    // RenderPass
    var renderPass = new THREE.RenderPass(scene, camera);
    renderPass.renderToScreen = false;
    composer.addPass(renderPass);

    
    var filmPass = new THREE.FilmPass(0.35, 0.025, 648, false);
    filmPass.renderToScreen = true;

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

    composer.addPass(effectBleach);
    composer.addPass(effectColor);
    composer.addPass(effectFXAA);
    composer.addPass(effectCopy);
    effectCopy.renderToScreen = true;

    return composer;
});