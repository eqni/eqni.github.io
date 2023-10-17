// Images and Sounds

let mario;
let coinSound;
let backgroundSound;

function preload() {
  mario = loadImage("mario.png");
  coinSound = loadSound("coin-effect");
  backgroundSound = loadSound("background-sound");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);

  image(mario, mouseX, mouseY);
}

function mousePressed(){
  coinSound.play();
  if(!backgroundSound.isPlaying()) {
    backgroundSound.loop();
  }
}
