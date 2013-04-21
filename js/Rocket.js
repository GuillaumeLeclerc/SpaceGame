/// <reference path="Point.js" />
/// <reference path="Planet.js" />
/// <reference path="Entity.js" />
/// <reference path="Fuel.js" />
/// <reference path="Constants.js" />

function Rocket(i_mass , i_engine) {
    var that = this;
    that.skeletonMass = i_mass;
    that.engine = i_engine;
    
    that.accelereation = new Point(0, 0);
    that.speed = new Point(0, 0);
    that.position = new Point(0, 0);
    that.mass = 5;

    that.suposedSize = new Point(100, 180);
    that.displaySize = new Point(80, 150);
    that.screenPosition = new Point(0.5 * (that.width - that.displaySize), 30);
    that.offset = 0;

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

    that.updateMass = function () {
        that.setMass(that.skeletonMass + that.engine.getMass());
    }

    that.updateMass();

    that.nextStep = function (planet,timeStep) {
        that.updateMass();
        var resultant = new Point(0, -1);
        resultant.scalarMultiply(planet.getGravity(that.mass, that.position.y));
        resultant.add(that.engine.getForce(timeStep));
        that.applyForce(resultant, timeStep);
        if (that.screenPosition.y < 30) {
            that.screenPosition.y+=0.3;
        }
    }

    that.getCoordInCoordinateSystemInner = function (c) {
        var scaleX = that.displaySize.x / that.suposedSize.x;
        var scaleY = that.displaySize.y / that.suposedSize.y;

        return new Point(c.x * scaleX, c.y * scaleY);
    }

    that.getCoordInCoordinateSystem = function (c , height , dHeight) {
        var result = that.getCoordInCoordinateSystemInner(c);
        var base = that.getCoordInCoordinateSystemInner(that.position);
        return new Point(result.x + that.screenPosition.x, height - (result.y - base.y + that.screenPosition.y) - dHeight);
    }

}