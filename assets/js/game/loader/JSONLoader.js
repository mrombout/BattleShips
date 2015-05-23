define(['three'], function(THREE) {
    var JSONLoader = function(manager) {
        this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
        this.jsonLoader = new THREE.JSONLoader();
    };

    JSONLoader.prototype.load = function(url, onLoad, onProgress, onError) {
        var scope = this;

        this.jsonLoader.onLoadStart = function() {
            scope.manager.itemStart(url);
        };
        this.jsonLoader.onLoadProgress = function(e) {
            onProgress(e);
        };

        this.jsonLoader.load(url, function(geometry) {
            onLoad(geometry);
            scope.manager.itemEnd(url);
        });
    }

    return JSONLoader;
});