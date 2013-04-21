/// <reference path="Point.js" />

function Question(question, answers, correctAnswerIndex) {
    var that = this;
	
	that.question = question
	
	that.answers = answers
	
	that.correctAnswerIndex = correctAnswerIndex
	
	that.checkAnswer = function (index) {
        if (index == correctAnswerIndex) {
            return true;
        }
        return false;
    }
}