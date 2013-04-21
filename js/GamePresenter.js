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
	that.maxFuel = 1;

	
	that.NBAsteroids = 0;
	that.MaxAsteroids = 5;

	that.setUp = function () {
	    that.backGround.Context.fillStyle = "rgba(50, 50, 50, 1)";
	    that.backGround.Context.fillRect(0, 0, that.width, that.height);
	    that.NBStars = 0;

	    that.NBAsteroids = 0;
	    that.MaxAsteroids = 5;

	    that.asteroids = new Array();
	    that.stars = new Array();

	    // Rocket
	    that.rocket = parent.data.rocket;
		that.rocket.engine.fuel.amount = parent.data.capacity;

	    // Flag showing if the screen has been touched
	    that.leftPressed = false;
	    that.rightPressed = false;

	    that.leftPressedID = -1;
	    that.rightPressedID = -1;

	    that.rocket.position = new Point(0, 0);
	    that.rocket.speed = new Point(0, 0);

	    that.rocketImage = that.parent.data.images.rocket1;
	    that.asteroidImage = that.parent.data.images.asteroid1;
	    that.sateliteImage = that.parent.data.images.satellite1;

	    that.rocketImage.style.height = "150px";
	    that.rocketImage.style.width = "80px";


	    that.rocket.suposedSize = new Point(60, 180);
	    that.rocket.displaySize = new Point(80, 150);
	    that.rocket.screenPosition = new Point(0.5 * (that.width - that.rocket.displaySize.x), -30);
	    that.maxFuel = that.rocket.engine.fuel.amount;

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

	that.nextStep = function (timeStep) {
	    that.rocket.engine.rearOn = true;

	    if (that.leftPressed == true) {
	        that.rocket.engine.rightOn = true;
	    }
	    else {
	        that.rocket.engine.rightOn = false;
	    }

	    if (that.rightPressed == true) {
	        that.rocket.engine.leftOn = true;
	    }
	    else {
	        that.rocket.engine.leftOn = false;
	    }

	    var aspectRatio = 180 / 100;
	    var rocketXinMeters = that.rocket.position.x;
	    var rocketXinPixels = rocketXinMeters / aspectRatio;

	    if (that.NBStars < that.MaxStars && ((++that.clock) % 10) == 0) {
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

	    if (that.NBAsteroids < that.MaxAsteroids && ((that.clock) % 45) == 0) {
	        var color = new RGBColor();
	        var myLittleStar = new Star(Math.random() * that.width * aspectRatio, Math.random() * that.height * aspectRatio + that.rocket.position.y + 1000, 0, 0, 0.1 + 3 * Math.random(), color);
	        that.asteroids.push(myLittleStar);

	        if (Math.random() > 0.5) {
	            myLittleStar.spaceObject = 1;
	        }

	        that.NBAsteroids++;
	    }

	    for (var i = 0; i < that.asteroids.length; i++) {
	        var asteroid = that.asteroids[i];
	        var asteroidPos = asteroid.Data.Position;
	        var aCoords = that.rocket.getCoordInCoordinateSystem(asteroidPos, that.height, 80);
	        if (aCoords.y > that.height * 10) { //|| asteroid.Data.MustDie()) {
	            that.asteroids.splice(i, 1);
	            that.NBAsteroids--;
	        }
	    }

	    // Check for collisions
	    for (var i = 0; i < that.asteroids.length; i++) {
	        var asteroid = that.asteroids[i];
	        var asteroidPos = asteroid.Data.Position;
	        var aCoords = that.rocket.getCoordInCoordinateSystem(asteroidPos, that.height, 80);
	        var rCoords = that.rocket.getCoordInCoordinateSystem(that.rocket.position, that.height, that.rocket.displaySize.y);

	        var aTopLeft = { x: aCoords.x - that.width / 2 + 20, y: aCoords.y / 10 + 20 };
	        var aTopRight = { x: aCoords.x - that.width / 2 + 60, y: aCoords.y / 10 + 20 };
	        var aBottomLeft = { x: aCoords.x - that.width / 2 + 20, y: aCoords.y / 10 + 60 };
	        var aBottomRight = { x: aCoords.x - that.width / 2 + 60, y: aCoords.y / 10 + 60 };

	        var rTopLeft = { x: rCoords.x + 20, y: rCoords.y + 20 };
	        var rTopRight = { x: rCoords.x + 60, y: rCoords.y + 20 };
	        var rBottomLeft = { x: rCoords.x + 20, y: rCoords.y + 130 };
	        var rBottomRight = { x: rCoords.x + 60, y: rCoords.y + 130 };


	        if (rTopLeft.x < aBottomRight.x && aBottomRight.x < rTopRight.x && aBottomRight.y < rBottomLeft.y && rTopLeft.y < aBottomRight.y) {
	            // Collision detected
	            that.asteroids.splice(i, 1);
	            that.NBAsteroids--;
	            that.rocket.speed.y /= 2;
	            that.rocket.screenPosition.y = 0;
	        }

	        else if (rTopLeft.x < aBottomLeft.x && aBottomLeft.x < rTopRight.x && aBottomLeft.y > rTopLeft.y && rBottomLeft.y > aBottomLeft.y) {
	            // Collision detected

	            that.asteroids.splice(i, 1);
	            that.NBAsteroids--;
	            that.rocket.speed.y /= 2;
	            that.rocket.screenPosition.y = 0;

	        }
	    }

	    //that.rocket.engine.leftOn = true;
	    that.rocket.nextStep(that.parent.data.planet, timeStep);
	    that.displayStage(timeStep);

	    if (that.rocket.position.y >= parent.data.height) {
	        alert("Congratulations: You have passed this level");
	        return "question";

	    }

	    if (that.rocket.position.y <= -10 && that.rocket.speed.y < -70) {
	        alert("Game Over - Your rocket crashed");
	        return -3;
	    }



	    return -1;
	}

	that.displayStage = function (timeStep) {
	    var aspectRatio = 180 / 100;
	    var rocketXinMeters = that.rocket.position.x;
	    var rocketXinPixels = rocketXinMeters / aspectRatio;

	    that.context.fillStyle = "rgba(255, 255, 255, 1)";
	    that.context.fillRect(0, 0, that.width, that.height);

	    that.backGround.Context.fillStyle = "rgba(0, 0, 0, 0.5)";
	    that.backGround.Context.fillRect(0, 0, that.width, that.height);

	    for (var i = 0; i < that.stars.length; i++) {
	        that.stars[i].Trace(that.backGround, that.rocket.position, aspectRatio);
	    }

	    that.context.drawImage(that.backGround.Canvas, 0, 0);

	    that.context.fillStyle = "rgba(255, 255, 255, 1)";

	    //wrapText(that.context, "star = " + that.stars[0].Data.Position.x + " " + that.stars[0].Data.Position.y, 0, 60, 100, 20);
	    //console.log(timeStep);
	    var rCoords = that.rocket.getCoordInCoordinateSystem(that.rocket.position, that.height, that.rocket.displaySize.y);

	    rCoords.x = rCoords.x + Math.random() * 3 - 1.5;
	    rCoords.y = rCoords.y + Math.random() * 3 - 1.5;

	    if (rCoords.x < 0) {
	        rCoords.x = 0;
	        that.rocket.speed.x = 0;
	        that.rocket.engine.leftOn = false;
	    }

	    if (rCoords.x > that.width - that.rocket.displaySize.x) {
	        rCoords.x = that.width - that.rocket.displaySize.x;
	        that.rocket.speed.x = 0;
	        that.rocket.engine.rightOn = false;
	    }

	    that.context.drawImage(that.rocketImage, rCoords.x, rCoords.y, that.rocket.displaySize.x, that.rocket.displaySize.y);

	    for (var i = 0; i < that.asteroids.length; i++) {
	        var asteroid = that.asteroids[i];
	        var asteroidPos = asteroid.Data.Position;
	        //asteroidPos.y = asteroidPos.y / 10;
	        var aCoords = that.rocket.getCoordInCoordinateSystem(asteroidPos, that.height, 80);
	        if (asteroid.spaceObject == 0) {
	            that.context.drawImage(that.asteroidImage, aCoords.x - that.width / 2, aCoords.y / 10, 80, 80);
	        }
	        else {
	            that.context.drawImage(that.sateliteImage, aCoords.x - that.width / 2, aCoords.y / 10, 80, 80);
	        }
	    }


	    that.context.drawImage(that.parent.data.images.UI, 0, 0);


	    that.context.fillStyle = "rgb(0,150,0)";
	    wrapText(that.context, "" + Math.round(that.rocket.speed.y * 1000) / 1000, 60, 14.5, 500, 20);
	    wrapText(that.context, "" + Math.round(that.rocket.position.y * 1000) / 1000, 60, 41.5, 500, 20);
	    wrapText(that.context, "" + Math.round(that.parent.data.planet.lastGravity * 1000) / 1000, 60, 69, 500, 20);
	    that.context.fillStyle = "rgb(0,200,0)";
	    that.context.fillRect(53, 85, 112 * (that.rocket.engine.fuel.amount / that.maxFuel), 12);
	    that.context.fillRect(that.width - 10, 20, 5, that.height - 40);
	    wrapText(that.context, "Start", +that.width - 27, that.height - 7, 500, 20);
	    wrapText(that.context, "End", +that.width - 24, 13, 500, 20);
	    that.context.fillRect(53, 85, 112 * (that.rocket.engine.fuel.amount / that.maxFuel), 12);
	    that.context.fillRect(that.width - 10, 20, 5, that.height - 40);
	    wrapText(that.context, "Start", +that.width - 27, that.height - 7, 500, 20);
	    wrapText(that.context, "End", +that.width - 24, 13, 500, 20);

	    that.context.drawImage(parent.data.images.tinyImage, that.width-20, that.height - (that.rocket.position.y / parent.data.height) * (that.height - 45) - 30, 20, 30);

	    that.context.globalAlpha = 0.3;
	    that.context.drawImage(parent.data.images.controllerLeft, 30, that.height - 100, 100, 100);
	    that.context.drawImage(parent.data.images.controllerRight, that.width - 130, that.height - 100, 100, 100);
	    that.context.globalAlpha = 1;
	}
}