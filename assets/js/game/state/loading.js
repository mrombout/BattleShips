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
        console.log('LOADING', 'Progress ' + url + ' (' + numLoaded + '/' + numTotal + ')');
    };

    Loading.prototype.onLoadingManagerLoad = function() {
        console.log('LOADING', 'Finished', assets);
        setTimeout(function() {
            game.setState(lobbyState);
        }, 500);
    };

    Loading.prototype.onLoadingManagerError = function() {
        console.error('LOADING', 'Error');
    };

    Loading.prototype.startLoading = function() {
        console.info('LOADING', 'Start', assets.config);

        this.loadTextures();
        this.loadGeometries();
        this.loadAudio();
    };

    Loading.prototype.loadTextures = function() {
        this.loadType(assets.config.textures, assets.textures, this.textureLoader);
    };

    Loading.prototype.loadGeometries = function() {
        this.loadType(assets.config.geometries, assets.geometries, this.jsonLoader, function(name, args) {
            var materials = args[1];
            if(materials) {
                assets.materials[name] = {};
                for(var key in materials) {
                    if(materials.hasOwnProperty(key)) {
                        var material = materials[key];
                        assets.materials[name][material.name] = material;
                    }
                }
            }
        });
    };

    Loading.prototype.loadAudio = function() {
        this.loadType(assets.config.audio, assets.audio, this.audioLoader);
    };

    Loading.prototype.loadType = function(config, target, loader, callback) {
        for(var key in config) {
            if(config.hasOwnProperty(key)) {
                var typeConfig = config[key];
                loader.load(typeConfig.url, (function(key, typeConfig) {
                    return function(loadedType, material) {
                        for(var prop in typeConfig) {
                            if(typeConfig.hasOwnProperty(prop) && prop !== 'url') {
                                loadedType[prop] = typeConfig[prop];
                            }
                        }

                        target[key] = loadedType;
                        if(callback) callback(key, arguments);
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
