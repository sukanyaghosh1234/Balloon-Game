var hero1;
var hero2;

var ballon = [];
var ballonCount = 20;
var collisions = 0;
var i = 60;
const CANVAS_HEIGHT = 400
const CANVAS_WIDTH = 1600

var myGameArea = {
	canvas: document.getElementById("myGame"),

	start: function() {
		this.context = this.canvas.getContext("2d");
		console.log(this.context)
		this.interval = setInterval(updateGameArea, 20); //in ms
		this.ticker = setInterval(updateTimeLeft, 1000)
		for (var i = 0; i < ballonCount; i++) {
			var myRandomNo = Math.floor(Math.random() * 1200 + 7);
			var RandomSpeed = Math.floor(Math.random() * 3 +2);
			ballon.push(new component(50, 50, "b1.png", 0, myRandomNo, RandomSpeed, "image"));
			hero1=ballon.push(new component(50, 50, "b2.png", 0, myRandomNo, RandomSpeed, "image"));
		}
		addEventListener("click", function(event) {
			let tempBalloons = ballon
			for (let el of tempBalloons) {
				if ((event.x >= el.x && event.x <= el.x + el.width) && (event.y >= el.y && event.y <= el.y + el.height)) {
					collisions++
					el.y = CANVAS_HEIGHT+1 // Move the balloon out of canvas so as to make it disappear
					document.getElementById('collisions').innerHTML = collisions
				}
			}
		});
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

var startGame = function() {
	myGameArea.start();
}

function updateTimeLeft() {
	if (i < 0) { // if the total time for a game is over, reload the page
		clearInterval(myGameArea.ticker)
		alert('Game Over')
		location.reload()
	} else { // Otherwise update the total time left
		document.getElementById('timer').innerHTML = i--
	}

}

function updateGameArea() {
	myGameArea.clear();
	for (var i = 0; i < ballonCount; i++) {
		ballon[i].y = ballon[i].y + ballon[i].speed;
		if (ballon[i].y> 400) {
			ballon[i].y = 0;
			ballon[i].x = Math.floor(Math.random() * 1200 + 7);
		}
		ballon[i].update();
	}
}

function component(width, height, color, x, y, speed, type) {
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = this.color;
		if (type == "image") {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
	}
}
