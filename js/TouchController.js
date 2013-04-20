var context;

var mainCanvas;
var leftCanvas;
var rightCanvas;

var leftContext;
var rightContext;
var mainContext;

var pointerDown = {};
var lastPositions = {};
var colors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"];
var currentCanvas = 0; // 0 - main, 1 - left, 2 - right
var base_image;

var rocket_location;

var rocketInitX = 370;
var rocketInitY = 450;
var rocketWidth = 60;
var rocketHeight = 100;

var pressing;

var offset = 10;

var moveRocket = function(offset)
{
	var r_x = rocket_location.x;
	var r_y = rocket_location.y;
	mainContext.clearRect(r_x, r_y, rocketWidth, rocketHeight);
	mainContext.fillRect(r_x, r_y, rocketWidth, rocketHeight);

	r_x = r_x + offset;
    mainContext.drawImage(base_image, r_x, r_y, rocketWidth, rocketHeight);
    rocket_location.x = r_x;
    rocket_location.y = r_y;
};

var buttonPressed = function(offset)
{
	if (window.pressing == true)
	{
		moveRocket(offset);
		setTimeout(buttonPressed,100,offset);
	}
};

var onPointerUp = function (evt) 
{
	evt.preventDefault();
	window.pressing = false;
	//alert("Button released");
};

var onPointerDown = function (evt) 
{
    evt.preventDefault();
    
    var x = evt.clientX;
    var y = evt.clientY;
    
    if (window.lastEvent.x == x  && window.lastEvent.y == y)
    {
    	return;
    }
    
    window.lastEvent = {x : x , y : y};
    
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
	
};

var onload = function()
{
	mainCanvas = document.getElementById("mainCanvas");
	mainCanvas.width = mainCanvas.clientWidth;
	mainCanvas.height = mainCanvas.clientHeight;
	mainContext = mainCanvas.getContext("2d");
    mainContext.fillStyle = "rgba(50, 50, 50, 1)";
    mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
	
	leftCanvas = document.getElementById("leftCanvas");
	leftCanvas.width = leftCanvas.clientWidth;
	leftCanvas.height = leftCanvas.clientHeight;
	leftContext = leftCanvas.getContext("2d");	
    leftContext.fillStyle = "rgba(255, 255, 255, 0)"; // 0 alpha - transparent
    leftContext.fillRect(0, 0, leftCanvas.width, leftCanvas.height);
	
	rightCanvas = document.getElementById("rightCanvas");
	rightCanvas.width = rightCanvas.clientWidth;
	rightCanvas.height = rightCanvas.clientHeight;
	rightContext = rightCanvas.getContext("2d");
    rightContext.fillStyle = "rgba(255, 255, 255, 0)"; // 0 alpha - transparent
    rightContext.fillRect(0, 0, rightCanvas.width, rightCanvas.height);
    
    leftCanvas.addEventListener("PointerDown", onPointerDown, false);
    rightCanvas.addEventListener("PointerDown", onPointerDown, false);
    leftCanvas.addEventListener("PointerUp", onPointerUp, false);
    rightCanvas.addEventListener("PointerUp", onPointerUp, false);
    
    base_image = new Image();
  	base_image.src = "rocket.gif";
  	
    base_image.onload = function()
    {
    	mainContext.drawImage(base_image, rocketInitX, rocketInitY, rocketWidth, rocketHeight);
    	rocket_location = {x: rocketInitX, y: rocketInitY};
  	}
    
    window.pressing = false;
    
    window.lastEvent = {x : -1 , y : -1};
};

document.addEventListener("DOMContentLoaded", onload, false);