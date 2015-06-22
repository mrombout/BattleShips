"use strict";

define(function() {

    /**
     * Provides the different game states used by the Zeeslap API and this game.
     *
     * @type {{QUEUE: string, SETUP: string, STARTED: string, DONE: string}}
     */
    return {
        QUEUE: 'que',
        SETUP: 'setup',
        STARTED: 'started',
        DONE: 'done'
    };
});
