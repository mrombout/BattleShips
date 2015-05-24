"use strict";

var require = {
    baseUrl: "assets/js/game",
    shim: {
        "threeCore": { exports: "THREE" },
        "TrackballControls": { deps: ['threeCore'], exports: "THREE" },
        "OrbitControls": { deps: ['threeCore'], exports: "THREE" },
        "WaterShader": { deps: ['threeCore', 'Mirror'], exports: "THREE" },
        "Mirror": { deps: ['threeCore'], exports: "THREE" },
        "RenderPass": { deps: ['threeCore'], exports: "THREE" },
        "ShaderPass": { deps: ['threeCore'], exports: "THREE" },
        "MaskPass": { deps: ['threeCore'], exports: "THREE" },
        "BloomPass": { deps: ['threeCore', 'ConvolutionShader'], exports: "THREE" },
        "BokehPass": { deps: ['threeCore', 'BokehShader'], exports: "THREE" },
        "FilmPass": { deps: ['threeCore', 'FilmShader'], exports: "THREE" },
        "DotScreenPass": { deps: ['threeCore', 'DotScreenShader'], exports: "THREE" },
        "EffectComposer": { deps: ['threeCore', 'CopyShader', 'MaskPass'], exports: "THREE" },
        "BleachBypassShader": { deps: ['threeCore'], exports: "THREE" },
        "ColorCorrectionShader": { deps: ['threeCore'], exports: "THREE" },
        "FilmShader": { deps: ['threeCore'], exports: "THREE" },
        "CopyShader": { deps: ['threeCore'], exports: "THREE" },
        "FXAAShader": { deps: ['threeCore'], exports: "THREE" },
        "VignetteShader": { deps: ['threeCore'], exports: "THREE" },
        "ConvolutionShader": { deps: ['threeCore'], exports: "THREE" },
        "DotScreenShader": { deps: ['threeCore'], exports: "THREE" },
        "OceanShaders": { deps: ['threeCore'], exports: "THREE" },
        "BokehShader": { deps: ['threeCore'], exports: "THREE" },
        "Ocean": { deps: ['threeCore'], exports: "THREE" },

        "detector": { exports: "Detector" },
        "Stats": { exports: "Stats" }
    },
    paths: {
        "jquery": ["https://code.jquery.com/jquery-2.1.4", "../../../bower_components/dist/jquery"],

        "threeCore": "../../../vendor/three.js/three.min",

        "TrackballControls": "../../../vendor/TrackballControls/TrackballControls",
        "OrbitControls": "../../../vendor/three.js/examples/js/controls/OrbitControls",
        "WaterShader": "../../../vendor/WaterShader/WaterShader",
        "Ocean": "../../../vendor/Ocean/Ocean",
        "RenderPass": "../../../vendor/three.js/postprocessing/RenderPass",
        "ShaderPass": "../../../vendor/three.js/postprocessing/ShaderPass",
        "MaskPass": "../../../vendor/three.js/postprocessing/MaskPass",
        "BloomPass": "../../../vendor/three.js/postprocessing/BloomPass",
        "BokehPass": "../../../vendor/three.js/postprocessing/BokehPass",
        "FilmPass": "../../../vendor/three.js/postprocessing/FilmPass",
        "DotScreenPass": "../../../vendor/three.js/postprocessing/DotScreenPass",
        "EffectComposer": "../../../vendor/three.js/postprocessing/EffectComposer",
        "BleachBypassShader": "../../../vendor/three.js/shaders/BleachBypassShader",
        "ColorCorrectionShader": "../../../vendor/three.js/shaders/ColorCorrectionShader",
        "FilmShader": "../../../vendor/three.js/shaders/FilmShader",
        "CopyShader": "../../../vendor/three.js/shaders/CopyShader",
        "FXAAShader": "../../../vendor/three.js/shaders/FXAAShader",
        "VignetteShader": "../../../vendor/three.js/shaders/VignetteShader",
        "ConvolutionShader": "../../../vendor/three.js/shaders/ConvolutionShader",
        "BokehShader": "../../../vendor/three.js/shaders/BokehShader",
        "DotScreenShader": "../../../vendor/three.js/shaders/DotScreenShader",
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