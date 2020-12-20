let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// ~~~~~~~~~~~~~~~~~~~~~~~[ VARIABLES ]~~~~~~~~~~~~~~~~~~~~~~~~~

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var hex;
var color = getRandomColor();

var paddleHeight = 20;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var interval = setInterval(draw, 10);

var rightPressed = false; //default value is False because at the beginning the control buttons are not pressed
var leftPressed = false; //default value is False because at the beginning the control buttons are not pressed

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~[ BUTTONS TO CONTROL PADDLE ]~~~~~~~~~~~~~~~~

//When the keydown event is fired on any of the keys on your keyboard (when they are pressed), the keyDownHandler() function will be executed. The same pattern is true for the second listener:
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// When we press a key down, this information is stored in a variable.
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    //The relevant variable in each case is set to true
    //When the key is released, the variable is set back to false.
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~[ GET A RANDOM HEX COLOR ]~~~~~~~~~~~~~~~~
function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~ [ DRAW ] ~~~~~~~~~~~~~~~~~~~~~~~~~~
function draw() {
  // x & y coordintates of top left corner, the x & y coordinates of the bottom right corner
  ctx.clearRect(0, 0, canvas.width, canvas.height); //This clears the canvas, each time, before the canvas draws (This allows the ball to move without a trail)

  // CALLING DRAW BALL FUNCTION HERE
  drawBall();
  // CALLING DRAW PADDLE FUNCTION HERE
  drawPaddle();

  // X - WALLS
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    // color = getRandomColor();
    // ctx.fillStyle = color;
    dx = -dx;
    /* console.group();
     console.log("%cx-color", "color: green;");
     console.log(color);
     console.groupEnd(); */
  }

  // Y - WALLS
  if (y + dy < ballRadius) {
    dy = -dy;

    /* console.group();
    // console.log("%cy-color", "color:red;");
    // console.log(color);
       console.groupEnd(); */
  } else if (y + dy > canvas.height - ballRadius) {
    // COLLISION DETECTION - MAKING SURE WHETHER THE BALL HIT THE PADDLE, IF YES, CONTINUE BOUNCING
    if (x > paddleX && x < paddleX + paddleWidth) {
      color = getRandomColor(); //ball changes color everytime it hits the paddle
      ctx.fillStyle = color;
      dy = -dy * 1.1; // ball speed increases by 10% every time it hits the paddle
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game
    }
  }

  x += dx;
  y += dy;

  // THIS LOGIC MOVES THE PADDLE ON THE SCREEN
  if (rightPressed) {
    paddleX += 7; // If the right cursor is pressed, the paddle will move 7px to the right
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth; //canvas.width-paddleWidth will prevent paddle from moving beyond the right side of the canvas width
    }
  } else if (leftPressed) {
    paddleX -= 7; // If the left cursor is pressed, the paddle will move 7px to the left
    if (paddleX < 0) {
      // This prevents the paddle from moving beyond the left side of the canvas width
      paddleX = 0;
    }
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~[  ]~~~~~~~~~~~~~~~~~~
