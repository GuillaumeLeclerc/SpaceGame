


function ImageProvider(iUrl , iCallback) {
    var me = this;
    this.Url = iUrl;
    this.callback = iCallback;
    this.Loaded = false;
    this.base = new Image();
    this.base.onload = function () {
        me.Loaded = true;
        me.callback();
    }
    this.base.src = iUrl;
}