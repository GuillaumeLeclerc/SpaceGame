/// <reference path="Point.js" />
/**/


function Fuel(amount_,fuelEfficiency_,mass_value_) {
    var that = this;
    that.amount = amount_;
    that.massValue =  mass_value_;

    /*that.fuelEfficiency = fuelEfficiency_;
    */
    that.fuelEfficiency = 1;


    that.getEnergy = function (fuelConsumption_) {
        that.amount -= fuelConsumption_;
        return that.fuelEfficiency * fuelConsumption_;
    }

    that.getMass = function () {
        return that.mass_value_ * that.amount;
    }



}