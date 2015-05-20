var require = {
    baseUrl: "assets/js/game",
    shim: {
        "threeCore": { exports: "THREE" },
        "TrackballControls": { deps: ['threeCore'], exports: "THREE" },
        "WaterShader": { deps: ['threeCore', 'Mirror'], exports: "THREE" },
        "Mirror": { deps: ['threeCore'], exports: "THREE" },

        "detector": { exports: "Detector" },
        "Stats": { exports: "Stats" }
    },
    paths: {
        "jquery": ["https://code.jquery.com/jquery-2.1.4", "../../../bower_components/dist/jquery"],

        "threeCore": "../../../vendor/three.js/three.min",

        "TrackballControls": "../../../vendor/TrackballControls/TrackballControls",
        "WaterShader": "../../../vendor/WaterShader/WaterShader",
        "Mirror": "../../../vendor/Mirror/Mirror",
        "detector": "../../../vendor/Detector/Detector",
        "Stats": "../../../vendor/stats.js/stats.min",

        "text": "../../../bower_components/text/text",

        "shader": "../../../vendor/shader/shader",
        "shaders": "../../shaders"
    }
};