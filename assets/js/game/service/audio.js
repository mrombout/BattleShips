"use strict";

define(['audioContext'], function(audioContext) {
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
        if(audioContext && audio)
            audio.play();
    };

    /**
     * Stops the provided audio file.
     *
     * @param audio
     */
    AudioService.prototype.stop = function(audio) {
        if(audioContext && audio)
            audio.stop();
    };

    return new AudioService();
});