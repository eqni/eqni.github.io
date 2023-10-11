// Ball Object Notation Demo
// Andrew Chen
// 10/5/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  let theBall = spawnBall();
  ballArray.push(theBall);
}

function draw() {
  background(0);
  moveBall();
  displayBall();
}

function mousePressed() {
  let someBall = spawnBall();
  someBall.x = mouseX;
  someBall.y = mouseY;
  ballArray.push(someBall);
}

function keyTyped() {
  if (key === " ") {
    let someBall = spawnBall();
    ballArray.push(someBall);
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
  for (let i = 0; i < ballArray.length; i++) {
    let theBall = ballArray[i];
    fill(theBall.r, theBall.g, theBall.b);
    circle(theBall.x, theBall.y, theBall.radius);
  }
}

function moveBall() {
  for (let i = 0; i < ballArray.length; i++) {
    let theBall = ballArray[i];
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
}
