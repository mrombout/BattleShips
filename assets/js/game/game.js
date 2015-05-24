"use strict";

define(['three', 'renderer', 'camera', 'stats'], function(THREE, renderer, camera, stats) {
    var game = {
        init: function() {
            this.onWindowResize();
            window.addEventListener('resize', game.onWindowResize, false);

            game.clock = new THREE.Clock();
        },
        onWindowResize: function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        setState: function(state) {
            if(this.state) {
                this.state.hide();
            }
            this.state = state;
            this.state.show();
        },
        render: function() {
            window.requestAnimationFrame(game.render);

            if(game.state) {
                stats.begin();
                game.state.update(game.clock);
                game.state.render(game.clock);
                stats.end();
            }
        }
    };

    return game;
});