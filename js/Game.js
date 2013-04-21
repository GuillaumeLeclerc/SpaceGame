/// <reference path="Point.js" />
/// <reference path="Planet.js" />
/// <reference path="Entity.js" />
/// <reference path="Fuel.js" />
/// <reference path="Rocket.js" />
/// <reference path="ImageProvider.js" />

window.requestAnimFrame =
    (function () {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 30 , element);
        };
    }
    )();

function Game(canvasId , entryPoint) {
    var that= this;

    var _fuelAmount=100;
    var _fuelEfficiency=3312000;
    var _fuelMassValue=0.07;
    var _qsumption=0.9;
    var _rocketMass=1000;
    var _planetMass=5.97219E24;
    var _planetRadius=6.371E6;
    var _engineMass=100;
    var _engineEfficiency=0.8;
    var _engineFuelConsumption=5;
    var myPlanet = new Planet(_planetMass, _planetRadius);
    var myFuel = new Fuel(_fuelAmount, _fuelEfficiency, _fuelMassValue);
    var myEngine = new Engine(_engineMass, myFuel, _engineEfficiency, _engineFuelConsumption);
    var myRocket = new Rocket(_rocketMass, myEngine);

    var mainCanvas = document.getElementById(canvasId);
    mainCanvas.width = mainCanvas.clientWidth;
    mainCanvas.height = mainCanvas.clientHeight;
    var mainContext = mainCanvas.getContext("2d");

    that.imagesToLoad = {
        rocket1 : "images/rocket1.png",
        rocket2 : "images/rocket2.png",
        rocket3 : "images/rocket3.png",
        asteroid1 : "images/asteroid1.png",
        asteroid2 : "images/asteroid2.png",
        asteroid3 : "images/asteroid3.png",
        satellite1 : "images/satellite1.png",
        satellite2 : "images/satellite2.png",
        satellite3: "images/satellite3.png",
        UI: "images/UI2.png",
        MenuBG: "images/backMenu.jpg",
        logo: "images/logo.png",
        introduction: "images/introduction.png",
    };

    that.imageProviders = new Array();

    that.data = {
        rocket: myRocket,
        fuel: myFuel,
        engine: myEngine,
        planet: myPlanet,
        canvas: mainCanvas,
        canvasContext: mainContext,
        images: {}
    };

    that.presenters = {
        homePage: new MainMenu(that),
        setUp: null,
        game: new GamePresenter(that),
        question : null 
    };

    that.lastLoop = new Date().getMilliseconds();
    that.currentPresenter = entryPoint;
    that.runing = true;
    that.firstPresenter = true;

    that.getCurrentPresenter = function () {
        return that.presenters[that.currentPresenter];
    }

    that.innerLoop = function()
    {
        var currentTime = new Date().getMilliseconds();
        var timeSpan = currentTime - that.lastLoop;
        if(timeSpan < 0)
        {
        	timeSpan = currentTime + 1000 - that.lastLoop;
        }
        //console.log(currentTime + " " + that.lastLoop);
        if (that.firstPresenter) {
            that.getCurrentPresenter().setUp();
            that.firstPresenter = false;
        }
        var answer = that.presenters[that.currentPresenter].nextStep(timeSpan/1000);
        if (answer != -1)
        {
            that.changePresenter(answer);
        }
        that.lastLoop = new Date().getMilliseconds();
        if(that.runing)
            requestAnimFrame(function () { that.innerLoop()});
    }

    that.changePresenter = function (nextPresenter) {
        that.firstPresenter = true;
        that.currentPresenter = nextPresenter;
    }

    that.onPointerUp = function (evt) {
        evt.preventDefault();
        that.getCurrentPresenter().pointerUp(evt);
    }

    that.onPointerDown = function (evt) {
        evt.preventDefault();
        that.getCurrentPresenter().pointerDown(evt);
    }

    that.setUp = function(){
        that.data.canvas.addEventListener("PointerDown", that.onPointerDown, false);
        that.data.canvas.addEventListener("PointerUp", that.onPointerUp, false);
        for (var index in that.imagesToLoad) {
            var image = that.imagesToLoad[index];
            var img = new ImageProvider(image, that.imageLoaded);
            that.imageProviders.push(img);
            that.data.images[index] = img.base;
        }
    }

    that.imageLoaded = function () {
        for (var index in that.imageProviders) {
            var provider = that.imageProviders[index];
            if (!provider.loaded) {
                return;
            }
        }
        that.endSetUp();
    }

    that.start = function () {
        that.setUp();        
    }

    that.endSetUp = function () {
        that.lastLoop = new Date().getMilliseconds();
        that.innerLoop();
    }

}