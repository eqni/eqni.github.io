// 2D Grid Neighbors

let grid = [];
const GRID_SIZE = 60;
let cellSize;
let autoPlay = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = min(windowHeight, windowWidth) / GRID_SIZE;
  grid = generateGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid(GRID_SIZE, GRID_SIZE);
  if (autoPlay && frameCount % 2 === 0) {
    grid = nextTurn();
  }
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


function generateEmptyGrid(rows, cols) {
  let theGrid = [];
  for (let x = 0; x < rows; x++) {
    theGrid.push([]);
    for (let y = 0; y < cols; y++) {
      theGrid[x].push(1);
    }
  }
  return theGrid;
}

function keyTyped() {
  if (key === "r") {
    grid = generateGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "a") {
    autoPlay = !autoPlay;
  }
}

function mousePressed(){
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  
  toggleCell(x, y);
}


function toggleCell(x, y) {
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    grid[x][y] = abs(grid[x][y] - 1);
  }
}

function nextTurn() {
  let nextTurnGrid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (y + j >= 0 && y + j < GRID_SIZE && x + i >= 0 && x + i < GRID_SIZE) {
            neighbors += grid[x + i][y + j];
          }
        }
      }
      neighbors -= grid[x][y];

      if (grid[x][y] === 1) {
        if(neighbors === 2 || neighbors === 3) {
          nextTurnGrid[x][y] = 1;
        }
        else {
          nextTurnGrid[x][y] = 0;
        }
      }
      if (grid[x][y] === 0) {
        if (neighbors === 3) {
          nextTurnGrid[x][y] = 1;
        }
        else {
          nextTurnGrid[x][y] = 0;
        }
      }
    }
  }
  return nextTurnGrid;
}