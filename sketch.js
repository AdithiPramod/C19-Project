var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ghost, ghost_running, ghost_jumping, ghost_hit;

var road, invisible_ground;

var music;

var obstaclesGroup, obstacle_1, obstacle_2;

var bg;

var score = 0;

var game_over, restart;

function preload(){

  music = loadSound("music.mp3");

  bg_1 = loadImage("bg_1.png");

  ghost_running = loadImage("running.png");
  ghost_jumping = loadImage("jumping.png")
  ghost_hit = loadImage("over.png")

  obstacle_1 = loadImage("obstacle_1.png");
  obstacle_2 = loadImage("obstacle_2.png");

  road_img = loadImage("road.png");

  gameOverImg = loadImage("game_over.png")
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  var road = createSprite(200,380,400,20);
  road.addAnimation(road_img);

  var ghost = createSprite(200,300,20,50);
  ghost.addAnimation(ghost_running);
  ghost.scale = 2;

  ghost.setCollider("circle", 0, 0, 30);

  ghost.x = 50;

  var invisible_ground = createSprite(200,300,400,5);
  invisible_ground.visible = false;

  var ObstaclesGroup = createGroup();
  var CloudsGroup = createGroup();

  var restart = createSprite(200,150);

  restart.addAnimation(gameOverImg);
  restart.scale = 0.5;
  restart.visible = false;

}

function draw() {
  
  background(bg_1);
  
  textSize(30)
  text("Score : "+ score, 1050, 60);
  
  
  if(gameState === PLAY){
    road.velocityX = -(6 + 3*score/100);
  
    score = score + Math.round(World.frameRate/60);
    
    if (road.x < 200){
      road.x = road.width/2;
    }
    
    if(keyDown("space") ){
      ghost.velocityY = -10 ;
      playSound(music);
    }

    ghost.velocityY += 0.8;
    
    spawnObstacles();
    

    if(ObstaclesGroup.isTouching(ghost)){
      gameState = END;
    }
  }
  
  if(gameState === END){
   
    restart.visible = true;
    
    road.velocityX = 0;
    ghost.velocityY = 0;

    ObstaclesGroup.setVelocityXEach(0);    
 
    ghost.setAnimation("over.png");
    ghost.scale = 0.5;
    
    ObstaclesGroup.setLifetimeEach(-1);
  }
  
  if(mousePressedOver(restart)) {
    reset();
  
    ghost.collide(invisible_ground);
  }

  drawSprites();

  textSize(40);

  text("SCORE: "+ score, 30, 50);
  }

function reset(){
  
  gameState = PLAY;

  ObstaclesGroup.destroyEach();

  ghost.setAnimation("running.png");
  ghost.scale = 1.5;

  restart.visible = false;

  score = 0;
}

function spawnObstacles() {

  if(World.frameCount % 60 === 0) {

    var obstacle = createSprite(400,300,10,40);
    obstacle.velocityX = - (6 + 3*score/100);
    

    var random_num = randomNumber(1,6);
    obstacle.setAnimation("obstacle_1.png");
    
         
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
  
    ObstaclesGroup.add(obstacle);
  }
}

function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600, 95, 20, 30);
    obstacle.setCollider("circle ",0,0,45)
    
    obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    var random_num = Math.round(random(1,2));
    switch(random_num) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    trex.depth += 1;

    obstaclesGroup.add(obstacle);
  }
}