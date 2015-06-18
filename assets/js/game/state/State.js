"use strict";

define(function() {
    var State = function() {

    };

    State.prototype.show = function() {
        annyang.addCommands(this.commands);
        annyang.start();
    };

    State.prototype.hide = function() {
        annyang.removeCommands(this.commands);
        annyang.stop();
    };

    State.prototype.update = function() {

    };

    State.prototype.render = function() {
        // render water
        this.water.render();
    };

    return State;
});