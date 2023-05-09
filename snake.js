let scoreBlock;
let score = 0;

const sizeCell = 16;
const sizeBerry = 8;

const snake = {
	x: 160,
	y: 160,
	dx: sizeCell,
	dy: 0,
	tails: [],
	maxTails: 1
}

let berry = {
	x: 0,
	y: 0
} 
let gameover = false;


let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
drawScore();
randomPositionBerry();
function gameLoop() {
    requestAnimationFrame( gameLoop );
    if (gameover == true){

    } else { 
    let frames = 0;
	while(true){
        frames++;
        if (frames == 100000000){
            break;
        }
    }
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBerry();
	drawSnake();
}
    
}
requestAnimationFrame( gameLoop );

function drawSnake() {
	snake.x += snake.dx;
	snake.y += snake.dy;

	if (snake.x < 0) {
		snake.x = canvas.width - sizeCell;
	} else if ( snake.x >= canvas.width ) {
		snake.x = 0;
	}
	if (snake.y < 0) {
		snake.y = canvas.height - sizeCell;
	} else if ( snake.y >= canvas.height ) {
		snake.y = 0;
	}


	snake.tails.unshift( { x: snake.x, y: snake.y } );

	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}

	snake.tails.forEach( function(el, index){
		context.fillStyle = "#00ff59";
		context.fillRect( el.x, el.y, sizeCell, sizeCell );

		if ( el.x === berry.x && el.y === berry.y ) {
			snake.maxTails++;
			score++;
            drawScore();    
			randomPositionBerry();
		}

		for( let i = index + 1; i < snake.tails.length; i++ ) {
			if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
                gameover = true;
			}

		}

	} );
}


function restart() {
    score = 0;
    gameover = false;
	drawScore();

	snake.x = 160;
	snake.y = 160;
	snake.tails = [];
	snake.maxTails = 1;
	snake.dx = sizeCell;
	snake.dy = 0;

	randomPositionBerry();
}

function drawBerry() {
	context.beginPath();
	context.fillStyle = "#ff0000";
	context.fillRect( berry.x + 4, berry.y + 4, sizeBerry, sizeBerry)
	context.fill();
}

function randomPositionBerry() {
	berry.x = getRandomInt( 0, canvas.width / sizeCell ) * sizeCell;
	berry.y = getRandomInt( 0, canvas.height / sizeCell ) * sizeCell;
}


function drawScore() {
	scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

document.addEventListener("keydown", function (e) {
	if ( e.code == "KeyW" && snake.dy != sizeCell ) {
		snake.dy = -sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyA" && snake.dx != sizeCell ) {
		snake.dx = -sizeCell;
		snake.dy = 0;
	} else if ( e.code == "KeyS" && snake.dy != -sizeCell ) {
		snake.dy = sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyD" && snake.dx!= -sizeCell ) {
		snake.dx = sizeCell;
		snake.dy = 0;
	}
    else if ( e.code == "KeyR") {
		restart();
    }
});