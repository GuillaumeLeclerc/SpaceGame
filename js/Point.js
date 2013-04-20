function Point(x, y) {
    var that = this;
    that.x = x;
    that.y = y;

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