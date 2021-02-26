var mainHero, hero1, hero2, hero3, hero4;
var backImage, captAm, hulk, antMan, spidMan, thor;
var coinImg, rockImg, puddleImg, rockGroup, coinGroup, puddleGroup;
var gameOver, restart, gameOverImg, restartImg;
var x = 70;
var rand;
var gameState = "play";

function preload() {

  backImage = loadImage("images/track.jpg");

  captAm = loadImage("images/captam.png");
  hulk = loadImage("images/hulk.png");
  antMan = loadImage("images/antman.png");
  spidMan = loadImage("images/spiderman.png");
  thor = loadImage("images/thor.png");

  rockImg = loadImage("images/rock.png");
  coinImg = loadImage("images/coin.png");
  puddleImg = loadImage("images/puddle.png");

}

function setup() {
  createCanvas(1500,500);
  
  track = createSprite(100,250,1600,500);
  track.x = track.width/2
  track.addImage(backImage);
  track.velocityX = -2;
  track.scale = 2.5;
  
  mainHero = createSprite(x,250,10,10);
  mainHero.shapeColor = 'blue';
  
  rockGroup = createGroup();
  puddleGroup = createGroup();
  coinGroup = createGroup();

  gameOver = createSprite(750,250);
  gameOver.visible = false;
  restart = createSprite(750,300);
  restart.visible = false;
}

function draw() {
  background(0,244,233);

  if (gameState === "play") {

    if(track.x < 550) {
      track.x = 950
    }

    if(keyIsDown(RIGHT_ARROW)) {
      mainHero.x = mainHero.x + 5;
    }

    if(keyIsDown(UP_ARROW)) {
      mainHero.y = mainHero.y - 5;
    }

    if(keyIsDown(DOWN_ARROW)) {
      mainHero.y = mainHero.y + 5;
    }

    rand = Math.round(random(1,3));
    if (rand === 1){
      spawnRocks();
    } else if (rand === 2){
      spawnCoins();
    } else {
      spawnPuddles();
    }

    var obj = Math.round(random(1,4));
    if (frameCount%150 === 0) {
      if (obj === 1) {
        object1();
      } else if (obj === 2) {
        object2();
      } else if (obj === 3) {
        object3();
      } else {
        object4();
      }
    }

    if (mainHero.isTouching(puddleGroup) || 
        mainHero.isTouching(rockGroup)) {
      gameState = "end";
    }
  }

  if (gameState === "end") {
    gameOver.visible = true;
    restart.visible = true;
    track.velocityX = 0;
    rockGroup.setVelocityXEach(0);
    puddleGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    rockGroup.destroyEach();
    coinGroup.destroyEach();
    puddleGroup.destroyEach();
    hero1.velocityX = 0;
    hero2.velocityX = 0;
    hero3.velocityX = 0;
    hero4.velocityX = 0;
  }

  drawSprites();
}

function spawnRocks() {
  if(frameCount%100===0) {
    var rock = createSprite(1500,Math.round(random(20,480)),10,10);
    rock.addImage(rockImg);
    rock.scale = 0.04;
    rock.velocityX = -4;
    rock.lifetime = 375;
    rockGroup.add(rock);
  }
}

function spawnCoins() {
  if(frameCount%150===0) {
    var coin = createSprite(1500,Math.round(random(20,480)),10,10);
    coin.addImage(coinImg);
    coin.scale = 0.04;
    coin.velocityX = -4;
    coin.lifetime = 375;
    coinGroup.add(coin);
  }
}

function spawnPuddles() {
  if(frameCount%200===0) {
    var puddle = createSprite(1500,Math.round(random(20,480)),10,10);
    puddle.addImage(puddleImg);
    puddle.scale = 0.07;
    puddle.velocityX = -4;
    puddle.lifetime = 375;
    puddleGroup.add(puddle);
  }
}

function object1() {
  hero1 = createSprite(x,Math.round(random(50,450)),10,10);
  hero1.velocityX = 3;
}

function object2() {
  hero2 = createSprite(x,Math.round(random(50,450)),10,10);
  hero2.velocityX = 3;
}

function object3() {
  hero3 = createSprite(x,Math.round(random(50,450)),10,10);
  hero3.velocityX = 3;
}

function object4() {
  hero4 = createSprite(x,Math.round(random(50,450)),10,10);
  hero4.velocityX = 3;
}