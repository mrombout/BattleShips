"use strict";

define(function() {
    var State = function() {

    };

    /**
     * Shows the current state, effectively making it the "active" state.
     */
    State.prototype.show = function() {

    };

    /**
     * Hides the current state, effectively no longer making it the "active"
     * state.
     */
    State.prototype.hide = function() {

    };

    /**
     * Updates this state. This function is called as many times as
     * 'requestAnimationFrame' allows.
     */
    State.prototype.update = function() {

    };

    /**
     * Renders this state. This function is called as many times as
     * 'requestAnimationFrame' allows.
     */
    State.prototype.render = function() {
        // render water
        this.water.render();
    };

    return State;
});