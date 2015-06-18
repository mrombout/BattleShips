define(['three'], function(THREE) {

    /**
     * Represents a Ship in 3D space.
     *
     * @param model
     * @constructor
     */
    var Ship3D = function(model) {
        this.model = model;
        this.parent = new THREE.Object3D();
        this.parent.model = this;

        if(model.isVertical) {
            this.rotateToVertical();
        } else {
            this.rotateToHorizontal();
        }

        this.clock = new THREE.Clock(true);
        this.clock.start();

        this.invalid = true;
    };

    /**
     * Updates the ship.
     */
    Ship3D.prototype.update = function() {
        // make the ship gently rock around
        this.clock.getElapsedTime();
        this.parent.rotation.x = Math.sin(this.clock.elapsedTime) / 48;
        this.parent.rotation.z = Math.sin(this.clock.elapsedTime) / 48;
        this.parent.rotation.y = -Math.cos(this.clock.elapsedTime) / 48;
        if(this.model.isVertical) {
            this.parent.rotation.y += -Math.PI / 2;
        }
    };

    /**
     * Adds an object to this ships parent object.
     *
     * @param object
     */
    Ship3D.prototype.addObject = function(object) {
        this.parent.add(object);
    };

    /**
     * Returns the parent object of this ship.
     *
     * @returns {THREE.Object3D|*}
     */
    Ship3D.prototype.getObject = function() {
        return this.parent;
    };

    /**
     * Toggles the ship between a vertical and horizontal position.
     */
    Ship3D.prototype.rotate = function() {
        if(this.model.isVertical) {
            this.rotateToHorizontal();
        } else {
            this.rotateToVertical();
        }
        this.model.isVertical = !this.model.isVertical;
    };

    /**
     * Rotates the ship to a horizontal position
     */
    Ship3D.prototype.rotateToHorizontal = function() {
        console.log('SHIP3D', 'Rotating to horizontal position', this);
        this.getObject().applyMatrix(new THREE.Matrix4().makeTranslation(20, 20, 20));
        this.getObject().rotation.y = 0;
    };

    /**
     * Rotates the ship to a vertical position
     */
    Ship3D.prototype.rotateToVertical = function() {
        console.log('SHIP3D', 'Rotating to vertical position', this);
        this.getObject().applyMatrix(new THREE.Matrix4().makeTranslation(-20, -20, -20));
        this.getObject().rotation.y = -Math.PI / 2;
    };

    /**
     * Marks this ship as invalid, changing its appearance.
     *
     * @param invalid
     */
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

    /**
     * Returns whether this ship is invalid.
     *
     * @returns {boolean}
     */
    Ship3D.prototype.isInvalid = function() {
        return this.invalid;
    };

    return Ship3D;
});