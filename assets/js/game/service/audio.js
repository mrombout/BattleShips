"use strict";

define([], function() {
    /**
     * Responsible for playing audio.
     *
     * @constructor
     */
    var AudioService = function() {

    };

    /**
     * Plays the provided audio file.
     *
     * @param audio
     */
    AudioService.prototype.play = function(audio) {
        audio.play();
    };

    /**
     * Stops the provided audio file.
     *
     * @param audio
     */
    AudioService.prototype.stop = function(audio) {
        audio.stop();
    };

    return new AudioService();
});