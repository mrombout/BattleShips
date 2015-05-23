"use strict";

define(['state/State', 'renderer', 'assets', 'three', 'game', 'state/lobby', 'view/loading', 'loader/AudioLoader', 'loader/JSONLoader'], function(State, renderer, assets, THREE, game, lobbyState, loadingView, AudioLoader, JSONLoader) {
    var Loading = function() {
        State.call(this);

        this.init();
    };
    Loading.prototype = Object.create(State.prototype);
    Loading.prototype.constructor = Loading;

    Loading.prototype.init = function() {
        this.initLoadingManager();
        this.initLoaders();
    };

    Loading.prototype.initLoadingManager = function(){
        this.loadingManager = new THREE.LoadingManager();
        this.loadingManager.onProgress = this.onLoadingManagerProgress;
        this.loadingManager.onLoad = this.onLoadingManagerLoad;
        this.loadingManager.onError = this.onLoadingManagerError;
    };

    Loading.prototype.initLoaders = function() {
        this.audioLoader = new AudioLoader(this.loadingManager);
        this.jsonLoader = new JSONLoader(this.loadingManager);
        this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    };

    Loading.prototype.onLoadingManagerProgress = function(url, numLoaded, numTotal) {
        loadingView.setProgress(numLoaded / numTotal);
        console.log('Loaded ' + url + ' (' + numLoaded + '/' + numTotal + ')');
    };

    Loading.prototype.onLoadingManagerLoad = function() {
        console.log('FINISH!', assets);
        game.setState(lobbyState);
    };

    Loading.prototype.onLoadingManagerError = function() {
        console.log('Error!');
    };

    Loading.prototype.startLoading = function() {

        this.loadTextures();
        this.loadGeometries();
        this.loadAudio();
    };

    Loading.prototype.loadTextures = function() {
        this.loadType(assets.config.textures, assets.textures, this.textureLoader);
    };

    Loading.prototype.loadGeometries = function() {
        this.loadType(assets.config.geometries, assets.geometries, this.jsonLoader);
    };

    Loading.prototype.loadAudio = function() {
        this.loadType(assets.config.audio, assets.audio, this.audioLoader);
    };

    Loading.prototype.loadType = function(config, target, loader) {
        for(var key in config) {
            if(config.hasOwnProperty(key)) {
                var typeConfig = config[key];
                loader.load(typeConfig.url, (function(key, typeConfig) {
                    return function(loadedType) {
                        for(var prop in typeConfig) {
                            if(typeConfig.hasOwnProperty(prop) && prop !== 'url') {
                                loadedType[prop] = typeConfig[prop];
                            }
                        }

                        target[key] = loadedType;
                    };
                })(key, typeConfig));
            }
        }
    };

    Loading.prototype.show = function() {
        loadingView.show();
        this.startLoading();
    };

    Loading.prototype.hide = function() {
        loadingView.hide();
    };

    Loading.prototype.update = function() {

    };

    Loading.prototype.render = function() {
        renderer.render();
    };

    return new Loading();
});
