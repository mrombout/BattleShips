define(['three'], function(THREE) {
    var Board3D = function(model) {
        this.model = model;
        this.parent = new THREE.Object3D();

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

    Board3D.prototype.placeShip = function(ship) {
        var coords = this.worldToGrid(ship.getObject().position);

        this.model.placeShip(coords);
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