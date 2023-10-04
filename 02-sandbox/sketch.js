//////////////////////////////////////////////////////////////////////////////////
// Interactive Scene Assignment                                                 // 
// Mini Interactive Sandbox                                                     //
//                                                                              //
// Andrew Chen                                                                  //
// 10/01/2023                                                                   //
//                                                                              //
// Game: A mini interactive sandbox where the user can "interact" by affecting  //
// the generated island through the use of buttons that allow unique commands.  //
//                                                                              //
// Game controls: There are 2 buttons near the top left. On click, the buttons  //
// activate. To use these buttons, click somewhere on screen to set a starting  //
// position. The leftmost button is the color worm which draws a colorful worm  //
// upon space bar press. Repeated presses extend the worm from it's head until  //
// reset from button deactivation or starting position reassignment. The other  //
// button enables terraforming. By using arrow key controls, one can draw gray  //
// colored creations as if "terraforming", upon assigning a starting position.  //
//                                                                              //
// Side note: Clicking on a button assigns it's co-ordiations the starting pos  //
//                                                                              //
// Extra for Experts: Rgb constraining & terrain generated using randomization  //
//////////////////////////////////////////////////////////////////////////////////

// Sets up screen settings, variables and the background
let side;
let cell;
let worm;
let terra;
let x;
let y;
let r;
let b;
let g;

function setup() {
  createCanvas(600, 600);
  noStroke();

  // Variables
  side = min(width, height);
  cell = 0.012 * side;
  worm = false;
  terra = false;
  x = 0;
  y = 0;
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);

  // Background
  background("royalblue");
  drawMap();
}

// Simulates the Worm and Terraforming Buttons
function draw() {
  wormButton();
  terraButton();
}

// Worm drawing button
function wormButton() {
  // When worm drawing is deactivated, inner color represents worm color
  fill(r, g, b);
  stroke(255 - r, 255 - b, 255 - g);

  if (worm) {
    // When worm drawing is activated, outer color represents worm color
    stroke(r, g, b);
    fill(255 - r, 255 - b, 255 - g);
  }
  strokeWeight(4);
  rect(10, 10, 20, 20);
}

// Terraforming button
function terraButton() {
  // When terraforming is deactivated, inner color = brown | outer color = gray
  stroke(128);
  fill(157, 96, 85);

  if (terra) {
    // When terraforming is activated, inner color & outer color = gray
    fill(128);
    terraform();
  }
  strokeWeight(4);
  rect(40, 10, 20, 20);
}

// Draws the island map
function drawMap() {
  // Uses probability and a variety of color shades to generate an island-like map
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      if (x < random(0.02 * side) || y < random(0.02 * side)) {
        fill(0, 127, 255);
      } 
      else if (x < random(0.035 * side) || y < random(0.035 * side)) {
        fill(54, 162, 216);
      } 
      else if (x < random(0.04 * side) || y < random(0.04 * side)) {
        fill(21, 244, 238);
      } 
      else if (
        x < random(0.03 * side, 0.04 * side) ||
        y < random(0.03 * side, 0.04 * side)
      ) {
        fill(10, 255, 255);
      } 
      else if (
        x < random(0.04 * side, 0.05 * side) ||
        y < random(0.04 * side, 0.05 * side)
      ) {
        fill(random(225, 244), random(192, 216), random(146, 179));
      } 
      else if (
        x < random(0.05 * side, 0.055 * side) ||
        y < random(0.05 * side, 0.055 * side)
      ) {
        fill(188, 143, 146);
      } 
      else if (
        x < random(0.055 * side, 0.065 * side) ||
        y < random(0.055 * side, 0.065 * side)
      ) {
        fill(160, 102, 85);
      } 
      else if (x > 0.05 * side || y > 0.05 * side) {
        fill(random(20, 130), random(190, 255), random(0, 90));
      }
      rect(cell * x, cell * y, cell, cell);
    }
  }
}

// Activates commands when keys are pressed
function keyPressed() {
  // When the spacebar is pressed, generate a colorworm at the mouse's position
  if (keyCode === 32) {
    if (worm) {
      colorWorm();
    }
  }
}

// Activates commands when the mouse is pressed
function mousePressed() {
  // Switchs on / off the color worm button
  if (mouseX > 10 && mouseX < 30 && mouseY > 10 && mouseY < 30) {
    worm = !worm;
    terra = false;
  }

  // Switches on / off the terraforming button
  if (mouseX > 40 && mouseX < 60 && mouseY > 10 && mouseY < 30) {
    terra = !terra;
    worm = false;
  }

  // Logs the mouse's X and Y co-ordinates
  x = mouseX - mouseX % cell;
  y = mouseY - mouseY % cell;
}

// Draws a color worm
function colorWorm() {
  // Randomly chooses the direction the worm goes in, and it's color
  for (let i = 0; i <= random(25, 100); i++) {
    let randomValue = random();
    if (randomValue < 0.25) {
      x -= cell;
    } 
    else if (randomValue < 0.5) {
      x += cell;
    } 
    else if (randomValue < 0.75) {
      y -= cell;
    } 
    else {
      y += cell;
    }

    r += random(-3, 3);
    g += random(-3, 3);
    b += random(-3, 3);

    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);

    fill(r, g, b);
    noStroke();
    rect(x, y, cell, cell);
  }
}

// Terraforms pixels on the screen
function terraform() {
  noStroke();
  fill(128);

  // Draws gray pixels through wasd, starting point = mouse clicked pos
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65) && x >= height / -2 + 15) {
    x -= cell;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) && x <= height * 3 / 2 - 15) {
    x += cell;
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87) && y >= width / -2 + 15) {
    y -= cell;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83) && y <= width * 3 / 2 - 15) {
    y += cell;
  }
  rect(x, y, cell, cell);
}