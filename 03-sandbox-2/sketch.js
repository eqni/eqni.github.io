// Sandbox+
// Andrew Chen
// 10/4/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let snakeArray = [];
let pixelSize = 4;
let i;
let cell = 0.01;
let mouse;

let rotation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createMap();
}

function draw() {
  drawSnakes();
  drawState();
}

function createMap(){
  fill(200);
  for(let x = 0; x < windowWidth; x += 4) {
    for(let y = 0; y < windowHeight; y += 4) {
      rect(x, y, pixelSize, pixelSize);
    }
  }
}

function mousePressed() {
  spawnSnake();
}

function spawnSnake(){
  let rng = random();
  let snake;
  if(rng < 0.90) {
    snake = {
      x: windowHeight / 2,
      y: windowWidth / 2,
      s: 4,
      color: color(random(55, 255), random(55, 255), random(55, 255)),
      identity: "regular"
    };
  }
  else if(rng < 0.99) {
    snake = {
      x: windowHeight / 2,
      y: windowWidth / 2,
      s: 4,
      r: random(55, 255),
      g: random(55, 255),
      b: random(55, 255),
      identity: "rgb",
      color: color(snake.r, snake.g, snake.b),
    };
  }
  else{
    snake = {
      x: windowHeight / 2,
      y: windowWidth / 2,
      s: 4,
      color: color(0),
      identity: "evil"
    };
  }
  snake.x = mouseX - mouseX % 4;
  snake.y = mouseY - mouseY % 4;
  snakeArray.push(snake);
}

function drawSnakes() {
  for (i = 0; i < snakeArray.length; i++) {
    let snake = snakeArray[i];
    let rng = random();
    if (snake.identity === "rgb") {
      snake.r += random(1);
      snake.g += random(1);
      snake.b += random(1);
      fill(snake.r, snake.g, snake.b);
    } 
    else {
      fill(snake.color);
    }
    if (rng < 0.25) {
      snake.x += snake.s;
    }
    else if (rng < 0.5) {
      snake.x -= snake.s;
    }
    else if (rng < 0.75) {
      snake.y += snake.s;
    }
    else {
      snake.y -= snake.s;
    }

    rect(snake.x % windowWidth, snake.y % windowHeight, snake.s, snake.s);
  }
}

function drawState(){
  rect(0, 0, 10 * pixelSize, 10 * pixelSize);
}



