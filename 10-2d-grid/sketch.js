// 2D Array Grid
// Andrew Chen
// Oct 24, 2023

let grid;
let cellSize;
const GRID_SIZE = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = min(windowWidth, windowHeight) / GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  displayGrid();
}

// function keyTyped() {
//   if(key === "r") {
//     grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
//   }
//   else if(key === "e") {
//     grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
//   }
// }
function displayGrid(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 0) {
        fill(15);
      }
      if (grid[y][x] === 1) {
        fill(233);
      }
      rect(cellSize * x, cellSize * y, cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let randomArray = [];
  for (let y = 0; y < cols; y++) {
    randomArray.push([]);
    for(let x = 0; x < rows; x++) {
      if(0.5 < random(1)) {
        randomArray[y].push([1]);
        console.log("d");
      } 
      else{
        randomArray[y].push([0]);
        console.log("e");
      }
    }
  }
  return randomArray;
}
function generateEmptyGrid(cols, rows) {
  let randomArray = [];
  for (let y = 0; y < cols; y++) {
    for(let x = 0; x < rows; x++) {
      randomArray.push([1]);      
    }
  }
  return randomArray;
}

// function mousePressed(){
//   grid[mouseY / 4][mouseX / 4] = abs(grid[mouseY / 4][mouseX / 4] - 1);
// }