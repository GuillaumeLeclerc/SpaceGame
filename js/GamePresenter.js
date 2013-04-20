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
	var that.parent = parent;
	var that.canvas = parent.data.canvas;
	var that.context = parent.data.canvasContext;
	var that.width = parent.data.canvas.width;
	var that.height = parent.data.canvas.height;
	
	// Rocket
	var that.rocket = parent.data.rocket;
	
	// Flag showing if the screen has been touched
	var that.leftPressed = false;
	var that.rightPressed = false;
	
	var that.leftPressedID = -1;
	var that.rightPressedID = -1;
	
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
		
		that.rocket.nextStep(that.parent.planet, timeStep);
		
		return -1;
	}
	
	var displayStage = function()
	{
		that.context.fillStyle = "rgba(50, 50, 50, 1)";
   	 	that.context.fillRect(0, 0, that.canvas.width, that.canvas.height);
   	 	
   	 	var rocketImage = that.parent.images.rocket1;
   	 	// 180m is the height of a standard rocket
   	 	var aspectRatio = 180 / that.rocketImage.height;
   	 	var rocketXinMeters = that.rocket.position.x;
   	 	var rocketXinPixels = aspectRatio / rocketXinMeters;
   	 	
   	 	rocketImage.onload = function()
    	{
    		that.context.drawImage(rocketImage, rocketXinPixels, that.canvas.height-that.rocketImage.height, rocketImage.width, rocketImage.height);
  		}
	}
}