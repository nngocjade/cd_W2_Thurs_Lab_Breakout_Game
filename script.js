/*CANVAS NOTES:
ctx.beginPath();
ctx.rect("left", "top", "width", "height");   //retangle
ctx.fillStyle = "#FF0000";                    //stores the color
ctx.fill();                                   //paints the object   
ctx.closePath();


ctx.arc("x-coordinate", 
	"y-coordinate", 
	"arc radius", 
	"start angle", 
	"end angle", 
	"false");   //direction of drawing (false for clockwise, the default, or true for anti-clockwise.) This last parameter is optional.



ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";   //colors the border
ctx.stroke();


TO MAKE A BALL MOVE:

Technically speaking : 
	paint the ball on the screen
	clear it	
  paint it again in a slightly different position every frame 

  */

// referencing the canvas from HTML
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let leftPressed = false;
let rightPressed = false;

function KeydownHandler(e) {
  if (e.key === "ArrowRight") {
    rightPressed = true;
  }
  if (e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyupHandler(e) {
  if (e.key === "ArrowRight") {
    rightPressed = false;
  }
  if (e.key === "ArrowRight") {
    rightPressed = false;
  }
}

document.addEventListener("keydown", KeydownHandler);
document.addEventListener("keyup", keyupHandler);

let x = 60;
let y = 60;

let dx = 2;
let dy = 2;

let radius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2); // x & y coordinate, start & end angle, direction of drawing (clockwise, default, counter-clockwise)
  ctx.fillStyle = "gray"; // stores the color
  ctx.fill(); // paints the object
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}
function update() {
  //Update Values

  if (x >= paddleX && x <= paddleX + paddleWidth) {
    if (y >= canvas.height - paddleHeight) {
      console.log("hey, we hit the paddle");
    }
  }

  if (x + radius >= 480 || x - radius <= 0) {
    dx = -dx;
  }
  if (y + radius >= 320 || y - radius <= 0) {
    dy = -dy;
  }

  x = x + dx;
  y = y + dy;

  if (leftPressed) {
    paddleX = paddleX - 5;
  }
}

function draw() {
  ctx.clearRect(0, 0, 480, 320);
  //Draw
  drawBall();
}

function main() {
  update();
  draw();
  window.requestAnimationFrame(main); //JS timing function, allows a function to run over and over again
}

main();
