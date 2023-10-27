// Weed

const GRID_SIZE = 50;
const WEED_HIGH = 1.5;

let grid = [];
let cellSize;

let xOffset = 0;
let yOffset = 0;
let x = 6;
let y = 6;

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);

  cellSize = min(windowHeight, windowWidth) / GRID_SIZE;
  resizeScale();
  grid = genMap(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(0);
  drawMap(GRID_SIZE, GRID_SIZE);
  drawPlayer();
  console.log(x);
}

function genMap(rows, cols) {
  let newMap = [];
  for (let x = 0; x < rows; x++) {
    newMap.push([]);
    for (let y = 0; y < cols; y++) {
      newMap[x].push([]);
      // Dirt
      newMap[x][y] = color(random(110, 130), random(40, 50), random(25, 40));

      // Road
      if (y === 44) {
        newMap[x][y] = color(random(35, 50));
      }
      else if (y > 38 && y < 44) {
        newMap[x][y] = color(random(95, 115));
      }
      else if (y === 38) {
        newMap[x][y] = color(random(35, 50));
      }
      if (y > 25 && x > 22 && x < 28) {
        newMap[x][y] = color(random(95, 115));
      }
      else if (y > 25 && (y < 38 || y > 44) && x > 21 && x < 29) {
        newMap[x][y] = color(random(35, 50));
      }

      // Road lines
      if (y === 41 && x % 8 < 3 || x === 25 && y > 28 && y % 8 < 3) {
        newMap[x][y] = color(random(245, 255), random(220, 240), random(0, 25));
      }

      // Warehouse
      if (y < 26 && y > 0) {
        newMap[x][y] = color(random(220, 230));
      }
      else if (y < 27) {
        newMap[x][y] = color(random(2, 10));
      }
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

function drawPlayer() {
  fill(0);
  rect((x - WEED_HIGH / 2) * cellSize + xOffset, (y - WEED_HIGH / 2) * cellSize + yOffset, cellSize * WEED_HIGH, cellSize * WEED_HIGH);
  if (keyIsDown(39)) {
    x++;
  }
  if (keyIsDown(37)) {
    x--;
  }
  if (keyIsDown(40)) {
    y++;
  }
  if (keyIsDown(38)) {
    y--;
  }
  x = constrain(x, 1, 49);
  y = constrain(y, 2, 25);

}
