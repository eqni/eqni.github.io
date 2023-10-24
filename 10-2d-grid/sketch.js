// 2D Array Grid
// Andrew Chen
// Oct 24, 2023

let grid = [[1, 0, 0, 1], 
            [0, 0, 1, 1],
            [1, 1, 0, 1],
            [0, 1, 1, 1]];

let cellSize;
const GRID_SIZE = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = min(windowWidth, windowHeight) / GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      rect(cellSize * x, cellSize * y, cellSize, cellSize);
    }
  }
}
