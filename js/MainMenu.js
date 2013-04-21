

function MainMenu(i_parent) {
    var that = this;
    that.parent = i_parent;

    that.mustQuit = false;

    that.setUp = function () {
		that.mustQuit = false;
        that.parent.data.canvasContext.drawImage(that.parent.data.images.MenuBG, 0, 0);
        that.parent.data.canvasContext.drawImage(that.parent.data.images.logo, 360, 150);
    }

    that.nextStep = function () {
        if (that.mustQuit) {
            return "introduction";
        }
        else
        {
            return -1;
        }
    };

    that.pointerDown = function (evt)
    {
        
    }

    that.pointerUp = function (evt) {
        that.mustQuit = true;
    }




}