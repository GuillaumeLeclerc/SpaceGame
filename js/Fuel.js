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
        if (that.amount == 0) {
            return 0;
        }
        that.amount -= fuelConsumption_;
        usedFuel = fuelConsumption_;
        if (that.amount < 0) {
            usedFuel = fuelConsumption_ - that.amount;
            that.amount = 0;

        }


        return that.fuelEfficiency * usedFuel;
    }

    that.getMass = function () {
        if (that.amount == 0) {
            return 0;
        }
        return that.massValue * that.amount;
    }



}