// Terrain Generation
// Oct 23, 2023

let terrain = [];
let xOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangles();
  drawSquare();
}

function draw() {
  background(220);

  if (keyIsDown(RIGHT_ARROW)) {
    xOffset += 5;
  }

  if (keyIsDown(LEFT_ARROW)) {
    if (xOffset > 5) {  //don't fall off the left side
      xOffset -= 5;
    }
  }

  displayRectangles();
}

function displayRectangles() {
  for (let i = xOffset; i < width + xOffset; i++) {
    let thisRect = terrain[i];
    rect(thisRect.x - xOffset, height - thisRect.height, 1, thisRect.height);
    fill(255);
    rect(25, height - terrain[xOffset].height - 25, 25, 25);
  }
}

function spawnRectangles() {
  let time = 0;
  for (let x = 0; x < 10000; x++) {
    let h = noise(time) * height;
    let thisRect = {
      x: x,
      height: h,
    };
    terrain.push(thisRect);
    time += 0.001;
  }
}

function drawSquare(){
  fill(26);
  rect(terrain[4].x, terrain[4].h, 10, 10);
}