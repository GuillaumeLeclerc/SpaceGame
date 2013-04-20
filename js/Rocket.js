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
        that.applyForce(resultant,timeStep);
    }
}