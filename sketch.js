var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var gameOver,goImg;
var score=0
var survivalTime=0


var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  goImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  backgr.depth=backgr.depth-1;

  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,350,800,10);
  gameOver.scale = 0.5
  gameOver.visible=false;
  
  FoodGroup = new Group()

  obstacleGroup = new Group() 


}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    
    
    
    if(player.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    player.scale += + 0.1
    score = score + 2;
    }
  
    
    spawnBananas();
    spawnObstacles();

    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }

  }else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    stroke("gold");
    textSize(20);
    fill("blue")
    text("Game Over ",460,50)
  
    
  }


  drawSprites();
  stroke("gold");
    textSize(20);
    fill("blue")
    text("Score : " + score,460,50)
  
}

function spawnBananas() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(120,200))
    banana.scale = 0.05;
    banana.velocityX = -4;
    
    
    
    banana.lifetime = 300;
    
    
    banana.depth = player.depth
    player.depth = player.depth + 1;
    FoodGroup.add(banana);
  
    
  
  
  
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(300,320,40,20)
    obstacle.addImage(obstaceImage)
    obstacle.velocityX = -4
    obstacle.scale=0.2
    obstacle.lifetime = 200;
    
   
    obstacleGroup.add(obstacle)
  
}

}
