"use strict";

define(['container', 'camera', 'scene', 'util/debug'], function($container, camera, scene, debug) {
    /**
     * Renderer for mid-/high-end PC's that uses several graphical enhancements
     * and effects.
     *
     * @constructor
     */
    var HighRenderer = function() {
        function updateFXAAResolution() {
            effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
        }

        // create renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.sortObjects = false;

        $container.append(this.renderer.domElement);

        // create composer
        this.composer = new THREE.EffectComposer(this.renderer);

        // RenderPass
        var renderPass = new THREE.RenderPass(scene, camera);
        this.composer.addPass(renderPass);

        // BeachBypassShader
        var effectBleach = new THREE.ShaderPass(THREE.BleachBypassShader);
        effectBleach.uniforms['opacity'].value = 0.4;
        this.composer.addPass(effectBleach);
        debug.add(effectBleach, 'enabled').name('Bleach Bypass');

        // ColorCorrectionShader
        var effectColor = new THREE.ShaderPass(THREE.ColorCorrectionShader);
        effectColor.uniforms['powRGB'].value.set(1.4, 1.45, 1.45);
        effectColor.uniforms['mulRGB'].value.set(1.1, 1.1, 1.1);
        this.composer.addPass(effectColor);
        debug.add(effectColor, 'enabled').name('Color Correction');

        // FXAA
        var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        this.composer.addPass(effectFXAA);

        updateFXAAResolution();
        window.addEventListener('resize', updateFXAAResolution, false);

        debug.add(effectFXAA, 'enabled').name('FXAA');

        // CopyShader
        var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        effectCopy.renderToScreen = true;
        this.composer.addPass(effectCopy);
    };

    /**
     * Sets the size of this renderer.
     *
     * @param w
     * @param h
     */
    HighRenderer.prototype.setSize = function(w, h) {
        this.composer.setSize(w, h);
        this.composer.renderer.setSize(w, h);
    };

    /**
     * Renders the provided scene using the provided camera.
     *
     * @param {THREE.Scene} scene
     * @param {THREE.Camera} camera
     * @param renderTarget
     * @param forceClear
     */
    HighRenderer.prototype.render = function(scene, camera, renderTarget, forceClear) {
        this.composer.render(scene, camera, renderTarget, forceClear);
    };

    return HighRenderer;
});