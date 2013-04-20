/// <reference path="Point.js" />
/// <reference path="Planet.js" />
/// <reference path="Entity.js" />
/// <reference path="Fuel.js" />
/// <reference path="Constants.js" />

function Rocket(i_mass , i_engine) {
    var that = this;
    that.skeletonMass = i_mass;
    that.engine = i_engine;

    that.updateMass = function () {
        that.setMass(that.skeletonMass + that.engine.getMass());
    }

    that.updateMass();

    that.nextStep = function (planet) {
        that.updateMass();
        var resultant = new Point(0, -1);
        resultant.scalarMultiply(planet.getGravity(that.mass, that.position.y));
        resultant.add(that.engine.getForce());
        that.applyForce(resultant);
    }
}

Rocket.prototype = new Entity();