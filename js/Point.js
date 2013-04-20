function Point(i_x, i_y) {
    var that = this;
    that.x = i_x;
    that.y = i_y;

    that.add = function (p) {
        that.x += p.x;
        that.y += p.y;
    }

    that.scalarAdd = function(c){
        that.x += c;
        that.y += c; 
    }

    that.divide = function (p) {
        if (p.x != 0) {
            that.x /= p.x;
        }
        if (p.y != 0) {
            that.y /= p.y;
        }
    }

    that.scalarDivide = function (c) {
        if (c == 0) {
            return;
        }
        that.x /= c;
        that.y /= c;
    }

    that.multiply = function(p){
        that.x *= p.x;
        that.y *= p.y; 
    }

    that.scalarMultiply = function (c) {
        that.x *= c;
        that.y *= c;
    }
}