// Ball Object Notation Demo
// Andrew Chen
// 10/5/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBall;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  theBall = spawnBall();
}

function draw() {
  background(0);
  moveBall();
  displayBall();
}

function mousePressed() {
  theBall.dx += 2;
  theBall.dy += 2;
}

function keyTyped() {
  if (key === " ") {
    theBall = spawnBall();
  }
}

function spawnBall() {
  let theBall = {
    x: random(windowWidth),
    y: random(windowHeight),
    dx: random(-5, 5), 
    dy: random(-5, 5),
    radius: random(15, 30),
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255),
  };
  return theBall;
}

function displayBall() {
  fill(theBall.r, theBall.g, theBall.b);
  circle(theBall.x, theBall.y, theBall.radius);
}

function moveBall() {
  theBall.x += theBall.dx;
  theBall.y += theBall.dy;
  theBall.x = theBall.x % (windowWidth + theBall.radius);
  theBall.y = theBall.y % (windowHeight + theBall.radius);
  if (theBall.x <= -theBall.radius) {
    theBall.x += windowWidth;
  }
  if (theBall.y <= -theBall.radius) {
    theBall.y += windowHeight;
  }
}
