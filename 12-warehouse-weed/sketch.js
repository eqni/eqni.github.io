///////////////////////////////////////////////////////////////////////////////////////////
// Warehouse Weed
// Andrew Chen
// 10/26/2023
//
// Extra for Experts:
// - loaded fonts
// - 3D Arrays
///////////////////////////////////////////////////////////////////////////////////////////

// Variables
const GRID_SIZE = 50;

let maps = {
  lobbyMap: [],
  shopMap: [],
  data: []
};

let state = {
  identity: "normal",
  size: [1.5, 1.5],
  direction: 0,
  stage: 0,
  plant: 0,
  cost: 100,
};

let cellSize;
let xOffset = 0;
let yOffset = 0;
let x;
let y;
let font;
let money = 100;
let plantGrowthStates = [[136, 8, 8], [170, 74, 68], [238, 75, 43], [255, 195, 0], [199, 234, 70], [152, 251, 152], [27, 131, 102]];

// Loads Font
function preload() {
  font = loadFont("Pixel Font.TTF");
}

// Builds Map, Sets up Text Scale
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  resizeScale();
  textFont(font);

  x = GRID_SIZE / 2;
  y = GRID_SIZE / 2;
  cellSize = min(windowHeight, windowWidth) / GRID_SIZE;
  maps.lobbyMap = genMap();
  maps.data = genData();
}

function resizeScale() {
  if (windowHeight >= windowWidth) {
    yOffset = (windowHeight - windowWidth) / 2;
  }
  else if (windowHeight <= windowWidth) {
    xOffset = (windowWidth - windowHeight) / 2;
  }
}

function mousePressed() {
  let px = floor((mouseX - xOffset) / cellSize);
  let py = floor((mouseY - yOffset) / cellSize);
  if(maps.data[px][py][1] === 6) {
    maps.data[px][py] = 0;
    maps.lobbyMap[px][py] = color(random(220, 230));
    money += 250;
  }
  else if (!(maps.data[px][py][0] === 2) && py > 0 && py < 34 && money >= 100){
    maps.data[px][py] = [2, 0];
    maps.lobbyMap[px][py] = color(plantGrowthStates[0]);
    money -= state.cost;
  }
}

function keyPressed() {
  // Collects all Plants
  if (keyCode === 32) {
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < 34; y++) {
        if(maps.data[x][y][1] === 6) {
          maps.data[x][y] = 0;
          maps.lobbyMap[x][y] = color(random(220, 230));
          money += 250;
        }
      }
    }
  }
  else if (keyCode === 38) {
    state.plant++;
  }
  else if (keyCode === 40) {
    state.plant++;
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

function draw() {
  noStroke();
  drawMap(GRID_SIZE, GRID_SIZE);
  drawPlayer();
  drawPlants();
  drawUI();
}

function drawMap() {
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      fill(maps.lobbyMap[x][y]);
      rect(x * cellSize + xOffset, y * cellSize + yOffset, cellSize, cellSize);
    }
  }
}

function drawPlayer() {
  fill(0);
  // Movement
  if (keyIsDown(68)) {
    x++;
  }
  else if (keyIsDown(65)) {
    x--;
  }
  else if (keyIsDown(83)) {
    y++;
    state.direction = 0;
  }
  else if (keyIsDown(87)) {
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

function drawPlants() {
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (maps.data[x][y][0] === 2 && random() < 0.05) {
        if (maps.data[x][y][1] < 6) {
          maps.data[x][y][1] += 1;
        }
        maps.lobbyMap[x][y] = color(plantGrowthStates[maps.data[x][y][1]]);
      }
    }
  }
}

function genMap() {
  let newMap = [];

  // lobbyMap Map
  for (let x = 0; x < GRID_SIZE; x++) {
    newMap.push([]);
    for (let y = 0; y < GRID_SIZE; y++) {
      newMap[x].push([]);

      // Dirt
      newMap[x][y] = color(random(110, 130), random(40, 50), random(25, 40));

      // lobbyMap
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

function genData() {
  let newMap = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    newMap.push([]);
    for (let y = 0; y < GRID_SIZE; y++) {
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

// Loads an icon representing the current state
function drawUI() {
  let borderFill;
  let outerFill;
  let innerFill;
  let char;
  let desc;

  // Cafeteria CannaSib
  if (state.plant % 3 === 0) {
    outerFill = color(180, 237, 210);
    innerFill = color(184, 184, 255);
    borderFill = color(147, 129, 255);
    char = "C";
    desc = "How come the cafeteria food is so bad, but they never stop eating it?";
  }

  // Washroom WeDe
  else if (state.plant % 3 === 1) {
    outerFill = color(64, 110, 142);
    innerFill = color(142, 168, 195);
    borderFill = color(35, 57, 91);
    char = "W";
    desc = "What's so good about the washroom that they gotta go every period? ";
  }

  // Hallway HeriOn
  else if (state.plant % 3 === 2) {
    outerFill = color(48, 105, 100);
    innerFill = color(105, 162, 151);
    borderFill = color(54, 60, 60);
    char = "H";
    desc = "They're doing it again, there are rooms everywhere, what's so good about the halls?";
  }

  // Money Box
  strokeWeight(8);
  fill(0);
  rect(0, 0, 400, 100);
  stroke(234, 173, 11);
  fill(255, 255, 167);
  rect(4, 4, 29 * money.toString().length + 15, cellSize / 2 + 46);

  // State Box
  stroke(borderFill);
  fill(outerFill);
  rect(4, cellSize / 2 + 58, cellSize / 2 + 56, cellSize / 2 + 56);
  rect(4, windowHeight - 200, xOffset - 8, 196);
  fill(63, 112, 117);
   
  // Money
  noStroke();
  textSize(32);
  fill(234, 173, 11);
  text(money, 12, 2 * cellSize + 9);

  // State + Description
  textSize(44);
  text(char, 18, cellSize / 2 + 106);
  textSize(24);
  text(desc, 14, windowHeight - 161, 450);
  fill(innerFill);
  text(desc, 16, windowHeight - 160, 450);
  textSize(44);
  text(char, 18, cellSize / 2 + 107);
}
