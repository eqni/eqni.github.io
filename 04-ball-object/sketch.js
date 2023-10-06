// Ball Object Notation Demo
// Andrew Chen
// 10/5/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBall = {
  x: 100,
  y: 100,
  dx: 9, 
  dy: -3,
  radius: 50,
  r: 255,
  g: 0,
  b: 0,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function displayBall() {
  fill(theBall.r, theBall.g, theBall.b);
  circle(theBall.x, theBall.y, theBall.radius);
}

function moveBall() {
  theBall.x += theBall.dx;
  theBall.y += theBall.dy;
  theBall.x = theBall.x % (windowWidth + theBall.radius);
  if (theBall.x <= -1 * theBall.radius) {
    theBall.x += windowWidth;
  }
  if (theBall.y <= -1 * theBall.radius) {
    theBall.y += windowHeight;
  }
  theBall.y = theBall.y % (windowHeight + theBall.radius);
}

function mousePressed() {
  theBall.dx += 2;
  theBall.dy += 2;
}