define(['three', 'spe', 'assets', 'entity/Ship3D', 'factory/ship'], function(THREE, SPE, assets, Ship3D, shipFactory) {
    var Board3D = function(model) {
        this.model = model;
        this.parent = new THREE.Object3D();

        this.ships = [];
        if(model.ships) {
            for(var key in model.ships) {
                if(model.ships.hasOwnProperty(key)) {
                    var ship = model.ships[key];
                    var ship3d = shipFactory.create(ship);

                    ship3d.getObject().position.copy(this.gridToWorld(ship.startCell));

                    this.parent.add(ship3d.getObject());
                    this.ships.push(ship3d);
                }
            }
        }

        this.createGrid();
        this.createParticles();
    };

    Board3D.prototype.createGrid = function() {
        // create grid
        var size = 100, step = 20;

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({color: 0xcccccc,opacity: 0.2});

        for ( var i = -size; i <= size; i += step ) {
            geometry.vertices.push(new THREE.Vector3(-size, 0, i));
            geometry.vertices.push(new THREE.Vector3(size, 0, i));

            geometry.vertices.push(new THREE.Vector3(i, 0, -size));
            geometry.vertices.push(new THREE.Vector3(i, 0, size));
        }

        var line = new THREE.Line(geometry, material, THREE.LinePieces);
        line.position.y = 1;
        this.parent.add(line);

        // create supporting plane
        var planeGeometry = new THREE.PlaneBufferGeometry(200, 200);
        planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        this.planeMesh = new THREE.Mesh(planeGeometry);
        this.planeMesh.visible = false;
        this.planeMesh.name = "dank";

        // create tiles
        for(var i = -size; i < size; i += step) {
            for(var x = -size; x < size; x += step) {
                var tileGeometry = new THREE.BoxGeometry(20, 20, 20);
                tileGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(10, 0, 10));
                var tileMesh = new THREE.Mesh(tileGeometry);
                tileMesh.position.x = i;
                tileMesh.position.z = x;
                tileMesh.visible = false;
                this.parent.add(tileMesh);
            }
        }

        this.parent.add(this.planeMesh);
    };

    Board3D.prototype.createParticles = function() {
        // create particle group
        this.particleGroup = new SPE.Group({
            texture: assets.textures.smoke_particle,
            maxAge: 2,
            blending: THREE.NormalBlending
        });

        // create a single emitter
        var particleEmitter = new SPE.Emitter({
            type: 'cube',

            position: new THREE.Vector3(0, 0, 0),
            positionSpread: new THREE.Vector3(2, 0, 2),

            velocity: new THREE.Vector3(0, 55, 0),
            velocitySpread: new THREE.Vector3(20, 0, 20),

            acceleration: new THREE.Vector3(0, -5, 0),

            angleStart: 0,
            angleStartSpread: Math.PI,
            angleEnd: 0,
            angleEndSpread: Math.PI,

            sizeStart: 1,
            sizeEnd: 128,

            opacityStart: 1,
            opacityEnd: 0.5,

            colorStart: new THREE.Color(0.4, 0.4, 0.4),
            colorEnd: new THREE.Color(0.8, 0.8, 0.8),

            particlesPerSecond: 200
        });

        // add the emitter to the group
        this.particleGroup.addEmitter(particleEmitter);

        // add the particle group to the scene so it can be drawn
        this.parent.add(this.particleGroup.mesh);
    };

    Board3D.prototype.update = function(clock) {
        for(var key in this.ships) {
            if(this.ships.hasOwnProperty(key)) {
                var ship = this.ships[key];
                ship.update();
            }
        }

        this.particleGroup.tick(0.016);
    };

    Board3D.prototype.placeShip = function(ship) {
        var coords = this.worldToGrid(ship.getObject().position);

        this.ships.push(ship);
        this.model.placeShip(coords, ship.model);
    };

    Board3D.prototype.isWithinBounds = function(ship) {
        var coords = this.worldToGrid(ship.getObject().position);
        var length = ship.model.length;

        // horizontal
        if(ship.getObject().rotation.y === 0) {
            return coords.x + length <= 10;
        } else { // vertical
            return coords.y + length <= 10;
        }
    };

    Board3D.prototype.isOverlapping = function(ship) {
        var length = ship.model.length;
        var vec2 = this.worldToGrid(ship.getObject().position);

        return this.model.isOverlapping(vec2.x, vec2.y, length, ship.model.isVertical);
    };

    Board3D.prototype.gridToWorld = function(vec) {
        var newVec = new THREE.Vector3();

        // normalize
        newVec.x = -20 * 5 + 10;
        newVec.z = -20 * 5 + 10;

        // apply coords
        newVec.x += vec.x * 20;
        newVec.z += vec.y * 20;

        return newVec;
    };

    Board3D.prototype.worldToGrid = function(vec3) {
        var convertorVec = new THREE.Vector2(vec3.x, vec3.z);
        convertorVec.divideScalar(20).floor().addScalar(5);

        return convertorVec;
    };

    Board3D.prototype.getObject = function() {
        return this.parent;
    };

    Board3D.prototype.getSupport = function() {
        return this.planeMesh;
    }

    return Board3D;
});