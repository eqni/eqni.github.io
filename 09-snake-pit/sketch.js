///////////////////////////////////////////////////////////////////////////////////////////
// Sandbox+
// Andrew Chen
// 10/4/2023
//
// Extra for Experts:
// - loaded fonts
// - arrays in arrays (technically 2d array but it's not too complex so I'm not sure)
// - constraint function
///////////////////////////////////////////////////////////////////////////////////////////
// Instructions:
// Up and Down arrows to switch the type of "state" spawned snakes will have
// Mouse Click to spawn state, spawned snake is given characteristics based on their state
///////////////////////////////////////////////////////////////////////////////////////////


// Variables
let pixelSize = 4;
let snakeArray = [];
let snakeState = {
  position: 0,
  evil: [[10, 10, 10], [169, 5, 5], [65, 55, 55], [30, 2, 2], [9, 17, 7], [255, 9, 65]],
  corruption: [[36, 47, 92], [37, 28, 78], [43, 15, 61], [30, 2, 2], [47, 10, 40], [54, 8, 8], [20, 6, 7]],
};
let font;

// Loads font
function preload() {
  font = loadFont("Pixel Font.TTF");
}

// Setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  createMap();
  textSize(30);
  textFont(font);
}

// Loads Snakes and the State
function draw() {
  drawUI();
  drawSnakes();
}

// Draws Map
function createMap() {
  fill(200);
  for (let x = 0; x < windowWidth; x += pixelSize) {
    for (let y = 0; y < windowHeight; y += pixelSize) {
      rect(x, y, pixelSize, pixelSize);
    }
  }
}

// Spawns snake on click
function mousePressed() {
  spawnSnake();
}

// Switches State
function keyPressed() {
  if (keyCode === 38) {
    snakeState.position++;
  }
  else if (keyCode === 40) {
    snakeState.position--;
  }
}

// Spawns a snake based on state and randomization
function spawnSnake() {
  let rng = random();
  let snake;
  
  // Spawns a random colored snake, 5% chance RGB color changing snake
  if (snakeState.position % 3 === 0) {
    if (rng < 0.95) {
      snake = {
        color: color(random(55, 255), random(55, 255), random(55, 255)),
        repeat: 1,
      };
    } 
    else {
      snake = {
        r: random(55, 255),
        g: random(55, 255),
        b: random(55, 255),
        identity: "rgb",
        repeat: 1,
      };
    }
  }
  // Spawns an evil snake
  if (snakeState.position % 3 === 1) {
    snake = {
      color: color(snakeState.evil[floor(random() * snakeState.evil.length)]),
      identity: "evil",
      repeat: 1,
    };
  }
  // Spawns a corrupt snake
  if (snakeState.position % 3 === 2) {
    snake = {
      color: color(snakeState.corruption[floor(random() * snakeState.corruption.length)]),
      identity: "corrupt",
      repeat: 2,
    };
  }

  // Adds general characteristics to snakes before adding them to the array
  snake.x = mouseX - mouseX % 4;
  snake.y = mouseY - mouseY % 4;
  snake.s = pixelSize;
  snakeArray.push(snake);
}

// Loads snakes
function drawSnakes() {
  strokeWeight(1);
  for (let i = 0; i < snakeArray.length; i++) {
    let snake = snakeArray[i];
    let rng = random();

    // Executes RGB Characteristics
    if (snake.identity === "rgb") {
      snake.r += random(1);
      snake.g += random(1);
      snake.b += random(1);
      fill(snake.r % 255, snake.g % 255, snake.b % 255);
    }
    // Executes Evil Characteristics
    else if (snake.identity === "evil") {
      snake.s = random(4, 6);
      fill(snakeState.evil[floor(random() * snakeState.evil.length)]);
    } 
    // Executes Corruption Characteristics
    else if (snake.identity === "corrupt") {
      fill(snakeState.corruption[floor(random() * snakeState.corruption.length)]);
      snake.s = random(2, 7);
    } 
    else {
      fill(snake.color);
    }

    // Loads snake movements
    for (let j = 0; j < snake.repeat; j++) {
      if (rng < 0.25) {
        snake.x += snake.s;
      } 
      else if (rng < 0.5) {
        snake.x -= snake.s;
      } 
      else if (rng < 0.75) {
        snake.y += snake.s;
      } 
      else {
        snake.y -= snake.s;
      }

      // Constrains snake movements 
      snake.x = constrain(snake.x, 48, windowWidth) - snake.x % 4;
      snake.y = constrain(snake.y, 48, windowHeight) - snake.x % 4;
      rect(snake.x % windowWidth, snake.y % windowHeight, snake.s, snake.s);
    }
  }
}

// Loads an icon representing the current state
function drawUI() {
  strokeWeight(8);
  let theme;
  let size = min(windowWidth, windowHeight) / 20;
  // Normal State
  if (snakeState.position % 3 === 0) {
    theme = {
      Stroke: 0,
      Fill: 180,
      letter: "N",
      letterFill: 255,
      letterEdges: 220
    };
  }
  // Evil State
  else if (snakeState.position % 3 === 1) {
    theme = {
      Stroke: 0,
      Fill: (65, 55, 55),
      letter: "E",
      letterFill: (130, 50, 50),
      letterEdges: 0
    };
  }
  // Corruption State
  else if (snakeState.position % 3 === 2) {
    theme = {
      Stroke: 0,
      Fill: (43, 15, 62),
      letter: "C",
      letterFill: (54, 60, 60),
      letterEdges: 0
    };
  }
  stroke(theme.Stroke);
  fill(theme.Fill);
  rect(4, 4, size, size);
  // fill(theme.letterEdges);
  // text(theme.letter, 12, 33);
  // fill(theme.letterFill);
  // text(theme.letter, 10, 32);
  // fill(theme.Fill);
  // rect(4, 40, 36, windowHeight);
  // rect(40, 4, windowWidth, 36);
}