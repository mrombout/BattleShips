"use strict";

define(function() {
    var audioContext = new ( window.AudioContext || window.webkitAudioContext )();

    var gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);

    return audioContext;
});