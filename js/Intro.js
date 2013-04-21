function Intro(i_parent) {
    var that = this;
    that.parent = i_parent;

    that.mustLeave = false;

    that.setUp = function () {
        that.parent.data.canvasContext.drawImage(that.parent.data.images.MenuBG, 0, 0);
        that.parent.data.canvasContext.drawImage(that.parent.data.images.introduction, 15, 15);
    }

    that.pointerUp = function(evt) {
        that.mustLeave = true;
    }

    that.pointerDown = function () {

    }

    that.nextStep = function () {
        if (that.mustLeave) {
            return "game";
        }
        else {
            return -1;
        }
    }

    
}