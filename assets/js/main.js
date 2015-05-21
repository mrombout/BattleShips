"use strict";

require(['detector', 'game'], function(Detector, game){
    if(!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }

    game.init();
    game.render();
});
