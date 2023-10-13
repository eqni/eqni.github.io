// Circle Sea
// Andrew Chen
// 10/4/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let worldMap = [];
let snakeArray = [];
let pixelCount;
let pixelWidth;
let pixelLength;
let pixelSize;
let colorOffset;

function setup() {
  background("darkgray");
  createCanvas(windowWidth, windowHeight);
  pixelSize = 4;
  drawMap();
}

function draw() {
  spawnSnake();
  displaySnake();
}

function drawMap(){
  for(let x = 0; x < windowWidth / pixelSize; x++) {
    for(let y = 0; y < windowHeight / pixelSize; y++) {
      //fill(random(54, 90), random(162, 200), random(198, 255));
      fill(200);
      rect(x * pixelSize, y * pixelSize, 4, 4);
    }
  }
}

function mousePressed() {
  let snake = spawnSnake();
  snake.x = mouseX;
  snake.y = mouseY;
  snakeArray.push(snake);
}

function spawnSnake(){
  let rng = random();
  if(rng < 0.96) {
    let normalSnake = {
      x: windowHeight / 2,
      y: windowWidth / 2,
      s: 4,
      color: color(random(255), random(255), random(255)),
    };
    return normalSnake;
  }
  else{
    let cancerSnake = {
      x: windowHeight / 2,
      y: windowWidth / 2,
      s: 8,
      color: color(0),
    };
    return cancerSnake;
  }
}

function displaySnake() {
  for (let i = 0; i < snakeArray.length; i++) {
    let snake = snakeArray[i];
    let rng = random();
    fill(snake.color);
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