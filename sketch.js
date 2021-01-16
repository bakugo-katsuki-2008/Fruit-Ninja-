//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;


function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  gameOverImage = loadImage("gameover.png")
  monsterImage = loadImage("alien1.png")
  knifeSound = loadSound("knifesound.mp3")
  gameOverSound = loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  score = 0
  fruitGroup = new Group();
  enemyGroup = new Group();

  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
}

function draw() {
  background("lightblue");
  
 if (gameState === PLAY){
    fruits();
    enemy();
    
    knife.y = World.mouseY;
    knife.x = World.mouseX;
    
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score = score + 2;
      knifeSound.play();
    }
    
    if (enemyGroup.isTouching(knife)){
      gameState = END
      gameOverSound.play();
    }

  }
  
  if(gameState === END){
    knife.addImage(gameOverImage);
    knife.x = 300;
    knife.y = 300;
    knife.scale = 2
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    enemyGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
  }

  drawSprites();

  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite (600,200,20,20);
    fruit.scale = 0.2
      
    r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1Image);  
    }else if (r == 2){
      fruit.addImage(fruit2Image);
    }else if (r == 3){
      fruit.addImage(fruit3Image);
    }else {
      fruit.addImage(fruit4Image);
      }
      
    fruit.y = Math.round(random(50,340));
      
    fruit.velocityX = -(8 + (score/4))
    fruit.setLifetime = 100;
      
    fruitGroup.add(fruit);
    }  }

function enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(600,200,20,20);
    monster.addImage(monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8 + (score/10));
    monster.setLifetime = 50;  
    
    enemyGroup.add(monster);
    } 
  }

