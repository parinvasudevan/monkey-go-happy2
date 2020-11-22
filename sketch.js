var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running
var banana ,bananaImage, obstacleImage;
var obstacleGroup;
var score;
var invisibleGround
var invisibleGround;
var score = 0;

var obstaclesGroup;

var points=0;
var bananaImage;
var bananaGroup;
function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01,Monkey_02,Monkey_03,Monkey_04,Monkey_05,Monkey_06,Monkey_07,Monkey_08,Monkey_09,Monkey_10");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png")
 
  bananaImage = loadImage("banana.png");
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(44,200,20,200);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(200,345,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  
  
  monkey.setCollider("circle",0,0,150);
  
  
  bananaGroup = createGroup();
 
}

function draw() {
  background(220);
  if(gameState==="play"){
       score = score + Math.round(getFrameRate()/61);
     ground.velocityX = -4;
  if(invisibleGround.x<100){
  invisibleGround.x = invisibleGround.width/2;
  }
    
      monkey.velocityY = monkey.velocityY+0.5;
  if(keyDown("space")&&monkey.y>=315){
    monkey.velocityY = -12;
  }
      monkey.collide(invisibleGround);
  obstacles();
    bananas();
    
    if(monkey.isTouching(bananaGroup)){
    points = points+1;
    monkey.scale=0.2;
      bananaGroup.destroyEach();
    }
    
    
 if(monkey.isTouching(obstaclesGroup)){
  gameState = "end";
 }
  
  }

  console.log(invisibleGround.x);
  
  drawSprites();
  
  fill("green");
  textSize(20);
  text("SCORE: "+score,280,20);
  text("POINTS: "+points,10,20);
  
   if(gameState === "end"){
   
   
   monkey.velocityY=0;
   invisibleGround.velocityX = 0;
        
   
   fill("white");
   text("SCORE: "+score,200,275);
     text("POINTS: "+points,80,275);
   
   obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);   monkey.changeAnimation("monkeyStop",monkeyStop);
   
   obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
 }
  


}
function obstacles(){

   if(frameCount % 80 === 0){

             var obstacle = createSprite(400,326,10,10);
             obstacle.addImage("obstacle",obstacleImage);
             obstacle.scale = 0.15;
             obstacle.velocityX = -(4+score/100);
             obstacle.lifetime = 100;
     
     var rand = Math.round(random(1,4));
     
     switch(rand){
      
             case 1: obstacle.scale = 0.1;
                     break;
             case 2:obstacle.scale = 0.20;
                    break;
             case 3: obstacle.scale = 0.25;
                     break;
             case 4: obstacle.scale = 0.15;
                     break;
             default:break;
     
     }
     
     obstaclesGroup.add(obstacle);
     
   }
   
  
}

function restart(){
        gameState = "play";
        obstaclesGroup.destroyEach();
        monkey.changeAnimation("monkey",monkey_running);
        monkey.scale=0.1;
        score = 0;
        points = 0;

}
function bananas(){
  if(frameCount % 80 === 0){
        var banana = createSprite(400,230,10,10);
        banana.addImage(bananaImage);
        banana.velocityX= -(4+score/100);
        banana.scale=0.09;
        bananaGroup.add(banana);
  }


}

