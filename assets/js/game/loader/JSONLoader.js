define(['three'], function(THREE) {
    /**
     * Three.js loader used to Three.js JSON files.
     *
     * @see https://github.com/mrdoob/three.js/wiki
     * @param manager
     * @constructor
     */
    var JSONLoader = function(manager) {
        this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
        this.jsonLoader = new THREE.JSONLoader();
    };

    /**
     * Loads Three.js JSON files
     *
     * @param {string} url
     * @param onLoad
     * @param onProgress
     * @param onError
     */
    JSONLoader.prototype.load = function(url, onLoad, onProgress, onError) {
        var scope = this;

        this.jsonLoader.onLoadStart = function() {
            scope.manager.itemStart(url);
        };
        this.jsonLoader.onLoadProgress = function(e) {
            onProgress(e);
        };

        this.jsonLoader.load(url, function(geometry, material) {
            onLoad(geometry, material);
            scope.manager.itemEnd(url);
        });
    };

    return JSONLoader;
});