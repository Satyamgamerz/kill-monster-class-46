var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup
var bullets=10
var life=3
var score=0
var bullet,bulletImg,bulletGroup
var heart1Img, heart2Img,heart3Img
var heart1,heart2,heart3
var gameState="shoot"
var loseSound,winSound,explosionSound


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  explosionSound = loadSound("assets/explosion.mp3")
  winSound = loadSound("assets/win.mp3")
  loseSound = loadSound("assets/lose.mp3")



}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.5

heart1 = createSprite(1100,50)
heart1.addImage(heart1Img)
heart1.scale=0.4
heart1.visible = false

heart2 = createSprite(1100,50)
heart2.addImage(heart2Img)
heart2.scale=0.4
heart2.visible = false

heart3 = createSprite(1100,50)
heart3.addImage(heart3Img)
heart3.scale=0.4
heart3.visible = true
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
zombieGroup = new Group() 
bulletGroup = new Group() 

}

function draw() {
  background(0); 


if (gameState === "shoot"){
  if(life === 3){
    heart3.visible=true
    heart2.visible=false
    heart1.visible=false
  }
  if(life === 2){
    heart3.visible=false
    heart2.visible=true
    heart1.visible=false
  }
  if(life === 1){
    heart3.visible=false
   heart2.visible=false
   heart1.visible=true
  }
  if(life === 0){
    gameState="lost"
    loseSound.play()
  }
  if(score === 10){
    gameState="won"
    winSound.play()
  }
  if(bullets === 0){
    gameState = "bullets"
    loseSound.play()
  }
  


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)

  bullet = createSprite(windowWidth-1150,player.y-30,20,10)
  bullet.velocityX=20
  bulletGroup.add(bullet)
  bullets=bullets-1
  explosionSound.play()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
enemy()
if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy()
    bulletGroup.destroyEach()
    score=score+5
    
    }
  }

}
if(zombieGroup.isTouching(player)){
  for(var i = 0; i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life=life-1
    }
  }
}

}
drawSprites();
textSize(40)
fill("white")
text("Bullets "+bullets,100,50)

//text("Life ",1300,50)

text("Score "+score,650,50)
if (gameState==="lost"){
  textSize(80)
  fill("red")
  text("You Lost",windowWidth/2,windowHeight/2)
  zombieGroup.destroyEach()
  player.destroy()
}
if (gameState==="won"){
  textSize(80)
  fill("white")
  text("Congratulation! You Win",windowWidth/2-300,windowHeight/2)
  zombieGroup.destroyEach()
  player.destroy()
  /*
   */

}
if(gameState === "bullets"){
textSize(80)
fill("green")
text("Oops! Out Of Bullets",windowWidth/2-300,windowHeight/2)
zombieGroup.destroyEach()
  player.destroy()
}

}
function enemy(){
  if(World.frameCount%70===0){
  zombie = createSprite(random(500,1100),random(100,500),50,50)
  zombie.addImage(zombieImg)
  zombie.scale=0.15
  zombie.velocityX=-3
  zombie.lifetime=400
  zombieGroup.add(zombie)
}
}
