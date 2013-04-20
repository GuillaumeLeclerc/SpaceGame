/// <reference path="Point.js" />
/// <reference path="Planet.js" />
/// <reference path="Entity.js" />
/// <reference path="Fuel.js" />
/// <reference path="Rocket.js" />

window.requestAnimFrame =
    (function () {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 30);
        };
    }
    )();

function Game() {
    var that= this;

    that.data = {

    };

    that.presenters = {
        homePage: null,
        setUp: null,
        game: new GamePresenter(that),
        question : null 
    };




}