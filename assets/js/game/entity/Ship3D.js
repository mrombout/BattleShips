define(['three'], function(THREE) {
    var Ship3D = function(model) {
        this.model = model;
        this.parent = new THREE.Object3D();
        this.clock = new THREE.Clock(true);
        this.clock.start();
    };

    Ship3D.prototype.update = function() {
        this.clock.getElapsedTime();
        this.parent.rotation.x = Math.sin(this.clock.elapsedTime) / 48;
        this.parent.rotation.z = Math.sin(this.clock.elapsedTime) / 48;
        this.parent.rotation.y = -Math.cos(this.clock.elapsedTime) / 48;
        if(this.model.isVertical) {
            this.parent.rotation.y += -Math.PI / 2;
        }
    }

    Ship3D.prototype.addObject = function(object) {
        this.parent.add(object);
    };

    Ship3D.prototype.getObject = function() {
        return this.parent;
    };

    Ship3D.prototype.rotate = function() {
        if(this.model.isVertical) {
            console.log('SHIP3D', 'Rotating to horizontal position', this);
            this.getObject().applyMatrix(new THREE.Matrix4().makeTranslation(20, 20, 20));
            this.getObject().rotation.y = 0;
        } else {
            console.log('SHIP3D', 'Rotating to vertical position', this);
            this.getObject().applyMatrix(new THREE.Matrix4().makeTranslation(-20, -20, -20));
            this.getObject().rotation.y = -Math.PI / 2;
        }
        this.model.isVertical = !this.model.isVertical;
    };

    Ship3D.prototype.setInvalid = function(invalid) {
        this.invalid = invalid;
        if(invalid) {
            this.getObject().traverseVisible(function(object) {
                if(object.material) {
                    if(object.material.color) {
                        object.material.color.setRGB(1, 0, 0);
                    }
                    if(object.material.opacity) {
                        object.material.transparent = true;
                        object.material.opacity = 0.5;
                    }
                }
            });
        } else {
            this.getObject().traverseVisible(function(object) {
                if(object.material) {
                    if(object.material.color) {
                        object.material.color.setRGB(1, 1, 1);
                    }
                    if(object.material.opacity) {
                        object.material.transparent = false;
                        object.material.opacity = 1.0;
                    }
                }
            });
        }
    };

    Ship3D.prototype.isInvalid = function() {
        return this.invalid;
    }

    return Ship3D;
});