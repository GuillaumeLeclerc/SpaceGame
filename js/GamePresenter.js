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
	var that.context = parent.data.canvas.context;
	var that.width = parent.data.canvas.width;
	var that.height = parent.data.canvas.height;
	
	// Rocket
	var that.rocket = parent.data.rocket;
	
	// Flag showing if the screen has been touched
	var that.leftPressed = false;
	var that.rightPressed = false;
	
	that.pointerUp = function(evt)
	{
		evt.preventDefault();
		that.leftPressed = false;
	    that.rightPressed = false;
	}	
	
	that.pointerDown = function(evt)
	{
		evt.preventDefault();
		var clickX = evt.clientX;
		var clickY = evt.clientY;
		
	    that.leftPressed = false;
	    that.rightPressed = false;
		
		// Check if the event is left or right
		if ((x >= 0 && x <= (that.width / 3)) && (y >= (2/3*that.height) && y <= that.height))
		{ 
	    	// Left move detected
	    	that.leftPressed = true;
	    	that.rightPressed = false;
		}
	
		if ((x >= (2/3*that.width) && x <= that.width) && (y >= (2/3*that.height) && y <= that.height))
		{ 
	    	// Right move detected
	    	that.leftPressed = false;
	    	that.rightPressed = true;
		}
	}
	
	that.nextStep = function()
	{
		
	}
}



/**
represent a basic physic entity
*/
function Entity() {
    // Do attributes and methods
    var that = this;

    that.accelereation = new Point(0, 0);
    that.speed = new Point(0, 0);
    that.position = new Point(0, 0);
    that.mass = 5;

    that.setMass = function(i_mass){
        that.mass = i_mass;
    }

    that.applyForce = function (f , timeStep) {
        f.scalarDivide(that.mass);
        that.accelereation = f;
        var changeSpeed = new Point(that.accelereation.x, that.accelereation.y);
        changeSpeed.scalarMultiply(timeStep);
        that.speed.add(changeSpeed);
        var changingPosition = new Point(that.speed.x , that.speed.y);
        changingPosition.scalarMultiply(timeStep);
        that.position.add(changingPosition);
    }

}
