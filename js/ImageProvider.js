


function ImageProvider(iUrl , iCallback) {
    var me = this;
    this.Url = iUrl;
    this.callback = iCallback;
    this.loaded = false;
    this.base = new Image();
    this.base.onload = function () {
        me.loaded = true;
        me.callback();
    }
    this.base.src = iUrl;
}