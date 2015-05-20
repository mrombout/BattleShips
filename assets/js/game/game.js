define(['three', 'container', 'renderer', 'scene', 'stats', 'shader!skydome.vert', 'shader!skydome.frag'], function(THREE, container, renderer, scene, stats, skydomeVert, skydomeFrag) {
    var game = {
        init: function() {
            game.createCamera();
            game.createControls();
            game.createLight();
            game.createSkydome();
            game.createGrid();

            game.createRaycaster();

            game.createWater();

            game.loadBattleship();

            game.mouse = new THREE.Vector2();
            game.mouse3d = new THREE.Vector3();
            game.INTERSECTED;

            game.projector = new THREE.Projector();

            document.addEventListener('mousemove', game.onDocumentMouseMove, false);
            window.addEventListener('resize', game.onWindowResize, false);
            //container.addEventListener('mousedown', game.onMouseDown, false);
            //container.addEventListener('mouseup', game.onMouseUp, false);
        },
        onDocumentMouseMove: function(e) {
            e.preventDefault();

            // 2d mouse
            game.mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
            game.mouse.y = - ( event.clientY / window.innerHeight) * 2 + 1;

            // 3d mouse
            var pos = new THREE.Vector3(0, 0, 0);
            var pMouse = new THREE.Vector3(
                game.mouse.x,
                game.mouse.y,
                1
            );

            game.projector.unprojectVector(pMouse, game.camera);

            var cam = game.camera.position;
            var m = pMouse.y / (pMouse.y - cam.y);

            game.mouse3d.x = pMouse.x + ( cam.x - pMouse.x ) * m;
            game.mouse3d.y = 0;
            game.mouse3d.z = pMouse.z + ( cam.z - pMouse.z ) * m;

            if(game.selectedBoat) {
                game.selectedBoat.position.x = game.mouse3d.x;
                game.selectedBoat.position.z = game.mouse3d.z;
            }
        },
        onWindowResize: function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        },
        onMouseDown: function(e) {
            if(e.button === 0) {
                game.raycaster.setFromCamera(game.mouse, game.camera);
                var intersects = game.raycaster.intersectObjects(scene.children);
                if(intersects.length > 0) {
                    game.selectedBoat = intersects[0].object;

                    game.controls.enabled = false;
                }
            }
        },
        onMouseUp: function() {
            game.controls.enabled = true;
            game.selectedBoat = null;
        },
        createCamera: function() {
            game.camera = new THREE.PerspectiveCamera(
                35,         // Field of view
                800 / 600,  // Aspect ratio
                1,          // Near
                3000000     // Far
            );
            game.camera.position.set(-15, 10, 10);
            game.camera.lookAt(scene.position);
        },
        createControls: function() {
            game.controls = new THREE.TrackballControls(game.camera);
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
        createGround: function() {
            var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
            var groundMat = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, specular: 0x050505 });
            groundMat.color.setHSL(0.095, 1, 0.75);

            var ground = new THREE.Mesh(groundGeo, groundMat);
            ground.rotation.x = -Math.PI/2;
            ground.position.y = -33;
            scene.add(ground);
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
            scene.add( line );
        },
        createRaycaster: function() {
            game.raycaster = new THREE.Raycaster();
        },
        createBoard: function() {
            var geometry = new THREE.BoxGeometry(5, 1, 5);

            for(var x = 0; x < 10; x++) {
                for(var y = 0; y < 10; y++) {
                    var material = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.translateX(5 * x);
                    mesh.translateZ(5 * y);
                    mesh.translateY(2);
                    scene.add(mesh);
                }
            }
        },
        createWater: function() {
            var waterNormals = new THREE.ImageUtils.loadTexture('assets/texture/waternormals.jpg');
            waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

            game.water = new THREE.Water(renderer, game.camera, scene, {
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
        loadBattleship: function() {
            var loader = new THREE.JSONLoader();

            loader.load('assets/models/battleship.json', function(geometry) {
                var material = new THREE.MeshLambertMaterial({ color: 0xDDFFDD });
                var mesh = new THREE.Mesh(geometry, material);

                mesh.position.y = 1;

                scene.add(mesh);
            })
        },
        render: function() {
            window.requestAnimationFrame(game.render);

            // render water
            game.water.material.uniforms.time.value += 1.0 / 60.0;
            game.water.render();

            // find selected
            game.raycaster.setFromCamera(game.mouse, game.camera);
            var intersects = game.raycaster.intersectObjects(scene.children);
            if(intersects.length > 0) {
                if(game.INTERSECTED != intersects[0].object && intersects[0].object.setHex) {
                    if(game.INTERSECTED) game.INTERSECTED.material.emissive.setHex(game.INTERSECTED.currentHex);

                    game.INTERSECTED = intersects[0].object;
                    game.INTERSECTED.currentHex = game.INTERSECTED.material.emissive.getHex();
                    game.INTERSECTED.material.emissive.setHex(0xFF0000);
                }
            } else {
                if ( game.INTERSECTED ) game.INTERSECTED.material.emissive.setHex( game.INTERSECTED.currentHex );
                game.INTERSECTED = null;
            }

            // update
            game.controls.update();

            stats.begin();
            renderer.render(scene, game.camera);
            stats.end();
        }
    };

    return game;
});