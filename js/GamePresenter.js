/// <reference path="Star.js" />
// Render function 

// images are in
// parent.data.images.rocket
// parent.data.canvas

// 1280 x 768

function wrapText(context, text, x, y, maxWidth, lineHeight) 
{
  	var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) 
 	{
    	var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if(testWidth > maxWidth) 
 		{
        	context.fillText(line, x, y);
        	line = words[n] + ' ';
            y += lineHeight;
        }
        else 
 		{
            line = testLine;
        }
    }
	
	context.fillText(line, x, y);
}

/**
Game Presenter
*/
function GamePresenter(parent)
{
	// Attributes and methods
	var that = this;
	that.parent = parent;
	that.canvas = parent.data.canvas;
	that.context = parent.data.canvasContext;
	that.width = parent.data.canvas.width;
	that.height = parent.data.canvas.height;
	that.backGround = new PRCanvas(that.width, that.height);
	that.stars = new Array();
	that.NBStars = 0;
	that.MaxStars = 50;
	that.clock = 0;
	
	
	
	that.setUp = function()
	{
	    that.backGround.Context.fillStyle = "rgba(50, 50, 50, 1)";
	    that.backGround.Context.fillRect(0, 0, that.width, that.height);
	    that.NBStars = 0;

		// Rocket
		that.rocket = parent.data.rocket;
	
		// Flag showing if the screen has been touched
		that.leftPressed = false;
		that.rightPressed = false;
	
		that.leftPressedID = -1;
		that.rightPressedID = -1;
	
		that.rocket.position = new Point(0,0);
		that.rocket.speed = new Point(0,0);
		
		that.rocketImage = that.parent.data.images.rocket;
   	 	// 180m is the height of a standard rocket
	}
	
	that.pointerUp = function(evt)
	{
		if (that.leftPressedID = evt.pointerId)
		{
			that.leftPressed = false;
		}
		
		if (that.rightPressedID = evt.pointerId)
		{
			that.rightPressed = false;
		}
	}	
	
	that.pointerDown = function(evt)
	{
		var clickX = evt.clientX;
		var clickY = evt.clientY;
		
		// Check if the event is left or right
		if ((clickX >= 0 && clickX <= (that.width / 3)) && (clickY >= (2/3*that.height) && clickY <= that.height))
		{ 
	    	// Left move detected
	    	that.leftPressedID = evt.pointerID;
	    	that.leftPressed = true;
		}
	
		if ((clickX >= (2/3*that.width) && clickX <= that.width) && (clickY >= (2/3*that.height) && clickY <= that.height))
		{ 
	    	// Right move detected
	    	that.rightPressedID = evt.pointerID;
	    	that.rightPressed = true;
		}
	}
	
	that.nextStep = function(timeStep)
	{
		that.rocket.engine.rearOn = true;
	
		if (that.leftPressed == true)
		{
			that.rocket.engine.rightOn = true;
		}
		else
		{
			that.rocket.engine.rightOn = false;
		}
		
		if (that.rightPressed == true)
		{
			that.rocket.engine.leftOn = true;
		}
		else
		{
			that.rocket.engine.leftOn = false;
		}
		
		var aspectRatio = 180 / 100;
		var rocketXinMeters = that.rocket.position.x;
		var rocketXinPixels = rocketXinMeters / aspectRatio;

		if (that.NBStars < that.MaxStars && ((++that.clock)%10) == 0) {
		    var color = new RGBColor();
		    that.stars.push(new Star(Math.random() * that.width * aspectRatio, Math.random() * that.height * aspectRatio + that.rocket.position.y + 1000, 0, 0, 0.1 + 3 * Math.random(), color));
		    that.NBStars++;
		}


		for (var i = 0; i < that.stars.length; i++) {
		    var star = that.stars[i];
		    //star.Animate(that.rocket);
		    if (star.Data.Position.y < that.rocket.position.y - 100 || star.Data.MustDie()) {
		        that.stars.splice(i, 1);
                that.NBStars--;
            }
		}


		//that.rocket.engine.leftOn = true;
		that.rocket.nextStep(that.parent.data.planet, timeStep);
		that.displayStage(timeStep);
		return -1;
	}
	
	that.displayStage = function(timeStep) 
	{
	    var aspectRatio = 180 / 100;
	    var rocketXinMeters = that.rocket.position.x;
	    var rocketXinPixels = rocketXinMeters / aspectRatio;

	    that.context.fillStyle = "rgba(255, 255, 255, 1)";
	    that.context.fillRect(0, 0, that.width, that.height);

	    that.backGround.Context.fillStyle = "rgba(50, 50, 50, 0.5)";
	    that.backGround.Context.fillRect(0, 0, that.width, that.height);
	    
	    for (var i = 0; i < that.stars.length; i++) {
	        that.stars[i].Trace(that.backGround, that.rocket.position, aspectRatio);
	    }

	    that.context.drawImage(that.backGround.Canvas, 0, 0);
	    
   	 	//that.context.fillRect(0, 0, that.canvas.width, that.canvas.height);
   	 	
   	 	
   	 	that.rocketImage.style.height = "100px";
		that.rocketImage.style.width = "60px";
   	 	
   	 	//var aspectRatio = 180 / that.rocketImage.height; 
   	 	
   	 	
   	 	that.context.fillStyle = "rgba(255, 255, 255, 1)";
   	 	wrapText(that.context, "height = " + that.rocket.position.y, 0, 30, 100, 20);
   	 	//wrapText(that.context, "star = " + that.stars[0].Data.Position.x + " " + that.stars[0].Data.Position.y, 0, 60, 100, 20);
   	 	console.log(timeStep); 	
   	 	that.backGround.Context.drawImage(that.rocketImage, rocketXinPixels + that.canvas.width/2 - 30, that.canvas.height - 100, 60, 100);   	 	//that.rocketImage.onload = function()
    	//{
    		
  		//}
	}
}