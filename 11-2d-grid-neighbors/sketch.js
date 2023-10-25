// 2D Grid Neighbors

let grid = [];
const GRID_SIZE = 15;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = min(windowHeight, windowWidth) / GRID_SIZE;
  grid = generateGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid(GRID_SIZE, GRID_SIZE);
}


function displayGrid(rows, cols) {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      fill(grid[x][y] * 255);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function generateGrid(rows, cols) {
  let theGrid = [];
  for (let x = 0; x < rows; x++) {
    theGrid.push([]);
    for (let y = 0; y < cols; y++) {
      theGrid[x].push(floor(random(2)));
    }
  }
  return theGrid;
}

function mousePressed(){
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  grid[x][y] = abs(grid[x][y] - 1);
  grid[x + 1][y] = abs(grid[x + 1][y] - 1);
  grid[x - 1][y] = abs(grid[x - 1][y] - 1);
  grid[x][y + 1] = abs(grid[x][y + 1] - 1);
  grid[x][y - 1] = abs(grid[x][y - 1] - 1);
}