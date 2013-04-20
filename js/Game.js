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

    var _fuelAmount=1;
    var _fuelEfficiency=3312000;
    var _fuelMassValue=0.07;
    var _qsumption=0.9;
    var _rocketMass=1000;
    var _planetMass=5.97219E24;
    var _planetRadius=6.371E6;
    var _engineMass=100;
    var _engineEfficiency=0.8;
    var _engineFuelConsumption=0.9;
    var myPlanet = new Planet(_planetMass, _planetRadius);
    var myFuel = new Fuel(_fuelAmount, _fuelEfficiency, _fuelMassValue);
    var myEngine = new Engine(_engineMass, myFuel, _engineEfficiency, _engineFuelConsumption);
    var myRocket = new Rocket(_rocketMass, myEngine);

    var mainCanvas = document.getElementById(canvasId);
    mainCanvas.width = mainCanvas.clientWidth;
    mainCanvas.height = mainCanvas.clientHeight;
    var mainContext = mainCanvas.getContext("2d");

    var imagesToLoad = {
        rocket : "img/rocket"
    };


    that.data = {
        rocket: myRocket,
        fuel: myFuel,
        engine: myEngine,
        planet: myPlanet,
        canvas: mainCanvas,
        canvasContext: mainContext,
        images: new Array()
    };

    that.presenters = {
        homePage: null,
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
        var timeSpan = that.lastLoop - currentTime;
        if (that.firstPresenter) {
            that.getCurrentPresenter().setUp();
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
    }

    that.start = function () {
        that.setUp();
        that.lastLoop = new Date().getMilliseconds();
        that.innerLoop();
    }




}