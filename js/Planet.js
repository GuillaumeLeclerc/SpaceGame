function Planet(i_mass, i_radius) {
    var that = this;
    that.mass = i_mass;
    that.radius = i_radius;

    that.getGravity = function(o_mass , o_height){
        return Constants.bigG * that.mass * o_mass / Math.pow(that.radius + o_height, 2);
    }
}

window.Constants = {
    bigG: 6.673E-11
};