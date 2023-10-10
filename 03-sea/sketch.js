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
  pixelWidth = 0.01 * windowHeight;
  pixelLength = 0.01 * windowWidth;
  pixelSize = 100;
  drawMap();
}

function draw() {
}

function drawMap(){
  noStroke();
  for(let x = 0; x < pixelLength + 5; x++) {
    for(let y = 0; y < pixelWidth + 5; y++) {
      colorOffset = (x + y) / 100;
      fill(random(54, 60) + colorOffset, random(162, 168) + colorOffset, random(198, 204) + colorOffset);
      circle(x * pixelSize, y * pixelSize, random(150, 250));
    }
  }
}
