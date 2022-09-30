var bg, bgImage;
var player, shooterImage, shooterShooting;
var goldKey, goldKeyImage;
var zombie, zombieImage, zombieGroup;
var bullet, bulletImage;
var goldKeyRotation = 1;
var gameOver, gameOverImage;
var score = 0;




function preload(){
  bgImage = loadImage("assets/bg.jpeg")
  shooterImage = loadImage("assets/shooter_2.png")
  shooterShooting = loadImage("assets/shooter_3.png")
  goldKeyImage = loadImage("assets/goldKey.png")
  zombieImage = loadImage("assets/zombie.png")
  bulletImage = loadImage("assets/Bullet.png")
  gameOverImage = loadImage("assets/GameOver.png")
}




function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(displayWidth/2, displayHeight/2, 20 , 20);
  bg.addImage(bgImage);
  bg.scale = 1.1

  zombieGroup = createGroup();
 

  player = createSprite(displayWidth - 1150, displayHeight-300, 50, 50);
  player.addImage(shooterImage);
  player.scale = 0.3
  player.setCollider("rectangle", 0, 0 , 300, 300)

  goldKey = createSprite(120, displayHeight/2, 50, 50);
  goldKey.addImage(goldKeyImage);
  goldKey.scale = 0.5
  goldKey.setCollider("rectangle", 0, 0, 200, 200)


  zombie = createSprite(displayWidth, random(0, displayHeight), 50, 50);
  zombie.addImage(zombieImage);
  zombie.scale = 0.15
  zombie.setCollider("rectangle", 0, 0 , 300, 300)
  zombieGroup.add(zombie);


  bullet = createSprite(player.x + 50, player.y+50, 20, 10);
  bullet.addImage(bulletImage);
  bullet.scale = 0.2
  bullet.setCollider("rectangle", 0, 0, 40, 40)

  

}

function draw() {
  background(0,0,0);




if(keyDown("UP_ARROW")&& player.y > 75){
  player.y = player.y-30
}

if(keyDown("DOWN_ARROW") && player.y < displayHeight - 175){
  player.y = player.y+30
}

if(keyWentDown("SPACE")){
  bullet.remove()
  player.addImage(shooterShooting)
  bullet = createSprite(player.x + 50, player.y+50, 20, 10);
  bullet.scale = 0.2
  bullet.addImage(bulletImage);
}else if(keyWentUp("SPACE")){
  player.addImage(shooterImage)
}


bullet.x = bullet.x+10

if(zombie.x < -100){
  zombie.remove()
  zombie = createSprite(displayWidth, random(0, displayHeight), 50, 50);
  zombie.addImage(zombieImage);
  zombie.scale = 0.15
  zombie.setCollider("rectangle", 0, 0 , 300, 300)
  zombieGroup.add(zombie);
  
  zombie = createSprite(displayWidth, random(0, displayHeight), 50, 50);
  zombie.addImage(zombieImage);
  zombie.scale = 0.15
  zombie.setCollider("rectangle", 0, 0 , 300, 300)
  zombieGroup.add(zombie);
}

if(goldKeyRotation == 1){
goldKey.rotation
goldKey.rotationSpeed = 5
zombieGroup.setVelocityXEach(-7)
}


if(zombie.y < goldKey.y){
  zombie.y = zombie.y+1
}

if(zombie.y > goldKey.y){
  zombie.y = zombie.y-1
}

if(bullet.collide(zombie)){
  zombie.remove()
  zombie = createSprite(displayWidth, random(0, displayHeight), 50, 50);
  zombie.addImage(zombieImage);
  zombie.scale = 0.15
  zombie.setCollider("rectangle", 0, 0 , 300, 300)
  zombieGroup.add(zombie);
  score = score + 1
}

if(zombie.collide(goldKey)){
  zombie.remove()
zombieGroup.setVelocityXEach(0)
  goldKeyRotation = 0;
  goldKey.rotationSpeed = 0
  gameOver = createSprite(displayWidth/2, displayHeight/2, displayHeight, displayHeight);
  gameOver.addImage(gameOverImage);
}

  drawSprites();
  fill("orange");
  strokeWeight(5);
  stroke("black");
  textSize(56);
  textStyle(BOLD);
  text("Score = " + score, displayWidth/2 - 100, 80);

  fill("white");
  strokeWeight(1);
  stroke("white");
  textSize(20);
  textStyle(BOLD);
  text("Protect Me", goldKey.x - 50, goldKey.y - 60);
}