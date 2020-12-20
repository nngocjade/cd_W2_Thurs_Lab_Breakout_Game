let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// --------------------VARIABLES---------------------

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var hex;
var color = getRandomColor();

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false; //default value is False because at the beginning the control buttons are not pressed
var leftPressed = false; //default value is False because at the beginning the control buttons are not pressed

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~ [ DRAW ] ~~~~~~~~~~~~~~~~~~~~~~~~~~
function draw() {
  // x & y coordintates of top left corner, the x & y coordinates of the bottom right corner
  ctx.clearRect(0, 0, canvas.width, canvas.height); //This clears the canvas, each time, before the canvas draws (This allows the ball to move without a trail)

  // CALLING DRAW BALL FUNCTION HERE
  drawBall();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    color = getRandomColor();
    ctx.fillStyle = color;
    dx = -dx;

    /* console.group();
     console.log("%cx-color", "color: green;");
     console.log(color);
     console.groupEnd(); */
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    color = getRandomColor();
    ctx.fillStyle = color;
    dy = -dy;

    /* console.group();
    // console.log("%cy-color", "color:red;");
    // console.log(color);
       console.groupEnd(); */
  }

  x += dx;
  y += dy;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~[ DRAW BALL ]~~~~~~~~~~~~~~~~~~~~~~~~~~
function drawBall() {
  // drawing code
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //ctx.arc("x-coordinate", "y-coordinate", "arc radius", "start angle", "end angle", "false");   //direction of drawing (false for clockwise, the default, or true for anti-clockwise.) This last parameter is optional.

  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~[ DRAW PADDLE ]~~~~~~~~~~~~~~~~~~~~~~~~
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~[ COVERT TO DIFFERENT COLORS ]~~~~~~~~~~~~~~~~~~
function convertToColor(num) {
  return "#" + ("00000" + (num | 0).toString(16)).substr(-6);
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~[ GET A RANDOM HEX COLOR ]~~~~~~~~~~~~~~~~~~~~~
function getRandomColor() {
  color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  return color;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~[ ANIMATION CALL FUNCTION ]~~~~~~~~~~~~~~~~~~~~~~~
setInterval(draw, 10);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~[ BUTTONS TO CONTROL PADDLE ]~~~~~~~~~~~~~~~~~~~~~

//When the keydown event is fired on any of the keys on your keyboard (when they are pressed), the keyDownHandler() function will be executed. The same pattern is true for the second listener:
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
