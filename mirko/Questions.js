/// <reference path="Point.js" />
function Questions(game) {
    var that = this;
	that.game = game;
	that.currentQuestion = 0;
	that.currentLevel = 0;
	that.q;
	that.over = false;
	that.currentAnswer = -1;
	that.counter = 0;
    
	that.questions = new Array();
	
	var questionsForLevel0 = new Array();
	var question00Answers = ["batteries", "gasoline", "solar power", "astronaut spinning a lever"];
	questionsForLevel0[0] = new Question("How do satellites have energy to sustain their existence?", question00Answers, 2);
	
	var question10Answers = ["USA", "Soviet Union", "France", "Germany"];
	questionsForLevel0[1] = new Question("Who launched the first satellite into orbit?", question10Answers, 1);
	
	var question20Answers = ["no fuel", "human coordination", "gravity ", "Earth’s magnetic field"];
	questionsForLevel0[2] = new Question("What keeps a satellite from leaving its orbit?", question20Answers, 1);
	
	that.questions[0] = questionsForLevel0;
	
	var questionsForLevel1 = new Array();
	var question01Answers = ["1", "3", "5", "7"];
	questionsForLevel1[0] = new Question("How many space agencies are maintaining ISS?", question01Answers, 3);
	
	var question11Answers = ["1", "7.5", "15.7", "22.3"];
	questionsForLevel1[1] = new Question("How many times per day does ISS orbits around Earth?", question11Answers, 15.7);
	
	var question21Answers = ["Scientific research", "Telecommunications", "Military", "Tourism"];
	questionsForLevel1[2] = new Question("Main use of ISS is for:", question21Answers, 1);
	
	that.questions[1] = questionsForLevel1;
	
	that.setUp = function() {
		that.currentQuestion = 0;
		that.currentLevel = 0;
		that.over = false;
		that.currentAnswer = -1;
		that.counter = 0;
		that.currentLevel = that.game.data.currentLevel;
		var canvas = that.game.data.canvas;
		var ctx = that.game.data.canvasContext;
		ctx.clearRect(0, 0, that.game.data.canvas.width, that.game.data.canvas.height);
		ctx.drawImage(that.game.data.images.MenuBG, 0, 0);
		
		that.q = that.questions[that.currentLevel][that.currentQuestion];
		ctx.fillStyle="#FFFFFF";
		ctx.font = '16pt Calibri';
		wrapText(ctx, that.q.question, 50, 50, canvas.width-50, 20);
		
		ctx.fillStyle="#000000";
		for (var i = 0; i < that.q.answers.length; i++) {
			ctx.clearRect(50, 50*(i+2)-20, canvas.width-100, 25);
			ctx.strokeRect(50, 50*(i+2)-20, canvas.width-100, 25);
			wrapText(ctx, that.q.answers[i], 50, 50*(i+2), canvas.width-50, 20);
		}
	}
	
	that.pointerDown = function(evt) {}
	
	that.pointerUp = function(evt) {
		if (that.currentAnswer == -1) {
			//listen for answers
			if (evt.x < 50 || evt.x > that.game.data.canvas.width - 50) {
				return;
			}
			
			var answer = -1;
			if (evt.y >= 80 && evt.y <= 105) {
				answer = 0;
			}
			if (evt.y >= 130 && evt.y <= 155) {
				answer = 1;
			}
			if (evt.y >= 180 && evt.y <= 205) {
				answer = 2;
			}
			if (evt.y >= 230 && evt.y <= 255) {
				answer = 3;
			}
			
			if (answer == -1) {
				return;
			}
			//he answered
			if (answer == that.q.correctAnswerIndex) {
				that.game.data.points++;
				that.game.data.canvasContext.fillStyle = '#00FF00';
				wrapText(that.game.data.canvasContext, that.q.answers[answer], 50, 50*(answer+2), that.game.data.canvas.width-50, 20);
			} else {
				that.game.data.canvasContext.fillStyle = '#FF0000';
				wrapText(that.game.data.canvasContext, that.q.answers[answer], 50, 50*(answer+2), that.game.data.canvas.width-50, 20);
			}
			that.game.data.canvasContext.fillStyle = '#000000';
			//highlight crap with green or red
			that.currentAnswer = answer;
			that.counter = 25;
		} else {
			
		}
	}
	
	that.nextStep = function() {
		if (that.currentAnswer != -1) {
			that.counter--;
			if (that.counter == 0) {
				//load next question
				that.game.data.canvasContext.clearRect(0, 0, that.game.data.canvas.width, that.game.data.canvas.height);
				that.game.data.canvasContext.drawImage(that.game.data.images.MenuBG, 0, 0);
				
				that.currentQuestion++;
				if (that.currentQuestion >= that.questions[that.currentLevel].length) {
					//questions over
					return "upgrade";
				}
				
				that.currentAnswer = -1;
				var canvas = that.game.data.canvas;
				var ctx = that.game.data.canvasContext;
				that.q = that.questions[that.currentLevel][that.currentQuestion];
				ctx.fillStyle="#FFFFFF";
				ctx.font = '16pt Calibri';
				wrapText(ctx, that.q.question, 50, 50, canvas.width-50, 20);
				
				ctx.fillStyle="#000000";
				
				for (var i = 0; i < that.q.answers.length; i++) {
					ctx.clearRect(50, 50*(i+2)-20, canvas.width-100, 25);
					ctx.strokeRect(50, 50*(i+2)-20, canvas.width-100, 25);
					wrapText(ctx, that.q.answers[i], 50, 50*(i+2), canvas.width-50, 20);
				}
				return -1;
			} else {
				return -1;
			}
		} else {
			return -1;
		}
	}
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
		var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if(testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }