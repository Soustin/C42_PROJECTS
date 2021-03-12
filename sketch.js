var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg, foodGroup;
var obstacleImg, obstacleGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOvr, gameOvrImg;

var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  bananaImg=loadImage("banana.png");
  obstacleImg=loadImage("stone.png");
  gameOvrImg=loadImage("gameOver.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOvr = createSprite(400, 100, 10, 10);
  gameOvr.addImage(gameOvrImg);
  gameOvr.scale = 1;
  gameOvr.visible = false;

  obstacleGroup = new Group();
  foodGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){

    backgr.velocityX=-10;

    player.visible = true;
  
  if(backgr.x<210){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(player.isTouching(foodGroup)){
      player.scale = player.scale + 0.0009;
      foodGroup.destroyEach();
      score = score + 2;
    }
    
    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
  }

  if(gameState === END){

    score = 0;

    backgr.velocityX = 0;
    player.visible = false;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();

    gameOvr.visible = true;

    if(keyDown("r")){
      gameState = PLAY;
    }
    
  }



  drawSprites();

  fill(203, 113, 25)
  textSize(30)
  stroke(39.6, 26.3, 12.9)
  strokeWeight(10)
  text("ScOrE : "+score, 30, 30)

  if(gameState === END){
    fill(203, 113, 25)
    textSize(40)
    stroke(39.6, 26.3, 12.9)
    strokeWeight(10)
    text("Press R to Restart", 250, 200)
  }

  spawnObstacles();
  spawnFood();
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
  var obstacle = createSprite(850,300,70,400);
  obstacle.addImage(obstacleImg);
  obstacle.scale = 0.3;
  obstacle.lifetime = 100;  
  obstacle.velocityX = -10;
  obstacle.setCollider('rectangle', 50, 50);
  obstacle.debug = true
    
    obstacleGroup.add(obstacle);
  }
}

function spawnFood(){
  if(frameCount % 100 === 0){
  var food = createSprite(850,150,70,400);
  food.y = Math.round(random(50,150));
  food.addImage(bananaImg);
  food.scale = 0.07;
  food.lifetime = 100;  
  food.velocityX = -10;
    
    foodGroup.add(food);
  }
}