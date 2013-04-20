/// <reference path="Point.js" />


/**
represent a basic physic entity
*/
function Entity() {
    // Do attributes and methods
    var that = this;

    that.accelereation = new Point(0, 0);
    that.speed = new Point(0, 0);
    that.position = new Point(0, 0);
    that.mass = 5;

    that.setMass = function(i_mass){
        that.mass = i_mass;
    }

    that.applyForce = function (f , timeStep) {
        f.scalarDivide(that.mass);
        that.accelereation = f;
        var changeSpeed = new Point(that.accelereation.x, that.accelereation.y);
        changeSpeed.scalarMultiply(timeStep);
        that.speed.add(changeSpeed);
        var changingPosition = new Point(that.speed.x , that.speed.y);
        changingPosition.scalarMultiply(timeStep);
        that.position.add(changingPosition);
    }

}
