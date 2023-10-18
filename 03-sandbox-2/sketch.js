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
let click;

let rotation = 0;
let switchClock = 0;

// Images
let normalOff;
let normalOn;

function preload() {
  normalOff = loadImage("snake.png");
  normalOn = loadImage("selected-snake.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawMap();
}

function draw() {
  displaySnakes();
  displayImages();
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

function keyPressed() {
  if (keyCode === 37) {
    rotation--;
    switchClock = 0;
  }
  if (keyCode === 39) {
    rotation++;
    switchClock = 0;
  }
}

function displayImages() {
  switchClock++;
  if (switchClock < 100) {
    normalOn.resize(100, 100);
    normalOff.resize(100, 100);
  } 
  else {
    normalOn.resize(20, 20);
    normalOff.resize(20, 20);
  }
  if (rotation % 2 === 0) {
    image(normalOn, 10, 10);
  }
  else {
    image(normalOff, 10, 10);
  }
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

function displaySnakes() {
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



