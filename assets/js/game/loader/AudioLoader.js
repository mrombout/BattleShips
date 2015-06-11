define(['three', 'audioContext'], function(THREE, audioContext) {
    var AudioLoader = function(manager) {
        this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
    };

    AudioLoader.prototype.load = function(url, onLoad, onProgress, onError) {
        var scope = this;

        var loader = new THREE.XHRLoader(scope.manager);
        loader.setCrossOrigin(this.crossOrigin);
        loader.setResponseType('arraybuffer');
        loader.load(url, function(data) {
            scope.manager.itemStart(url);
            audioContext.decodeAudioData(data, function(buffer) {
                var audio = new THREE.Audio({
                    context: audioContext
                });
                audio.source.buffer = buffer;

                scope.manager.itemEnd(url);
                onLoad(audio);
            } );

        }, onProgress, onError);
    };

    return AudioLoader;
});