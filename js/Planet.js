function Planet(i_mass, i_radius) {
    var that = this;
    that.mass = i_mass;
    that.radius = i_radius;
    that.lastGravity = 0;

    that.getGravity = function(o_mass , o_height){
        that.lastGravity = Constants.bigG * that.mass * o_mass / Math.pow(that.radius + o_height, 2);
        return that.lastGravity;
    }
}

window.Constants = {
    bigG: 6.673E-11
};