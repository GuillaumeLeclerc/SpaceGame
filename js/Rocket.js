/// <reference path="Point.js" />
/// <reference path="Entity.js" />
/// <reference path="Fuel.js" />



function Rocket(i_mass , i_engine) {
    var that = this;
    that.skeletonMass = 0;
    that.engine = i_engine;

    that.updateMass = function () {
        that.mass = that.skeletonMass + that.engine.getMass();
    }

    that.nextStep = function () {

    }







}

Rocket.prototype = new Entity();