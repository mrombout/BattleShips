"use strict";

define([
    'state/State',
    'assets',
    'three',
    'game',
    'state/lobby',
    'view/loading',
    'loader/AudioLoader',
    'loader/JSONLoader',
    'audioContext',
    'state/Done',
    'state/Setup',
    'state/Started',
    'state/State'
], function(
    State,
    assets,
    THREE,
    game,
    lobbyState,
    loadingView,
    AudioLoader,
    JSONLoader,
    audioContext) {
    /**
     * State when the game is still loading assets. This is the first state the
     * player is in and is used to load all the assets used in the game. It
     * will automatically continue to the Lobby state when all assets are
     * loaded.
     *
     * @constructor
     */
    var Loading = function() {
        State.call(this);

        this.init();
    };
    Loading.prototype = Object.create(State.prototype);
    Loading.prototype.constructor = Loading;

    /**
     * Initializes the loading managers and all the loaders required.
     */
    Loading.prototype.init = function() {
        this.initLoadingManager();
        this.initLoaders();
    };

    /**
     * Initializes the loading manager and registers any listeners.
     */
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
        console.info('LOADING', 'Finished', assets);
        setTimeout(function() {
            assets.audio.ocean.setLoop(true);
            game.setState(lobbyState);
        }, 500);
    };

    Loading.prototype.onLoadingManagerError = function() {
        console.error('LOADING', 'Error');
    };

    /**
     * Starts loading all required assets from the assets file.
     */
    Loading.prototype.startLoading = function() {
        console.info('LOADING', 'Start', assets.config);

        this.loadTextures();
        this.loadGeometries();
        this.loadAudio();
    };

    /**
     * Loads all textures and populates assets.textures with the loaded
     * textures.
     */
    Loading.prototype.loadTextures = function() {
        this.loadType(assets.config.textures, assets.textures, this.textureLoader);
    };

    /**
     * Loads all geometries and populates assets.geometries with the loaded
     * geometries. Any materials attached to the geometries will also be
     * loaded and add to assets.materials[geometryname][materialname].
     */
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

    /**
     * Loads all audio and populates assets.audio with the loaded and decoded
     * audio files.
     */
    Loading.prototype.loadAudio = function() {
        if(!audioContext) {
            console.warn('AudioContext not supporting, skip loading audio');
            return;
        }

        this.loadType(assets.config.audio, assets.audio, this.audioLoader);
    };

    /**
     * Loads a type of asset from the given configuration and populates the
     * loaded resources in the given target variable using the loader provided
     * by the caller. When the loading is finished the provided callback will
     * be called.
     *
     * @param config
     * @param target
     * @param loader
     * @param callback
     */
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

    Loading.prototype.render = function() {
        // nothing to render
    };

    return new Loading();
});
