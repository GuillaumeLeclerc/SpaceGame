
function Particule(iX, iY) {
    var me = this;
    this.Position = new Point(iX, iY);
    this.Vitesse = new Point(0, 0);
    this.Acceleration = new Point(0, 0);
    this.Life = 0; 
    this.LifeTime = 0; //Means Infinite
    this.size = 10;
    this.MustDie = function () {
        if (me.LifeTime == 0)
            return true;
        return false;
    }
}

function Star(iX, iY, sX, sY, distance, color) { //partial class Particule
    var me = this;
    this.Data = new Particule(iX, iY);
    this.Type = "Star";
    this.spaceObject = 0;
    this.Data.LifeTime = 1000 * distance;
    this.Data.Vitesse.x = sX / distance / 5;
    this.Data.Vitesse.y = sY / distance / 5;
    this.Data.size = 5 / distance;
    this.Data.distance = distance;
    this.Prerendered = document.createElement("canvas");
    this.Prerendered.width = 2 * this.Data.size + 1;
    this.Prerendered.height = 2 * this.Data.size + 1;
    var ctx = this.Prerendered.getContext("2d");
    ctx.translate(Math.round(this.Data.size), Math.round(this.Data.size));
    var degrade = ctx.createRadialGradient(0, 0, 0, 0, 0, this.Data.size);
    degrade.addColorStop(0, "rgba(255,255,255,1)");
    degrade.addColorStop(0.5, "rgba(" + color.R + "," + color.G + "," + color.B + ",0)");
    ctx.beginPath();

    for (var i = 0; i < 2; i += 0.25) {
        ctx.moveTo(0, 0);
        ctx.lineTo(this.Data.size * Math.cos(i * Math.PI), this.Data.size * Math.sin(i * Math.PI));
    }
    ctx.closePath();
    ctx.strokeStyle = degrade;
    ctx.stroke();


    this.Trace = function (ctx , p , ration) {
        //ctx.globalAlpha = Math.sin(Math.PI * this.Data.Life / this.Data.LifeTime);
        var newPoisition = new Point(this.Data.Position.x, this.Data.Position.y);
        newPoisition.sub(p);
        newPoisition.scalarDivide(ration);
        ctx.Context.drawImage(this.Prerendered, newPoisition.x , ctx.Canvas.height - newPoisition.y);
        ctx.Context.globalAlpha = 1;
    };
    this.Animate = function (p) {
        var translation = new Point(p.x, p.y);
        translation.scalarMultiply(1/distance);
        me.Data.Position.add(translation);
        this.Data.Life++; 
    }
}

function PRCanvas(sX, sY) {
    this.Canvas = document.createElement("canvas");
    this.Canvas.width = sX;
    this.Canvas.height = sY;
    this.Context = this.Canvas.getContext("2d");
}

function RGBColor(ir, ig, ib) {
    this.R = ir || Math.random() * 255 >> 0;
    this.G = ig || Math.random() * 255 >> 0;
    this.B = ib || Math.random() * 255 >> 0;

}