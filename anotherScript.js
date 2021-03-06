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

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false; //default value is False because at the beginning the control buttons are not pressed
var leftPressed = false; //default value is False because at the beginning the control buttons are not pressed

// BRICKS
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

var score = 0;
var lives = 3;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~[ KEYS & MOUSE TO CONTROL PADDLE ]~~~~~~~~~~~~~~~~

//When the keydown event is fired on any of the keys on your keyboard (when they are pressed), the keyDownHandler() function will be executed. The same pattern is true for the second listener:
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("mousemove", mouseMoveHandler, false); //listening for mouse movement

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~[ KEY DOWN HANDLER ]~~~~~~~~~~~~~~~~~~~~~~
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~[ KEY UP HANDLER ]~~~~~~~~~~~~~~~~~~~~~~~~
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~[ MOUSE MOVE HANDLER ]~~~~~~~~~~~~~~~~~~~~~
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~[ COLLISION DETECTION ]~~~~~~~~~~~~~~~~~~~~
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          // BALL CHANGES COLOR EVERY TIME IT HITS A BRICK
          color = getRandomColor();
          ctx.fillStyle = color;
          dy = -dy;
          b.status = 0;
          score++; // To award a score each time a brick is hit
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload(); // the function reloads the page and starts the game again once the alert button is clicked.
          }
        }
      }
    }
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
// ~~~~~~~~~~~~~~~~~~~~~~~~[ DRAW SCORE ]~~~~~~~~~~~~~~~~~~~~~~~~~
function drawScore() {
  //to create and update the score display
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20); //set the actual text, and where it will be placed ("text itself" + current # of points, coordination, coordination);
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~[ DRAW LIVES ]~~~~~~~~~~~~~~~~~~~~~~~~~
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~[ DRAW BRICKS ]~~~~~~~~~~~~~~~~~~~~~~~~
function drawBricks() {
  // The code above will loop through the rows and columns and create the new bricks. NOTE that the brick objects will also be used for collision detection purposes later.
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft; // assigning brick coordinate value instead of (0,0)
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop; // assigning brick coordinate value instead of (0,0)

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~ [ DRAW ] ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function draw() {
  // x & y coordintates of top left corner, the x & y coordinates of the bottom right corner
  ctx.clearRect(0, 0, canvas.width, canvas.height); //This clears the canvas, each time, before the canvas draws (This allows the ball to move without a trail)

  // CALLING DRAW BALL FUNCTION HERE
  drawBall();
  // CALLING DRAW PADDLE FUNCTION HERE
  drawPaddle();
  // CALLING DRAW SCORE FUNCTION HERE keeps the score up to date with every new frame
  drawScore();
  // CALLING DRAW LIVES FUNCTION HERE
  drawLives();
  // CALLING DRAW BRICK FUNCTION HERE
  drawBricks();
  // CALLING COLLISION DECTECTION FUNCTION HERE
  collisionDetection();

  // X - WALLS
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // Y - WALLS
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // COLLISION DETECTION - MAKING SURE WHETHER THE BALL HIT THE PADDLE, IF YES, CONTINUE BOUNCING
    if (x > paddleX && x < paddleX + paddleWidth) {
      color = getRandomColor(); //ball changes color everytime it hits the paddle
      /* console.group();
     console.log("%cx-color", "color: green;");
     console.log(color);
     console.groupEnd(); */
      ctx.fillStyle = color;
      dy = -dy * 1.2; // ball speed increases by 10% every time it hits the paddleHeight
    } else {
      // when the ball hits the bottom edge of the screen, we're subtracting one life from the lives variable. No lives left, game is lost. If there are still some lives left, then the position of the ball and paddle are reset, along with the movement of the ball.
      lives--;
      brickWidth -= 20;
      paddleWidth -= 25;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

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

  x += dx;
  y += dy;

  requestAnimationFrame(draw); //This produces a more efficient, smoother animation loop than theolder setInvterval() method.
}

draw();
