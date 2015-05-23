"use strict";

require(['detector', 'state/loading', 'game'], function(Detector, loadingState, game){
    if(!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }

    game.init();
    game.setState(loadingState);
    game.render();
});
