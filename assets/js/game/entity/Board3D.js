define(['three'], function(THREE) {
    var Board3D = function(model) {
        this.model = model;
        this.parent = new THREE.Object3D();
        this.ships = [];

        this.createGrid();
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

        var planeMesh = new THREE.Mesh(planeGeometry);
        planeMesh.visible = false;
        planeMesh.name = "dank";

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

        this.parent.add(planeMesh);
    };

    Board3D.prototype.update = function() {
        for(var key in this.ships) {
            if(this.ships.hasOwnProperty(key)) {
                var ship = this.ships[key];
                ship.update();
            }
        }
    };

    Board3D.prototype.placeShip = function(ship) {
        var coords = this.worldToGrid(ship.getObject().position);

        this.ships.push(ship);
        this.model.placeShip(coords, ship.model);
    };

    Board3D.prototype.isWithinBounds = function(ship) {
        var box3 = new THREE.Box3();
        box3.setFromObject(ship);

        // TODO Rewrite, we have access to the model now

        var coords = this.worldToGrid(ship.position);
        var size = box3.size();

        // horizontal
        if(ship.rotation.y === 0) {
            var length = Math.floor(size.x / 20);
            return coords.x + length <= 10;
        } else { // vertical
            var length = Math.floor(size.z / 20);
            return coords.y + length <= 10;
        }
    };

    Board3D.prototype.isOverlapping = function(ship) {
        var length = ship.model.length;
        var vec2 = this.worldToGrid(ship.getObject().position);

        return this.model.isOverlapping(vec2.x, vec2.y, length, ship.model.isVertical);
    };

    Board3D.prototype.gridToWorld = function(vec) {
        var newVec = new THREE.Vector2();

        // normalize
        newVec.x = -20 * 5;
        newVec.y = -20 * 5;

        // apply coords
        newVec.x += vec.y * 20;
        newVec.y += vec.x * 20;

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

    return Board3D;
});