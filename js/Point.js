function Point(i_x, i_y) {
    var that = this;
    that.x = i_x;
    that.y = i_y;

    that.add = function (p) {
        that.x += p.x;
        that.y += p.y;
    }

    that.divide = function (p) {
        that.x /= p.x;
        that.y /= p.y;
    }

    that.scalarDivide = function (c) {
        that.x /= c;
        that.y /= c;
    }
}