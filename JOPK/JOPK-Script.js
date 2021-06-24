// Noah Pratt, nlkpratt, #20694781
// GBDA 301 Final Project, Deliverable 2

// CANVAS SETUP ================================================================

let canvas = document.getElementById("myCanvas"); // establish the canvas
let ctx = canvas.getContext("2d");
ctx.canvas.width  = 400;
ctx.canvas.height = 400;
let background = new Image();
background.src = "JOPK-img/JOPK_bg.png";

// GAME VARIABLES ==============================================================

let playerX = canvas.width/2; // controls the player
let playerY = canvas.height/2;
let playerSize = 25;
let speedX = 0;
let speedY = 0;

let bulletArray = []; // controls the bullets
let bulletSpeedX = 0;
let bulletSpeedY = 0;
let lastBullet = 0;
let bulletRate = 20; // every 20 frames
let fire = false; // true when key is pressed

let enemyArray = []; // controls the enemies
let gate = [{x: canvas.width/2 + 30, y: 0}, // determines where enemies enter
						{x: canvas.width, y: canvas.height/2 + 30},
						{x: canvas.width/2 + 30, y: canvas.height},
						{x: 0, y: canvas.height/2 + 30}];
let lastEnemy = 0;
let enemyRate = 250; // every 250 frames

let gameTimer = 60 * 60; // 60 seconds
let gameOn = false; // used for game
let gamePause = false; // used when instructions buttons are pressed
let splashScreenOn = true;
let gameMessage = "PRESS SPACEBAR TO START";
let livesCounter = 3;

let selectDifficulty = false;
let difficultySelected = 0; // controls which difficulty is to be played
let difficulty = []; // contains each difficulty with specific key-value pairs
difficulty[0] = {enemySpeed: 0.2, enemyRate: 200, enemiesToMake: 3, bulletRate: 10, livesCounter: 5};
difficulty[1] = {enemySpeed: 0.4, enemyRate: 250, enemiesToMake: 6, bulletRate: 20, livesCounter: 3};
difficulty[2] = {enemySpeed: 0.6, enemyRate: 300, enemiesToMake: 9, bulletRate: 25, livesCounter: 1};
let difficultySelector = [190, 215, 240]; // y values of the triangle on the selection page


// IMPORT IMAGES AND MUSIC =====================================================

let music = document.getElementById("music"); // game music
music.loop = true;
let steps = document.getElementById("steps"); // player steps
steps.loop = true;
let bang = document.getElementById("bang"); // gun fired
let start = document.getElementById("start"); // when game starts
let death = document.getElementById("death"); // when player dies
let win = document.getElementById("win"); // when game is won

let splashScreen = new Image(); // splash image
splashScreen.src= "JOPK-img/JOPK_logo.png";
let inst = new Image();
inst.src = "JOPK-img/Instructions.png";
let badGuy = new Image(); // enemy
badGuy.src="JOPK-img/BadGuy.png";
let spike = new Image();
spike.src="JOPK-img/Spike.png";
let enemyHit = new Image();
enemyHit.src ="JOPK-img/EnemyHit.png";
let clock = new Image(); // clock by timer
clock.src="JOPK-img/Clock.png";
let lives = new Image(); // lives symbol
lives.src="JOPK-img/Lives.png";

let hero = new Image(); // hero spritesheet
hero.src = "JOPK-img/Hero.png";
let playerFrameToShow = 0;
let heroSize = 0;
hero.onload = function() {
	heroSize = hero.width/4
};

document.addEventListener("keydown", keyDownHandler, false); // keyboard events
document.addEventListener("keyup", keyUpHandler, false);

document.getElementById("instructions").style = "display: none"; // instructions buttons
document.getElementById("resumeGameButton").style= "display: none";

window.addEventListener('load', startGame);

// GAME FUNCTIONS ==============================================================

function startGame() {
	console.log("in startgame");
    myTimer = setInterval(gameLoop, 16); // 60 times / second
}

function gameLoop() {
	if (splashScreenOn == true){
		displaySplashScreen();
	} else if (splashScreenOn == false && selectDifficulty == true) {
		displaySelectDifficulty();
	}	else if (gameOn == true && gamePause == false) {
    gameUpdate();
    gameDraw();
	} else {
    gameDraw();
  }
}

function displaySplashScreen(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(splashScreen, 50, 0, canvas.width - 100, canvas.height - 100);

	ctx.font = "24px VT323";
	ctx.fillStyle = "#bc334a";
	ctx.textAlign = "center";
	ctx.fillText(gameMessage, canvas.width/2, 300);
	ctx.drawImage(inst, canvas.width/2-inst.width, 315, inst.width * 2, inst.height * 2);
}

function displaySelectDifficulty(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.font = "24px VT323";
	ctx.fillStyle = "#fff";
	ctx.textAlign = "center";
	ctx.fillText("CHOOSE DIFFICULTY", canvas.width/2, 150);

	ctx.font = "16px VT323";
	ctx.textAlign = "left";
	ctx.fillText("EASY", canvas.width/2, 200);
	ctx.fillText("NORMAL", canvas.width/2, 225);
	ctx.fillText("HARD", canvas.width/2, 250);

	// draws a triangle beside specific difficulty
	ctx.beginPath();
	ctx.moveTo(150, difficultySelector[difficultySelected]);
	ctx.lineTo(160, difficultySelector[difficultySelected] + 5);
	ctx.lineTo(150, difficultySelector[difficultySelected] + 10);
	ctx.closePath();

	// the fill color
	ctx.fillStyle = "#FFF";
	ctx.fill();

	ctx.font = "24px VT323";
	ctx.textAlign = "center";
	ctx.fillText ("PRESS ENTER TO START", canvas.width/2, 300);
}


function gameDraw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 30, 30, canvas.width-30, canvas.height-30); // draws playfield

	for(i = 0; i < enemyArray.length; i++){
		enemyArray[i].draw(); // draws all enemies
	}

	if (gameTimer > 0){
		ctx.fillStyle ="green";
		ctx.fillRect(40, 20, (canvas.width - 40) * (gameTimer/3600), 5); // draws timer
	}
	ctx.drawImage(clock, 30, 10, 20, 20); // draws clock image

	ctx.font = "24px VT323";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText(livesCounter + "x", 15, 45); // draws lives counter
	ctx.drawImage(lives, 2, 50, 28, 28); // draws lives symbol

	ctx.fillStyle = "black";
	for(i = 0; i < bulletArray.length; i++){
		bulletArray[i].draw(); // draws all bullets
  }

	// draws the hero based on specific frame
	ctx.drawImage(hero, heroSize * playerFrameToShow, 0, heroSize, heroSize, playerX - playerSize/2, playerY - playerSize/2, playerSize, playerSize);

	ctx.fillText(gameMessage, canvas.width/2 + 30, 350);
}

function gameUpdate() {
  playerX += speedX; // move the player
  playerY += speedY;
	if(speedX != 0 || speedY != 0){ // play sound if they're moving
		steps.play();
	} else {
		steps.pause();
	}

	for(i = 0; i < bulletArray.length; i++){ // update the bullets
		bulletArray[i].update();
		if (bulletArray[i].x < 0 || bulletArray[i].x > canvas.width || // get rid of it if it's off screen
			bulletArray[i].y < 0 || bulletArray[i].y > canvas.width) {
		  bulletArray.splice(i,1);
		}
	}

	for(i = 0; i < enemyArray.length; i++){ // updates enemies
		enemyArray[i].update();
		if (enemyArray[i].hitFrameCount > 150){
			enemyArray.splice(i, 1);
		}
	}

	for(i = 0; i < bulletArray.length; i++){ // bullet / enemy hit test
		for(j = 0; j < enemyArray.length; j++){
			if(enemyArray[j].alive == true &&
				 bulletArray[i].x + 5 > enemyArray[j].x - 10 &&
				 bulletArray[i].x < enemyArray[j].x + 10 &&
			 	 bulletArray[i].y + 5 > enemyArray[j].y - 10 &&
			 	 bulletArray[i].y < enemyArray[j].y + 10){ // if they hit...
					 bulletArray.splice(i, 1); // get rid of both of them
					 if (enemyArray[j].hp == 1) {
					 	enemyArray[j].alive = false;
					} else {
						enemyArray[j].hp--;
					}
			}
		}
	}

	for(i = 0; i < enemyArray.length; i++){ // enemy / player hit test
		if (enemyArray[i].alive == true &&
				enemyArray[i].x + 10 > (playerX - playerSize/2) &&
			  enemyArray[i].x - 10 < playerX + (playerSize/2) &&
		 	  enemyArray[i].y + 10 > playerY - playerSize/2 &&
	 	 	  enemyArray[i].y - 10 < playerY + playerSize/2) { // if enemy hits player
			if (livesCounter > 1) { // if there are lives remaining
				resetGame(); // reset general game variables
				livesCounter--; // reduce a life
				death.play(); // play death sound
				gameMessage = "LIVES REMAINING: " + livesCounter; // set game message to show
				setTimeout(loseLife, 3500); // set a timeout, afterwards run loseLife()
				function loseLife(){
					gameMessage = ""; // reset game message
					gameOn = true; // turn the game back on
					music.play();
				}
				clearTimeout(); // clear the timeout
			} else { // if there are no more lives
				resetGame(); // reset general game variables
				death.play(); // play death sound
				gameMessage = "YOU LOSE!"; // set game message to show
				setTimeout(endGame, 3500); // set a timeout, afterwards run endGame()
				function endGame(){
					gameMessage = "PRESS SPACEBAR TO START"; // set game message
					splashScreenOn = true; // show slash screen
				}
				clearTimeout(); // clear the timeout
			}
		}
	}

  if (playerX < 52 + playerSize/2) { // keeps player on screen
    playerX = 52 + playerSize/2;
  } else if (playerX + playerSize > canvas.width - 22 + playerSize/2) {
    playerX = (canvas.width - 22 + playerSize/2) - playerSize;
  } else if (playerY < 52 + playerSize/2) {
    playerY = 52 + playerSize/2;
  } else if (playerY + playerSize > canvas.height - 22 + playerSize/2) {
    playerY = (canvas.height - 22 + playerSize/2) - playerSize;
  }

	if (lastBullet > difficulty[difficultySelected].bulletRate && fire){ // if bullet rate is set to fire, and key is pressed...
		// make a new bullet from the player's position
		bulletArray.push(new Bullet(playerX - 2.5, playerY - 2.5, bulletSpeedX, bulletSpeedY));
		bang.play();
		lastBullet = 0; // reset the bullet rate timer
	}

	if (lastEnemy > difficulty[difficultySelected].enemyRate && gameTimer > 0) { // makes new enemies if game timer is still going
		let enemiesToMake = Math.floor(Math.random() * difficulty[difficultySelected].enemiesToMake) + 3; // pick a random number from 3 - 9
		for(i = 0; i < enemiesToMake; i++){ // make that many enemies
			let pickGate = Math.floor(Math.random() * gate.length); // pick a gate for them to enter from
			let buffer = Math.floor(Math.random() * 3) * 20 - 20; // add a buffer between the enemies
			let makeSpike = false;
			if (Math.floor(Math.random() * 10) == 1) {
				makeSpike = true;
			}
			enemyArray.push(new Enemy(gate[pickGate].x + buffer, gate[pickGate].y - buffer, pickGate, makeSpike));
		}
		lastEnemy = 0; // reset the enemy rate timer
	}

	if(gameTimer <=0) { // if the timer has run out
		gameTimer = 0; // keep it at 0
		if (enemyArray.length <= 0) { // if there are no more enemies remaining
			resetGame(); // reset the game
			win.play(); // play the win sound
			gameMessage = "YOU WIN!"; // set game message
			setTimeout(endGame, 3500); // set a timeout, afterwards run endGame
			function endGame(){
				gameMessage = "PRESS SPACEBAR TO START";
				splashScreenOn = true;
			}
			clearTimeout(); // clear the timeout
		}
	}

	if (gameTimer > 0){ // if there's still time remaining
		gameTimer--; // reduce the time remaining
	}
	lastBullet++; // update bullet rate
	lastEnemy++; // update enemy rate
}

function resetGame(){ // resets game variables
	music.pause(); // pauses game music
	steps.pause(); // pauses steps
	gameOn = false; // stop the game
	bulletArray = []; // reset the bullets
	enemyArray = []; // reset the enemies
	lastBullet = 0; // reset the bullet rate
	lastEnemy = 0; // reset the enemy rate
}

function keyDownHandler(e) {
	e.preventDefault();
    if (e.keyCode == 87) { // W key
      speedY = -2; // make the player move up
			playerFrameToShow = 1; // show player moving up frame
    } else if (e.keyCode == 83) { // S key
      speedY = 2; // move the player down
			playerFrameToShow = 0; // show player at normal frame
    } else if (e.keyCode == 65) { // A key
      speedX = -2; // move the player left
			playerFrameToShow = 3; // show player moving left frame
    } else if (e.keyCode == 68) { // D key
      speedX = 2; // move the player right
			playerFrameToShow = 2; // show player moving right frame
    }

		if (e.keyCode == 38) { // UP key
			bulletSpeedY = -4; // set bullet speed (if made) to up
			fire = true; // fire a bullet (if bullet rate is ready)
		} else if (e.keyCode == 40) {
			bulletSpeedY = 4; // set bullet speed (if made) to down
			fire = true; // fire a bullet (if bullet rate is ready)
		} else if (e.keyCode == 37) {
			bulletSpeedX = -4; // set bullet speed (if made) to left
			fire = true; // fire a bullet (if bullet rate is ready)
			playerFrameToShow = 3 // show player with gun pointing left
		} else if (e.keyCode == 39) {
			bulletSpeedX = 4; // set bullet speed (if made) to right
			fire = true; // fire a bullet (if bullet rate is ready)
			playerFrameToShow = 2 // show player with gun pointing right
		}

		if (e.keyCode == 32 && splashScreenOn && gamePause == false) { // spacebar, only if splash screen is showing
			splashScreenOn = false; // turn off splash screen
			selectDifficulty = true;
		}

	if (selectDifficulty) {
		if (e.keyCode == 38 || e.keyCode == 87) {
			if (difficultySelected > 0){
				difficultySelected--;
			}
		}
		if (e.keyCode == 40 || e.keyCode == 83) {
			if (difficultySelected < 2) {
				difficultySelected++;
			}
		}
		if (e.keyCode == 13 && gamePause == false) {
			selectDifficulty = false;
			gameOn = true; // turn on game
			music.load(); // (re)load the game music
			music.play(); // play the game music
			start.play(); // play start music
			gameMessage = ""; // clear game message
			bulletArray = []; // reset bullet array
			enemyArray = []; // reset enemy array
			livesCounter = difficulty[difficultySelected].livesCounter; // reset lives
			gameTimer = 60 * 60; // set timer to 60 seconds
			playerX = canvas.width/2; // set player to middle of play field
			playerY = canvas.height/2;
		}
	}


}

function keyUpHandler(e){ // when a key is released
  if (e.keyCode == 87 || e.keyCode == 83) { // W or S key
    speedY = 0; // stop from moving vertically
  } else if (e.keyCode == 65 || e.keyCode == 68) { // A or D key
    speedX = 0; // stop from moving horizontally
		playerFrameToShow = 0; // show normal player frame
  }

	if (e.keyCode == 38 || e.keyCode == 40) { // UP or DOWN key
		bulletSpeedY = 0; // reset bullet speed vertically
		fire = false; // stop firing bullets
	} else if (e.keyCode == 37 || e.keyCode == 39){ // LEFT or RIGHT key
		bulletSpeedX = 0; // reset bullet speed horizontally
		fire = false; // stop firing bullets
		playerFrameToShow = 0; // show normal player frame
	}
}

// CLASSES =====================================================================

class Bullet {
	constructor(x, y, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.speedY = speedY;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;
	}

	draw() {
		ctx.fillStyle = "#000";
		ctx.fillRect(this.x, this.y, 5, 5);
	}
}

let entryX = 100;
let entryY = 100;
let entrySize = 200;
class Enemy {
	constructor(x, y, gateNumber, spike){
		this.x = x;
		this.y = y;
		this.speed = (Math.random() / 2) + difficulty[difficultySelected].enemySpeed;
		this.alive = true;
		this.frame = 0;
		this.step = false;
		this.entering = true;
		if(gateNumber % 2){
			this.sideEntry = true;
		} else {
			this.sideEntry = false;
		}
		this.hp = 1;

		if (spike == true) { // if the enemy is a spikeball...
			this.stopped = false; // controls when it's stopped
			this.spike = spike; // calls itself a spikeball
			this.xStop = (Math.random() * 310) + 70; // pick a random spot to run to
			this.yStop = (Math.random() * 310) + 70;
			this.xStopped = false; // controls when it's stopped x position
			this.yStopped = false;
			this.stopping = false; // used for animating
			this.stopFrame = 100; // controls stopping animation
			this.hp = 2; // original HP
		}

		this.hitFrame = 0; // controls hit animation
		this.hitFrameCount = 0;
	}

	update(){
		if (this.alive){ // if the enemy is alive
		if(this.entering){ // enters the play field quickly
			if(this.sideEntry){
				if (this.x + 5 < entryX){
					this.x += 1.5;
				} else if (this.x > entryX + entrySize) {
					this.x -= 1.5;
				} else {
					this.entering = false;
				}
			} else {
				if(this.y + 5 < entryY){
					this.y += 1.5;
				} else if (this.y > entryY + entrySize) {
					this.y -= 1.5;
				} else {
					this.entering = false;
				}
			}
		} else if (this.spike == true) { // if it's a spikeball...
			if (this.xStopped == false && this.x < this.xStop) { // move to its spot
					this.x += 1;
			} else if (this.xStopped == false && this.x > this.xStop) {
					this.x -= 1;
			} else if (this.yStopped == false && this.y < this.yStop) {
					this.y += 1;
			} else if (this.yStopped == false && this.y > this.yStop) {
					this.y -= 1;
			}
			// when it's there, stop
			if (this.xStopped == false && this.x > this.xStop - 5 && this.x < this.xStop + 5) {
				this.xStopped = true;
			}
			if (this.yStopped == false && this.y > this.yStop - 5 && this.y < this.yStop + 5) {
				this.yStopped = true;
			}
			// if it's there, animate to stop, get 7HP
			if (this.xStopped == true && this.yStopped == true && this.stopped == false){
				this.stopped = true;
				this.stopping = true;
				this.hp = 7;
			}
		}	else { // if not a spike, chase player
			if(playerX + playerSize/2 > this.x + 10){
				this.x += this.speed;
			} else if (playerX + playerSize/2 < this.x + 10){
				this.x -= this.speed;
			}
			if(playerY + playerSize/2 > this.y + 10){
				this.y += this.speed;
			} else if (playerY + playerSize/2 < this.y + 10){
				this.y -= this.speed;
			}
		}
	}
		this.frame++; // controls animations
		if (this.alive){
		if (this.frame > 10) {
			this.frame = 0;
			if (this.spike == true) {
				if(this.stopping == true && this.stopFrame < 250){
					this.stopFrame += 50;
				}
			}
			if (this.step == true){
				this.step = false;
			} else {
				this.step = true;
			}
		}
	} else {
		this.hitFrameCount++;
	}
		if (this.frame > 10) {
				this.frame = 0;
				if (this.hitFrame < 250) {
					this.hitFrame += 50;
				}
			}
		}


	draw(){
		ctx.fillStyle = "red";
		if (this.alive == false) {
			ctx.drawImage(enemyHit, this.hitFrame, 0, 50, 50, this.x - 10, this.y - 10, 20, 20);
		} else {
			if (this.stopped){
				ctx.drawImage(spike, this.stopFrame, 0, 50, 50, this.x - 10, this.y - 10, 20, 20);
			} else if (this.step == true){
				if (this.spike == true){
					ctx.drawImage(spike, 0, 0, 50, 50, this.x - 10, this.y - 10, 20, 20);
				} else {
					ctx.drawImage(badGuy, 0, 0, 40, 40, this.x - 10, this.y - 10, 20, 20);
				}
			} else {
				if (this.spike == true){
					ctx.drawImage(spike, 50, 0, 50, 50, this.x - 10, this.y - 10, 20, 20);
				} else {
					ctx.drawImage(badGuy, 40, 0, 40, 40, this.x - 10, this.y - 10, 20, 20);
				}
			}
		}
	}
}

// WEBSITE/TUTORIAL FUNCTIONS ==================================================

function showInstructions() {
	document.getElementById("instructions").style = "display: initial";
	document.getElementById("instructionsButton").style = "display: none";
	document.getElementById("resumeGameButton").style = "display: initial";
	gamePause = true;
	gameMessage = "PAUSED";
}

function resumeGame() {
	document.getElementById("instructions").style = "display: none";
	document.getElementById("instructionsButton").style = "display: inline";
	document.getElementById("resumeGameButton").style= "display: none";
	gamePause = false;
	gameMessage = "";
	canvas.focus();
}
