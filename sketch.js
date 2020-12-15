var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage, cloudsGroup, obstaclesGroup, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score=0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  cloudImage=loadImage("cloud.png");
}

function setup() {
  createCanvas(600, 200);
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
    
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.4;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  
  background(180);
  
  score=score+Math.round(getFrameRate()/60);
  fill("black");
  text("Score:"+score,500,50);
  
  if(keyDown("space")&& trex.isTouching(ground)) {
    trex.velocityY = -10;
  }
  
  spawnClouds();
  spawnObstacles();
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  
  if (World.frameCount % 60 === 0) {
    
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("Cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand= Math.round( random(1,6));
    switch(rand){
      case 1:obstacle.addImage("Obstacle1",obstacle1);
        break;
        
      case 2:obstacle.addImage("Obstacle2",obstacle2);
        break;
        
      case 3:obstacle.addImage("Obstacle3",obstacle3);
        break;
    
      case 4:obstacle.addImage("Obstacle4",obstacle4);
        break;
        
      case 5:obstacle.addImage("Obstacle5",obstacle5);
        break;
        
      case 6:obstacle.addImage("Obstacle6",obstacle6);
        break;
        default: break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    obstaclesGroup.add(obstacle);
  }
}
