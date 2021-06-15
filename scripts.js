function preloadImage("img/index/flip.gif")
{
    var img=new Image();
    img.src=url;
};

let headshot = document.getElementById("portrait");
headshot.addEventListener('mouseover', function() {
    headshot.src = "img/index/flip.gif";
})
headshot.addEventListener('mouseout', function() {
    headshot.src = "img/index/NoahPratt.png";
})



var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width  = vw - 17;
ctx.canvas.height = vh * .6;
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
let smile = new Image();
smile.src = "img/index/smile.png"

window.addEventListener('resize', changeSize);

// let runGame = false;
// document.addEventListener('keypress', function() {
//     runGame = !runGame;
// })

function changeSize() {
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    ctx.canvas.width  = vw - 17;
    ctx.canvas.height = vh * .85;
}

function startGame() {
    for (i = 0; i < 10; i++) {
        let amp = (Math.random()+1)*20;
        let freq = (Math.random()+1)*40;
        let w = 30 + Math.random() * 20;
        let x = Math.random() * (canvas.width + 500)-250;
        let y = amp + (Math.random() * (canvas.height-40-amp*2));
        ballArray.push(new Ball(
            x,
            y,
            w,
            2,
            amp,
            freq
        ));
    }
    myTimer = setInterval(gameLoop, 16);
}

function gameLoop() {
    gameUpdate();
    gameDraw();
}

function gameDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < ballArray.length; i++) {
        ballArray[i].draw();
    }
}

function gameUpdate() {
    for(i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

class Ball {
    constructor(x, y, w, speedX, amp, freq) {
        this.x = x;
        this.y = y;
        this.height = y;
        this.w = w;
        this.h = w;
        this.speedX = speedX;
        this.amp = amp;
        this.freq = freq
    }
    update() {
        if (this.x > canvas.width) {
            this.x = (Math.random() * -150)-this.w;
            console.log(this.x);
            console.log(this.y);
        }

		this.x += this.speedX;

        this.y = this.height + this.amp * Math.sin(this.x/this.freq);


	}
	draw() {
		ctx.drawImage(smile, this.x, this.y, this.w, this.h);
	}
}

let frequency = 0;
for(i=0; i<15;i++) {
    freq = (Math.random/2+1)*20;
    console.log(freq);
}

const ballArray = [];
startGame();
