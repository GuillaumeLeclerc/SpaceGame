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

    that.applyForce = function (f,timeStep) {
        that.accelereation = f.scalarDivide(that.mass);
        that.speed.add(that.accelereation*timeStep);
    }

    that.move = function () {
        that.position.add(that.speed);
    }
}
