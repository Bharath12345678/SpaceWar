var player,playerImg;
var score =0;
var space;
var blastImg,eBlack,eBlue,eGreen,eRed;
var gameOverImg,RestartImg,spaceImg,laserImg;
var gameOver,Restart;
var lasergroup; 
var b1group;
var b2group;
var ggroup;
var rgroup;

var play =1;
var end =0;
var over =2;
var gameState =play;
var lifes =5;

function preload(){
    playerImg =loadImage("playerShip2_blue_1.png");
    blast =loadImage("blast.png");
    eBlack =loadImage("enemyBlack_1.png");
    eBlue =loadImage("enemyBlue_1.png");
    eGreen =loadImage("enemyGreen_1.png");
    eRed =loadImage("enemyRed_1.png");
    gameOverImg =loadImage("gameOver.png");
    RestartImg =loadImage("Restart.png");
    spaceImg =loadImage("space.png");
    laserImg =loadImage("laser.png");
}

function setup(){
    createCanvas(400,400);

    lasergroup = createGroup();
    b1group = createGroup();
    b2group = createGroup();
    ggroup = createGroup();
    rgroup = createGroup();

    space =createSprite(200,200);
    space.addImage(spaceImg);
    space.scale =1.7;

    player =createSprite(200,360,60,10);
    player.addImage(playerImg);
    player.scale =0.7;

    gameOver =createSprite(185,200);
    gameOver.addImage(gameOverImg);
    gameOver.scale =0.7;
    gameOver.visible =false;

    Restart =createSprite(200,250);
    Restart.addImage(RestartImg);
    Restart.scale =0.7;
    Restart.visible =false;
}

function draw(){
if(gameState ==play){
  player.addImage(playerImg);
  player.x =World.mouseX;  
  space.velocityY =3;
    if(space.y>400){
        space.y =space.height/2;
      }   

    if(keyWentDown("UP_ARROW")){
        createLaser();
      }
    if(b1group.isTouching(player)||b2group.isTouching(player)||ggroup.isTouching(player)||rgroup.isTouching(player)){
        gameState =end;
        lifes =lifes-1;    
      }  
}    else if(gameState ==end){
        space.velocityY=0;
        player.velocityX=0;
//        player.addImage(blast);
        gameOver.visible =false;
        Restart.visible =true;
        b1group.destroyEach();
        b1group.setVelocityEach(0,0);
        b2group.destroyEach();
        b2group.setVelocityEach(0,0);
        ggroup.destroyEach();
        ggroup.setVelocityEach(0,0);
        rgroup.destroyEach();
        rgroup.setVelocityEach(0,0);
        lasergroup.destroyEach();
        lasergroup.setVelocityEach(0,0);
}
    
var select_enemy = Math.round(random(1,4));
      
      if (World.frameCount % 100 ==0) { 
        if (select_enemy == 1) { 
          black1();
        } 
        else if (select_enemy == 2) { 
          blue1();
        } 
        else if (select_enemy == 3) { 
          green1();
        } 
        else { 
          red1();
        }
      } 
      
      if (lasergroup.isTouching(b1group)){
        b1group.destroyEach();
        lasergroup.destroyEach();
        score =score+1;
       } 
      
      if (lasergroup.isTouching(b2group)) {
        b2group.destroyEach();
        lasergroup.destroyEach();
        score =score+2;
      }
        
      if (lasergroup.isTouching(ggroup)) { 
        ggroup.destroyEach(); 
        lasergroup.destroyEach();
        score =score+3;      
        } 
        
      if (lasergroup.isTouching(rgroup)) { 
        rgroup.destroyEach(); 
        lasergroup.destroyEach();
        score =score+4;
        } 
          
if(mousePressedOver(Restart)&&gameState == end)  {
  gameOver.visible =false;
  Restart.visible =false;
  gameState = play;
  score =0;
}    

if(lifes ==0){
   gameState =over;
   gameOver.visible =true;
   Restart.visible =false;
   space.velocityY=0;
   player.velocityX=0;
   player.addImage(blast);
   text("press space bar to restart",150,250);
   b1group.destroyEach();
   b1group.setVelocityEach(0,0);
   b2group.destroyEach();
   b2group.setVelocityEach(0,0);
   ggroup.destroyEach();
   ggroup.setVelocityEach(0,0);
   rgroup.destroyEach();
   rgroup.setVelocityEach(0,0);
   lasergroup.destroyEach();
   lasergroup.setVelocityEach(0,0);
}
 
if(gameState == over && keyWentDown("space")){
   gameState =play;
   score =0;
   lifes =5;
   gameOver.visible =false;
   Restart.visible =false;
  }

drawSprites();
    textSize(20);
    text("Score:"+score,300,30);  
    text("Lifes:"+lifes,25,30);  
      
}

function createLaser(){
    var laser =createSprite(200,320,100,10);  
    laser.addImage(laserImg);  
    laser.velocityY =-3;
    laser.lifetime =200;
    laser.x =player.x;
    
    lasergroup.add(laser);
    }
    
  function black1() {
    var eb = createSprite(Math.round(random(20, 370)),0,10, 10);
    eb.addImage(eBlack);  
    eb.velocityY = 7; 
    eb.lifetime = 150;
    eb.scale = 0.4; 
    
    b1group.add(eb);
    }
  
  function blue1() {
    var ebl = createSprite(Math.round(random(20, 370)),0,10, 10);
    ebl.addImage(eBlue); 
    ebl.velocityY = 7; 
    ebl.lifetime = 150;
    ebl.scale = 0.4; 
    
    b2group.add(ebl);
    }
    
    function green1() {
    var eg = createSprite(Math.round(random(20, 370)),0,10, 10);
    eg.addImage(eGreen); 
    eg.velocityY =7 ; 
    eg.lifetime = 150;
    eg.scale = 0.4;
    
    ggroup.add(eg);
    }
    
    function red1() {
    var er = createSprite(Math.round(random(20, 370)),0,10, 10);
    er.addImage(eRed);
    er.velocityY =7; 
    er.lifetime = 150;
    er.scale = 0.4; 
    
    rgroup.add(er);
    }
  
  


