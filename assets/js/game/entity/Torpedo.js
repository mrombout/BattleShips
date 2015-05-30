define(['three'], function(THREE) {
    var Torpedo = function(origin, target) {
        this.parent = new THREE.Object3D();

        this.origin = new THREE.Vector3().copy(origin.position);
        this.target = new THREE.Vector3().copy(target.position);

        this.gravity = 9.81;
        this.velocity = 40;

        this.createShell();
        this.createEmitter();
    };

    Torpedo.prototype.createShell = function() {
        var material = new THREE.MeshLambertMaterial();
        var geometry = new THREE.SphereGeometry(5, 32, 32);
        var mesh = new THREE.Mesh(geometry, material);

        this.parent.add(mesh);
    };

    Torpedo.prototype.createEmitter = function() {
        // TODO Create smoke and fire emitter
    };

    Torpedo.prototype.shoot = function() {
        this.direction = this.target.sub(this.origin);
        this.distance = this.target.distanceTo(this.origin);
        this.isShot = true;
        this.travel = 0;
    };

    Torpedo.prototype.update = function(delta) {
        if(this.isShot) {
            var curDirection = this.direction.clone();
            this.parent.position.add(curDirection.multiplyScalar(1).multiplyScalar(delta));
            console.log('updating position', delta);
            this.travel = this.origin.distanceTo(this.parent.position);
            this.parent.position.y = Math.sin(Math.PI * (this.travel / this.distance)) * 100;

            if(this.travel > this.distance) {
                this.explode();
            }
        }
    };

    Torpedo.prototype.explode = function() {
        console.log('BOOM!');
        this.isShot = false;
    };

    Torpedo.prototype.getObject = function() {
        return this.parent;
    };

    return Torpedo;
});