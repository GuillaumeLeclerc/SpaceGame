/// <reference path="Point.js" />

function Engine(i_mass , i_fuel , i_efficiency , i_fuelConsumption) {
    var that = this;

    that.thrusterEnergy = 1;

    that.fuel = i_fuel;
    that.efficiency = i_efficiency;
    that.mass = i_mass;
    that.fuelConsumption = i_fuelConsumption;

    that.leftOn = false;
    that.rightOn = false;
    that.rearOn = false;

    that.getMass = function () {
        return that.mass + that.fuel.getMass();
    }

    that.getForce = function () {
        var tempLeft = new Point(1, 0);
        var tempRight = new Point(-1, 0);
        var tempRear = new Point(0, 1);
        tempLeft.scalarMultiply(that.thrusterEnergy * that.leftOn);
        tempRight.scalarMultiply(that.thrusterEnergy * that.rightOn);
        if (that.rearOn)
        {
            tempRear.multiply(that.fuel.getEnergy(that.fuelConsumption));
        }
        else {
            tempRear = new Point(0, 0);
        }
        var final = tempLeft;
        final.add(tempRight);
        final.add(tempRear);
        return final;
    }




}