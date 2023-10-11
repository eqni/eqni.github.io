// Circle Sea
// Andrew Chen
// 10/4/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let worldMap = [];
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
}

function drawMap(){
  noStroke();
  for(let x = 0; x < windowWidth / pixelSize; x++) {
    for(let y = 0; y < windowHeight / pixelSize; y++) {
      fill(random(54, 90), random(162, 200), random(198, 255));
      rect(x * pixelSize, y * pixelSize, 4, 4);
    }
  }
}
