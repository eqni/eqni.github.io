// Circle Sea
// Andrew Chen
// 10/4/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let worldmap = [];
let cell;
function setup() {
  background("lightblue");
  createCanvas(windowWidth, windowHeight);
  cell = 0.01 * min(widn');
  drawMap();
}

function draw() {
}

function drawMap(){
  fill("white");
  for(let x = 0; x < cell; x++) {
    for(let y = 0; y < cell; y++) {
      circle(x, y, random(2, 4));
    }
  }
}
