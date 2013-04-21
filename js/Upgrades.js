function Upgrades(game){
    var that = this;
    that.canvas = game.data.canvas;
    that.ctx = game.data.canvasContext;
    that.game = game;
    that.over = false;
    //that.rocket = game.data.rocket;
    //that.points = game.data.points;
    
    that.setUp = function(){
		that.over = false;
        that.ctx.clearRect(0, 0, that.game.data.canvas.width, that.game.data.canvas.height);
		that.ctx.drawImage(that.game.data.images.MenuBG, 0, 0);
		
        that.ctx.font = "22px Arial";
		that.ctx.fillStyle="#FFFFFF";
        that.ctx.fillText("Upgrades", 30, 40);
        that.ctx.fillText("Points: " + that.game.data.points, 350, 40);
        
        that.ctx.strokeRect(600,20,80,30);
        that.ctx.fillText("Continue",610,40);
    
		that.ctx.fillStyle="#000000";
        that.ctx.font = "18px Arial";
        
        
		that.ctx.clearRect(50,100,that.canvas.width-100,100);
        that.ctx.strokeRect(50,100,that.canvas.width-100,100);
        that.ctx.fillText("Engine efficency: lvl "+that.game.data.rocket.enginelvl,60,150);
        
        that.ctx.clearRect(50,250,that.canvas.width-100,100);
        that.ctx.strokeRect(50,250,that.canvas.width-100,100);
        that.ctx.fillText("Fuel efficency: lvl "+that.game.data.rocket.fuellvl,60,300);
        
		that.ctx.clearRect(50,400,that.canvas.width-100,100);
        that.ctx.strokeRect(50,400,that.canvas.width-100,100);
        that.ctx.fillText("Fuel amount: lvl "+that.game.data.rocket.fuelamountlvl,60,450);
    }    
    
    that.pointerDown = function(evt){
    
    }
    
    that.pointerUp = function(evt){
        if (evt.y >= 20 && evt.y <= 50 && evt.x >= 600 && evt.x <= 680){
                //back
                //alert("found over");
                that.over = true;
            }
        if (that.game.data.points==0)
            return;
        if (evt.x < 50 || evt.x > that.canvas.width-100){
            return;
        } else {
            if (evt.y >= 100 && evt.y <= 200){
                // engine ef
                that.game.data.rocket.enginelvl++;
                that.ctx.clearRect(50,100,that.canvas.width-100,100);
                that.ctx.strokeRect(50,100,that.canvas.width-100,100);
                that.ctx.fillText("Engine efficency: lvl "+that.game.data.rocket.enginelvl,60,150);
                that.game.data.points--;
                that.ctx.fillRect(350,15,100,40);
				that.ctx.fillStyle="#FFFFFF";
				that.ctx.font = "22px Arial";
                that.ctx.fillText("Points: " + that.game.data.points, 350, 40);
				that.ctx.font = "18px Arial";
				that.ctx.fillStyle="#000000";
                
            }
            if (evt.y >= 250 && evt.y <= 350){
                // fuel ef
                that.game.data.rocket.fuellvl++;
                that.ctx.clearRect(50,250,that.canvas.width-100,100);
                that.ctx.strokeRect(50,250,that.canvas.width-100,100);
                that.ctx.fillText("Fuel efficency: lvl "+that.game.data.rocket.fuellvl,60,300);
                that.game.data.points--;
                that.ctx.fillRect(350,15,100,40);
				that.ctx.fillStyle="#FFFFFF";
				that.ctx.font = "22px Arial";
                that.ctx.fillText("Points: " + that.game.data.points, 350, 40);
				that.ctx.font = "18px Arial";
				that.ctx.fillStyle="#000000";
            }
            if (evt.y >= 400 && evt.y <= 500){
                // fuel amount
				alert("muie");
                that.game.data.rocket.fuelamountlvl++;
                that.ctx.clearRect(50,400,that.canvas.width-100,100);
                that.ctx.strokeRect(50,400,that.canvas.width-100,100);
                that.ctx.fillText("Fuel amount: lvl "+that.game.data.rocket.fuelamountlvl,60,450);
                that.game.data.points--;
                that.ctx.fillRect(350,15,100,40);
				that.ctx.fillStyle="#FFFFFF";
				that.ctx.font = "22px Arial";
                that.ctx.fillText("Points: " + that.game.data.points, 350, 40);
				that.ctx.font = "18px Arial";
				that.ctx.fillStyle="#000000";
            }
        }
    }
    
    that.nextStep = function(){
        if (that.over){
            //alert ("over");
            return "question";
        }
        else {
            return -1;
        }
    }
}
	