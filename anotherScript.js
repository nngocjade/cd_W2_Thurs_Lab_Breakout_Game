let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var hex;
var color = getRandomColor();

// --------------------DRAW BALL-----------------------
function drawBall() {
  // drawing code
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //ctx.arc("x-coordinate", "y-coordinate", "arc radius", "start angle", "end angle", "false");   //direction of drawing (false for clockwise, the default, or true for anti-clockwise.) This last parameter is optional.

  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

// -----------------------DRAW-------------------------
function draw() {
  // x & y coordintates of top left corner, the x & y coordinates of the bottom right corner
  ctx.clearRect(0, 0, canvas.width, canvas.height); //This clears the canvas, each time, before the canvas draws (This allows the ball to move without a trail)
  drawBall();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    color = getRandomColor();
    ctx.fillStyle = color;
    dx = -dx;

    console.group();
    console.log("%cx-color", "color: green;");
    console.log(color);
    console.groupEnd();
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    color = getRandomColor();
    ctx.fillStyle = color;
    dy = -dy;

    console.group();
    console.log("%cy-color", "color:red;");
    console.log(color);
    console.groupEnd();
  }

  x += dx;
  y += dy;
}

function convertToColor(num) {
  return "#" + ("00000" + (num | 0).toString(16)).substr(-6);
}

function getRandomColor() {
  color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  return color;
}

setInterval(draw, 10);
