// Weed

const GRID_SIZE = 50;

let maps = {
  warehouse: [],
  dock: []
};

let state;
let cellSize;
let xOffset = 0;
let yOffset = 0;
let x;
let y;
let font;
let money = 100;
let income = 0;
let time;
let mapData = [];
let plantGrowthStates = [[136, 8, 8], [170, 74, 68], [238, 75, 43], [255, 195, 0], [199, 234, 70], [152, 251, 152], [27, 131, 102]];

// Loads font
function preload() {
  font = loadFont("Pixel Font.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  resizeScale();
  noStroke();
  background(0);
  textSize(30);
  textFont(font);
  state = {
    identity: "normal",
    size: [1.5, 1.5],
    direction: 0,
    stage: 0
  };
  x = GRID_SIZE / 2;
  y = GRID_SIZE / 2;
  cellSize = min(windowHeight, windowWidth) / GRID_SIZE;
  maps.warehouse = genMap(GRID_SIZE, GRID_SIZE);
  mapData = genData(GRID_SIZE, GRID_SIZE);
}

function draw() {
  time = millis();
  drawMap(GRID_SIZE, GRID_SIZE);
  drawPlayer();
  rect(0, 0, 400, 100);
  drawMoney();
  // if(time % 200 < 25) {
  //   money += income;
  //   income = 0;
  // }
  if(time % 1000 < 100) {
    stimulatePlants();
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

function genMap(rows, cols) {
  let newMap = [];

  // Warehouse Map
  for (let x = 0; x < rows; x++) {
    newMap.push([]);
    for (let y = 0; y < cols; y++) {
      newMap[x].push([]);
      // Dirt
      newMap[x][y] = color(random(110, 130), random(40, 50), random(25, 40));

      // Warehouse
      if (y < 34 && y > 0) {
        newMap[x][y] = color(random(220, 230));
      }
      else if (y < 35) {
        newMap[x][y] = color(0);
      }
      if (y < 36 && y > 33 && x > 22 && x < 28) {
        newMap[x][y] = color(50, 84, 48, 50);
      }
      
      // Road
      if (x === 25 && y > 34 && y % 8 < 3) {
        newMap[x][y] = color(random(245, 255), random(220, 240), random(0, 25));
      }
      else if (y > 34 && x > 22 && x < 28) {
        newMap[x][y] = color(random(95, 115));
      }
      else if (y > 34 && x > 21 && x < 29) {
        newMap[x][y] = color(random(35, 50));
      }
    }
  }
  return newMap;
}

function genData(rows, cols) {
  let newMap = [];
  for (let x = 0; x < rows; x++) {
    newMap.push([]);
    for (let y = 0; y < cols; y++) {
      newMap[x].push([]);
      if (y < 34 && y > 0) {
        newMap[x][y] = 1;
      }
      else {
        newMap[x][y] = 0;
      }
    }
  }
  return newMap;
}

function drawMap(rows, cols) {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      fill(maps.warehouse[x][y]);
      rect(x * cellSize + xOffset, y * cellSize + yOffset, cellSize, cellSize);
    }
  }
}

function drawPlayer() {
  fill(0);
  // Movement
  if (keyIsDown(39)) {
    x++;
  }
  else if (keyIsDown(37)) {
    x--;
  }
  else if (keyIsDown(40)) {
    y++;
    state.direction = 0;
  }
  else if (keyIsDown(38)) {
    y--;
    state.direction = 1;
  }
  gateCheck();

  // State
  if (state.identity === "normal") {
    x = constrain(x, 1, 49);
    y = constrain(y, 2, 33);
    state.size = [1.5, 1.5];
    rect((x - state.size[0] / 2) * cellSize + xOffset, (y - state.size[1] / 2) * cellSize + yOffset, cellSize * state.size[0], cellSize * state.size[1]);
  }
  else if (state.identity === "truck") {
    x = constrain(x, 24, 27);
    y = constrain(y, 33, 50);
    state.size = [1.5, 4.5];
    rect((x - state.size[0] / 2) * cellSize + xOffset, y * cellSize + yOffset, cellSize * state.size[0], cellSize * state.size[1]);
  }
}

function gateCheck() {
  if(y < 33 && x > 22 && x < 28) {
    state.identity = "normal";
  }
  if(y > 33 && x > 22 && x < 28) {
    state.identity = "truck";
  } 
}

function drawMoney() {
  fill(234, 173, 11);
  text(money, 2 * cellSize, 2 * cellSize);
}

function mousePressed() {
  let px = floor((mouseX - xOffset) / cellSize);
  let py = floor((mouseY - yOffset) / cellSize);
  if (!(mapData[px][py] === 2) && py > 0 && py < 34 && money >= 100){
    mapData[px][py] = [2, 0];
    maps.warehouse[px][py] = plantGrowthStates[0];
    money-= 100;
  }
  if(mapData[px][py] === 2) {
    mapData[px][py] = 0;
    income += 200;
  }
}

function stimulatePlants() {
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if(mapData[x][y][0] === 2) {
        mapData[x][y][1] += 1;
        maps.warehouse[x][y] = plantGrowthStates[mapData[x][y][1]];
      }
    }
  }
}