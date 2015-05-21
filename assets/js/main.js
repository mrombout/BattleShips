"use strict";

require(['detector', 'state/lobby', 'game'], function(Detector, lobbyState, game){
    if(!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }

    game.init();

    game.setState(lobbyState);

    game.render();
});
