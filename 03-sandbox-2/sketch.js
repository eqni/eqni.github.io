// Sandbox 2
// Andrew Chen
// 10/4/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let snakeArray = [];
let pixelSize = 4;
let i;
function setup() {
  createCanvas(windowWidth, windowHeight);
  drawMap();
}

function draw() {
  displaySnake();
  // calcSnake();
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
  if(rng < 0.4) {
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
      identity: "rgb"
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

function displaySnake() {
  for (i = 0; i < snakeArray.length; i++) {
    let snake = snakeArray[i];
    let rng = random();
    if (snake.identity === "rgb") {
      snake.r += random(1);
      snake.g += random(1);
      snake.b += random(1);
      fill(snake.r % 255, snake.g % 255, snake.b % 255);
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

