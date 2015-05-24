"use strict";

var require = {
    baseUrl: "assets/js/game",
    shim: {
        "threeCore": { exports: "THREE" },
        "TrackballControls": { deps: ['threeCore'], exports: "THREE" },
        "WaterShader": { deps: ['threeCore', 'Mirror'], exports: "THREE" },
        "Mirror": { deps: ['threeCore'], exports: "THREE" },
        "RenderPass": { deps: ['threeCore'], exports: "THREE" },
        "ShaderPass": { deps: ['threeCore'], exports: "THREE" },
        "MaskPass": { deps: ['threeCore'], exports: "THREE" },
        "BloomPass": { deps: ['threeCore', 'ConvolutionShader'], exports: "THREE" },
        "EffectComposer": { deps: ['threeCore', 'CopyShader', 'MaskPass'], exports: "THREE" },
        "BleachBypassShader": { deps: ['threeCore'], exports: "THREE" },
        "ColorCorrectionShader": { deps: ['threeCore'], exports: "THREE" },
        "CopyShader": { deps: ['threeCore'], exports: "THREE" },
        "FXAAShader": { deps: ['threeCore'], exports: "THREE" },
        "ConvolutionShader": { deps: ['threeCore'], exports: "THREE" },
        "OceanShaders": { deps: ['threeCore'], exports: "THREE" },

        "detector": { exports: "Detector" },
        "Stats": { exports: "Stats" }
    },
    paths: {
        "jquery": ["https://code.jquery.com/jquery-2.1.4", "../../../bower_components/dist/jquery"],

        "threeCore": "../../../vendor/three.js/three.min",

        "TrackballControls": "../../../vendor/TrackballControls/TrackballControls",
        "WaterShader": "../../../vendor/WaterShader/WaterShader",
        "RenderPass": "../../../vendor/three.js/postprocessing/RenderPass",
        "ShaderPass": "../../../vendor/three.js/postprocessing/ShaderPass",
        "MaskPass": "../../../vendor/three.js/postprocessing/MaskPass",
        "BloomPass": "../../../vendor/three.js/postprocessing/BloomPass",
        "EffectComposer": "../../../vendor/three.js/postprocessing/EffectComposer",
        "BleachBypassShader": "../../../vendor/three.js/shaders/BleachBypassShader",
        "ColorCorrectionShader": "../../../vendor/three.js/shaders/ColorCorrectionShader",
        "CopyShader": "../../../vendor/three.js/shaders/CopyShader",
        "FXAAShader": "../../../vendor/three.js/shaders/FXAAShader",
        "ConvolutionShader": "../../../vendor/three.js/shaders/ConvolutionShader",
        "OceanShaders": "../../../vendor/three.js/shaders/OceanShaders",
        "Mirror": "../../../vendor/Mirror/Mirror",
        "detector": "../../../vendor/Detector/Detector",
        "Stats": "../../../vendor/stats.js/stats.min",

        "text": "../../../bower_components/text/text",

        "shader": "../../../vendor/shader/shader",
        "shaders": "../../shaders",

        'datgui': "../../../vendor/dat.gui/dat.gui"
    }
};