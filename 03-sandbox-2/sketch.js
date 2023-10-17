// Sandbox 2
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
function setup() {
  createCanvas(windowWidth, windowHeight);
  drawMap();
}

function draw() {
  displaySnake();
}

function drawMap(){
  for(let x = 0; x < windowWidth / pixelSize; x++) {
    for(let y = 0; y < windowHeight / pixelSize; y++) {
      fill(200);
      rect(x * pixelSize, y * pixelSize, 4, 4);
    }
  }
}

// function drawMap() {
//   for (let x = 0; x < windowWidth / 4; x++) {
//     for (let y = 0; y < windowHeight / 4; y++) {
//       if (x < random(0.02 * windowWidth) || y < random(0.02 * windowHeight)) {
//         fill(0, 127, 255);
//       } 
//       else if (x < random(0.035 * windowWidth) || y < random(0.035 * windowHeight)) {
//         fill(54, 162, 216);
//       } 
//       else if (x < random(0.04 * windowWidth) || y < random(0.04 * windowHeight)) {
//         fill(21, 244, 238);
//       } 
//       else if (
//         x < random(0.03 * windowWidth, 0.04 * windowHeight) ||
//         y < random(0.03 * windowWidth, 0.04 * windowHeight)
//       ) {
//         fill(10, 255, 255);
//       } 
//       else if (
//         x < random(0.04 * windowWidth, 0.05 * windowHeight) ||
//         y < random(0.04 * windowWidth, 0.05 * windowHeight)
//       ) {
//         fill(random(225, 244), random(192, 216), random(146, 179));
//       } 
//       else if (
//         x < random(0.05 * windowWidth, 0.055 * windowHeight) ||
//         y < random(0.05 * windowWidth, 0.055 * windowHeight)
//       ) {
//         fill(188, 143, 146);
//       } 
//       else if (
//         x < random(0.055 * windowWidth, 0.065 * windowHeight) ||
//         y < random(0.055 * windowWidth, 0.065 * windowHeight)
//       ) {
//         fill(160, 102, 85);
//       } 
//       else if (x > 0.05 * windowWidth || y > 0.05 * windowHeight) {
//         fill(random(20, 130), random(190, 255), random(0, 90));
//       }
//       rect(4 * x, 4 * y, 4, 4);
//     }
//   }
// }

function mousePressed() {
  if (mouseX > 10 && mouseX < 30 && mouseY > 10 && mouseY < 30) {
    click = "nature";
  }
  else if (mouseX > 40 && mouseX < 60 && mouseY > 10 && mouseY < 30) {
    click = "random";
  }
  else {
    spawnSnake();
  }
}

function buttons() {
  natureButton();
  randomButton();
}

function natureButton() {
  stroke(8);
  fill(108, 108, 255);
  rect(10, 10, 20, 20);
}

function randomButton() {
  stroke(8);
  fill(55, 55, 55);
  rect(40, 10, 20, 20);
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
    buttons();
  }
}

