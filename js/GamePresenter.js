// Render function 

// images are in
// parent.data.images.rocket
// parent.data.canvas

// 1280 x 768

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
	
	var rocketImage = new Image();
	
	that.setUp = function()
	{
		// Rocket
		that.rocket = parent.data.rocket;
	
		// Flag showing if the screen has been touched
		that.leftPressed = false;
		that.rightPressed = false;
	
		that.leftPressedID = -1;
		that.rightPressedID = -1;
	
		that.rocket.position = new Point(0,0);
		that.rocket.speed = new Point(0,0);
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
		if ((x >= 0 && x <= (that.width / 3)) && (y >= (2/3*that.height) && y <= that.height))
		{ 
	    	// Left move detected
	    	that.leftPressedID = evt.pointerID;
	    	that.leftPressed = true;
		}
	
		if ((x >= (2/3*that.width) && x <= that.width) && (y >= (2/3*that.height) && y <= that.height))
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
		
		//that.rocket.nextStep(that.parent.data.planet, timeStep);
		that.displayStage();
		return -1;
	}
	
	that.displayStage = function()
	{
		that.context.fillStyle = "rgba(50, 50, 50, 1)";
   	 	that.context.fillRect(0, 0, that.canvas.width, that.canvas.height);
   	 	
   	 	//var rocketImage = that.parent.images.rocket1;
   	 	var rocketImage = new Image();
   	 	rocketImage.src = "images/rocket.gif";
   	 	// 180m is the height of a standard rocket
   	 	rocketImage.style.height = "100px";
		rocketImage.style.width = "60px";
   	 	
   	 	//var aspectRatio = 180 / that.rocketImage.height;
   	 	var aspectRatio = 180 / 100;
   	 	var rocketXinMeters = that.rocket.position.x;
   	 	var rocketXinPixels = rocketXinMeters / aspectRatio;
   	 	
   	 	rocketImage.onload = function()
    	{
    		that.context.drawImage(rocketImage, rocketXinPixels + that.canvas.width/2 - 30, that.canvas.height - 100, 60, 100);
  		}
	}
}