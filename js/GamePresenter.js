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
	
	that.pointerUp = function(evt)
	{
		evt.preventDefault();
	}	
	
	that.pointerDown = function(evt)
	{
		evt.preventDefault();
		var clickX = evt.clientX;
		var clickY = evt.clientY;
		
		// Check if the event is left or right
		
		if ((x >= 0 && x <= 200) && (y >= 400 && y <= 600))
		{ 
	    	//alert("Left captured"+x+","+y);
	    	// Move rocket left
	    	window.pressing = true;
	    	var o = 0 - offset;
	    	buttonPressed(o);
		}
	
		if ((x >= 600 && x <= 800) && (y >= 400 && y <= 600))
		{ 
	    	// alert("Right captured"+x+","+y);
	    	// Move rocket right
	    	window.pressing = true;
	    	buttonPressed(offset);
		}
	}
	
	that.displayer = function()
	{
		
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
