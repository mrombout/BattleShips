define(['three'], function(THREE) {
    var AudioLoader = function(manager) {
        this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
        this.audioContext = new ( window.AudioContext || window.webkitAudioContext )();
    };

    AudioLoader.prototype.load = function(url, onLoad, onProgress, onError) {
        var scope = this;

        var loader = new THREE.XHRLoader(scope.manager);
        loader.setCrossOrigin(this.crossOrigin);
        loader.setResponseType('arraybuffer');
        loader.load(url, function(data) {
            scope.manager.itemStart(url);
            scope.audioContext.decodeAudioData(data, function(buffer) {
                var audio = new THREE.Audio({
                    context: scope.audioContext
                });
                audio.source.buffer = buffer;

                scope.manager.itemEnd(url);
                onLoad(audio);
            } );

        }, onProgress, onError);
    }

    return AudioLoader;
});