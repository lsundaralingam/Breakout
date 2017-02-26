var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (i = 0; i < brickColumnCount; i++) {
	bricks[i] = [];
	for (j = 0; j < brickRowCount; j++) {
		bricks[i][j] = { x: 0, y: 0, status: 1 };
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	for (i = 0; i < brickColumnCount; i++) {
		for (j = 0; j < brickRowCount; j++) {
			if (bricks[i][j].status == 1) {
				var brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[i][j].x = brickX;
				bricks[i][j].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#009FDD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection();

	x += dx;
	y += dy;

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}

	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			alert("GAME OVER");
			document.location.reload();
		}
	}

	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	}
}

function collisionDetection() {
	for (i = 0; i < brickColumnCount; i++) {
		for (j = 0; j < brickRowCount; j++) {
			var coord = bricks[i][j];
			if (coord.status == 1) {
				if (x > coord.x && x < coord.x + brickWidth && y > coord.y && y < coord.y + brickHeight) {
					dy = -dy;
					coord.status = 0;
				}
			}
		}
	}
}

setInterval(draw, 10);