

function MainMenu(i_parent) {
    var that = this;
    that.parent = i_parent;


    that.setUp = function () {
        that.parent.data.context.drawImage(that.parent.data.images.MenuBG, 0, 0);
    }




}