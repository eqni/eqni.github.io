// Sandbox 2
// Andrew Chen
// 10/4/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let snakeArray = [];
let pixelSize = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawMap();
}

function draw() {
  displaySnake();
  calcSnake();
}

function drawMap(){
  for(let x = 0; x < windowWidth / pixelSize; x++) {
    for(let y = 0; y < windowHeight / pixelSize; y++) {
      fill(200);
      rect(x * pixelSize, y * pixelSize, 4, 4);
    }
  }
}

function mousePressed() {
  spawnSnake();
}

function spawnSnake(){
  let rng = random();
  let snake;
  if(rng < 0.8) {
    snake = {
      x: windowHeight / 2,
      y: windowWidth / 2,
      s: 4,
      color: color(random(30, 255), random(30, 255), random(30, 255)),
    };
  }
  else{
    snake = {
      x: windowHeight / 2,
      y: windowWidth / 2,
      s: 64,
      color: color(5),
    };
  }
  snake.x = mouseX;
  snake.y = mouseY;
  snakeArray.push(snake);
}

function displaySnake() {
  for (let i = 0; i < snakeArray.length; i++) {
    let snake = snakeArray[i];
    let rng = random();
    fill(snake.color);
    stroke(snake.color - 15);
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

function calcSnake(){
  for (let snake in snakeArray) {
    for (let othersnake in snakeArray) {
      let xdif = abs(snake.x - othersnake.x);
      let ydif = abs(snake.y - othersnake.y);
      if (xdif < 1000 || ydif < 1000){
        spawnSnake();
      }
    }
  }
}