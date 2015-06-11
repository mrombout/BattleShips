"use strict";

define([], function() {
    var AudioService = function() {

    };

    AudioService.prototype.play = function(audio) {
        audio.play();
    };

    AudioService.prototype.stop = function(audio) {
        audio.stop();
    };

    return new AudioService();
});