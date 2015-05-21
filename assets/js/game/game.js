"use strict";

define(['three', 'container', 'renderer', 'scene', 'camera', 'stats', 'shader!skydome.vert', 'shader!skydome.frag', 'view/hud'], function(THREE, container, renderer, scene, camera, stats, skydomeVert, skydomeFrag, hudView) {
    var game = {
        init: function() {
            game.createControls();
            game.createLight();
            game.createSkydome();
            game.createGrid();

            game.createRaycaster();

            game.createWater();

            game.createShips();

            hudView.show();

            window.addEventListener('resize', game.onWindowResize, false);
        },
        onWindowResize: function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        },
        createControls: function() {
            game.controls = new THREE.TrackballControls(camera, renderer.domElement);
            game.controls.rotateSpeed = 2.0;
            game.controls.zoomSpeed = 1.2;
            game.controls.panSpeed = 0.8;

            game.controls.noZoom = false;
            game.controls.noPan = false;

            game.controls.staticMoving = true;
            game.controls.dynamicDampingFactor = 0.3;

            game.controls.keys = [ 65, 83, 68 ];
        },
        createLight: function() {
            game.hemiLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
            game.hemiLight.color.setHSL(0.6, 1, 0.6);
            game.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            game.hemiLight.position.set(-1, 1, -1);
            scene.add(game.hemiLight);
        },
        createSkydome: function() {
            var uniforms = {
                topColor: 	 { type: "c", value: new THREE.Color( 0x0077ff ) },
                bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
                offset:		 { type: "f", value: 33 },
                exponent:	 { type: "f", value: 0.6 }
            }
            uniforms.topColor.value.copy(game.hemiLight.color );

            scene.fog.color.copy( uniforms.bottomColor.value );

            var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
            var skyMat = new THREE.ShaderMaterial( { vertexShader: skydomeVert.value, fragmentShader: skydomeFrag.value, uniforms: uniforms, side: THREE.BackSide } );

            var sky = new THREE.Mesh( skyGeo, skyMat );
            scene.add( sky );
        },
        createGrid: function() {
            // create grid
            var size = 100, step = 20;

            var geometry = new THREE.Geometry();
            var material = new THREE.LineBasicMaterial( { color: 0xcccccc, opacity: 0.2 } );

            for ( var i = - size; i <= size; i += step ) {

                geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
                geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

                geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
                geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

            }

            var line = new THREE.Line( geometry, material, THREE.LinePieces );
            line.position.y = 1;
            scene.add(line);

            // create supported plane
            var planeGeometry = new THREE.PlaneBufferGeometry(200, 200);
            planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

            var planeMesh = new THREE.Mesh(planeGeometry);
            planeMesh.visible = false;
            planeMesh.name = "dank";

            scene.add(planeMesh);
        },
        createRaycaster: function() {
            game.raycaster = new THREE.Raycaster();
        },
        createWater: function() {
            var waterNormals = new THREE.ImageUtils.loadTexture('assets/texture/waternormals.jpg');
            waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

            game.water = new THREE.Water(renderer, camera, scene, {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: waterNormals,
                alpha: 1.0,
                sunColor: 0xFFFFFF,
                waterColor: 0x001E0F,
                distortionScale: 50.0
            });

            var mirrorMesh = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(2000 * 500, 2000 * 500),
                game.water.material
            );
            mirrorMesh.add(game.water);
            mirrorMesh.rotation.x = -Math.PI * 0.5;
            scene.add(mirrorMesh);
        },
        createShips: function() {
            var aircraftCarrier = game.createShip(0, 0, 5);
            var battleship = game.createShip(2, 0, 4);
            var submarine = game.createShip(4, 0, 3);
            var destroyer = game.createShip(6, 0, 3);
            var patrolBoat = game.createShip(8, 0, 2);
        },
        createShip: function(x, y, size) {
            var geometry = new THREE.BoxGeometry(20, 10, size * 20);
            geometry.applyMatrix(new THREE.Matrix4().makeTranslation(10, 0, 10 * size));
            var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
            var mesh = new THREE.Mesh(geometry, material);

            var vec2 = game.gridToWorld(new THREE.Vector2(x, y));
            mesh.position.x = vec2.x;
            mesh.position.z = vec2.y;

            scene.add(mesh);
        },
        loadBattleship: function() {
            var loader = new THREE.JSONLoader();

            loader.load('assets/models/battleship.json', function(geometry) {
                var material = new THREE.MeshLambertMaterial({ color: 0xDDFFDD });
                var mesh = new THREE.Mesh(geometry, material);

                mesh.position.y = 1;

                scene.add(mesh);
            })
        },
        worldToGrid: function(vec2) {

        },
        gridToWorld: function(vec) {
            var newVec = new THREE.Vector2();

            // normalize
            newVec.x = 4 * 20;
            newVec.y = -5 * 20;

            // to position
            newVec.x -= vec.x * 20;
            newVec.y -= vec.y * 20;

            return newVec;
        },
        render: function() {
            window.requestAnimationFrame(game.render);

            // render water
            game.water.material.uniforms.time.value += 1.0 / 60.0;
            game.water.render();

            // update
            game.controls.update();

            stats.begin();
            renderer.render(scene, camera);
            stats.end();
        }
    };

    return game;
});