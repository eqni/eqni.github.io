// Weed

const GRID_SIZE = 60;

let grid = [];
let xOffset = 0;
let yOffset = 0;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = min(windowHeight, windowWidth) / GRID_SIZE;
  grid = genMap(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(0);
  drawMap(GRID_SIZE, GRID_SIZE);
  resizeScale();
}

function genMap(rows, cols) {
  let newMap = [];
  for (let x = 0; x < rows; x++) {
    newMap.push([]);
    for (let y = 0; y < cols; y++) {
      newMap[x].push(255);
    }
  }
  return newMap;
}

function drawMap(rows, cols) {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      fill(grid[x][y]);
      rect(x * cellSize + xOffset, y * cellSize + yOffset, cellSize, cellSize);
    }
  }
}

function resizeScale() {
  if (windowHeight >= windowWidth) {
    yOffset = (windowHeight - windowWidth) / 2;
  }
  else if (windowHeight <= windowWidth) {
    xOffset = (windowWidth - windowHeight) / 2;
  }
}
