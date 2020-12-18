// referencing the canvas from HTML
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = 10;
let y = 10;

let dx = 1;
let dy = 1;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "gray";
  ctx.fill();
  ctx.closePath();
}
function update() {
  //Update Values

  if (x >= 480) {
    dx = -dx;
  }
  if (y >= 320) {
    dy = -dy;
  }
  if (x <= 0) {
    dx = -dx;
  }
  if (y <= 0) {
    dy = -dy;
  }
  x = x + dx;
  y = y + dy;
}

function draw() {
  ctx.clearRect(0, 0, 480, 320);
  //Draw
  drawBall();
}

function main() {
  update();
  draw();
  window.requestAnimationFrame(main);
}

main();

// simple Code to draw rect/cirlce to show off canvas functions
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc();
