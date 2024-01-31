//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let catcherImg, backgroundImg, fallingObjectImg;

/* PRELOAD LOADS FILES */
function preload() {
  catcherImg = loadImage("assets/vase.png");
  backgroundImg = loadImage("assets/shop.jpg");
  fallingObjectImg = loadImage("assets/flower.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);

  //Resize images
  catcherImg.resize(80, 0);
  fallingObjectImg.resize(50, 0);
  backgroundImg.resize(480, 400);
  
  //Create catcher 
  catcher = new Sprite(catcherImg, 200, 380, 100, 20, 'k');
  catcher.color = color(95, 158, 160);

  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100, 0, 10);
  fallingObject.color = color(0, 128, 128);
  fallingObject.vel.y = 2;

}

/* DRAW LOOP REPEATS */
function draw() {
  background(224, 224, 224);

  //Draw background image
  image(backgroundImg, 0, 0);

  // Draw directions to screen
  fill (255, 0, 102);
  textSize(15);
  text("Move the catcher with the\n left and right arrow keys\n to catch the falling flowers.", width - 200, 50);

  //If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(2, 5);
    score = score - 1
  }

  //Move catcher
  if (kb.pressing('left')) {
    catcher.vel.x = -3;
  } else if (kb.pressing('right')) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  //Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }
  //If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = 'down';
    score = score + 1;
  }
  //Draw the score to screen
  fill(255, 0, 102);
  textSize(20);
  text('Score = ' + score + '/15', 10, 30);

  //Draw you lose or you win to screen
  if (score < 0) {
    catcher.pos = { x: -200, y: -200 };
    fallingObject.pos = { x: -200, y: -200 };
    fallingObject.pos = { x: -200, y: -200 };
    fallingObject.collider = 's';
    fill(255, 0, 102);
    textSize(50);
    text('You lose!', 100, 200);
  } else if (score == 15) {
    catcher.pos = { x: -200, y: -200 };
    fallingObject.pos = { x: -200, y: -200 };
    fallingObject.pos = { x: -200, y: -200 };
    fallingObject.collider = 's';
    fill(255, 0, 102);
    textSize(45);
    text('Hooray! You win!', 40, 200);
  }

}