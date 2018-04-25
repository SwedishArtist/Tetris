const altStop        = document.getElementById('altStop');
const altReset       = document.getElementById('altReset');
const altStart       = document.getElementById('altStart');
const canvas         = document.getElementById('tetris');
const context        = canvas.getContext('2d');
const startButton    = document.getElementById('Button'); // används den här?
let highArr          = [];
let gamestate        = 'quit';
let speedScale       = 0.9;
let speedStart       = 1000;
let gameMode         = ''; 
let powerMode        = 'on';
let power            = 0;
let clickSound       = new Audio('../sound/click.mp3');
let breakSound       = new Audio('../sound/jump.mp3');
let song1            = new Audio('../sound/music/zentrixDFS.mp3')
sentVolume           = sessionStorage.getItem('songVolume');
let currentTimeSong1 = sessionStorage.getItem('song1Time');
song1.currentTime    = currentTimeSong1
altStop.style.visibility = "hidden"; 
altStart.style.visibility = "hidden"; 
altReset.style.visibility = "hidden"; 


if (sentVolume != null) {
	song1.volume = sentVolume;
	volumeSlider.setAttribute('value', sentVolume * 100);
}

song1.play();

song1.addEventListener('timeupdate',function() {
    currentTimeSong1 = song1.currentTime;
}, false);

song1.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

toggleStart();
context.scale(20, 20);


/* funktioner:
setVolume()
sendAudio()
board()
arenaSweep()
collide(arena, player)
createMatrix(w, h)
createPiece(type)
draw()
drawMatrix(matrix, offset)
merge(arena, player)
playerDrop()
playerMove(dir)
arrToUl(root, arr)
restartSweep()
playerReset()
playerRotate(dir)
rotate(matrix, dir)
update(time = 0)
updateScore()
GRUPP knappar
*/
function sendAudio() {
  clickSound.play();
  clickSound.currentTime = 0;
  sessionStorage.setItem('song1Time', currentTimeSong1);
}

volumeSlider.addEventListener('mousemove', setVolume);

function setVolume() {
	song1.volume = volumeSlider.value / 100;
	sessionStorage.setItem('songVolume', song1.volume)
}

function board() {
	context.save();
	context.beginPath();
	context.strokeStyle = '#34495e';
	context.lineWidth = 1;
	context.scale(1/20, 1/20);
	let bw = 240;
	let bh = 400;
	let p = 0;

	for (let i = 0; i <= bw; i += 20) {
		context.moveTo(i + p, p);
		context.lineTo(i + p, bh + p);
		// context.strokeStyle = 'rgb(' + i*10+ ',' + i * 10 + ', 100)';  
		context.stroke();
	}
	for (let i = 0; i <= bh; i += 20) {
		context.moveTo(p, 0.5 + i + p);
		context.lineTo(bw + p, 0.5 + i + p);
	}
	context.stroke();
	context.restore();
	
} 

// TAR BORT FULLA RADER (man får extra poäng för extra rader)

function arenaSweep() {
	let rowCount = 1;
	outer: for (let y = arena.length - 1; y > 0; --y) {
		for (let x = 0; x < arena[y].length; ++x) {
			if (arena[y][x] === 0) {
				continue outer;
			}
		}

		const row = arena.splice(y, 1)[0].fill(0);
		arena.unshift(row);
		++y;
		dropInterval *= speedScale ** rowCount; 
		player.score += rowCount * 10;
		rowCount *= 2;
		breakSound.play();
		breakSound.currentTime = 0;
	}
}

// HINDRAR OBJEKTET FRÅN ATT FLYGA UTANFÖR BANAN.

function collide(arena, player) {
	const [m, o] = [player.matrix, player.pos];
	for (let y = 0; y < m.length; ++y) {
		for (let x = 0; x < m[y].length; ++x) {
			if (m[y][x] !== 0 &&
				(arena[y + o.y] &&
				arena[y + o.y][x + o.x]) !== 0) {
				return true;
			}
		}
	}
	return false;
}

// SKAPAR ARENAN

function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

// SKAPAR OBJEKTENS FORM.

function createPiece(type) {
	if (type === 'T') {
		return [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0],
		];
	} else if (type === 'O') {
		return [	
			[2, 2],
			[2, 2],
		]; 
	} else if (type === 'L') {
		return [	
			[0, 3, 0],
			[0, 3, 0],
			[0, 3, 3],
		]; 
	} else if (type === 'J') {
		return [	
			[0, 4, 0],
			[0, 4, 0],
			[4, 4, 0],
		]; 
	} else if (type === 'I') {
		return [	
			[0, 5, 0, 0],
			[0, 5, 0, 0],
			[0, 5, 0, 0],
			[0, 5, 0, 0],
		]; 
	} else if (type === 'S') {
		return [	
			[0, 6, 6],
			[6, 6, 0],
			[0, 0, 0],
		]; 
	} else if (type === 'Z') {
		return [	
			[7, 7, 0],
			[0, 7, 7],
			[0, 0, 0],
		]; 
	} else if (type === '.') {
		return [	
			[0, 0, 0],
			[0, 8, 0],
			[0, 0, 0],
		]; 
	} else if (type === '2') {
		return [	
			[0, 9, 0],
			[0, 9, 0],
			[0, 0, 0],
		]; 
	}
}

// SKAPAR BAKGRUNDEN.

function draw() {
	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);
	board();

	drawMatrix(arena, {x: 0, y: 0});
	drawMatrix(player.matrix, player.pos);
}

// RITAR VARJE FIGUR (OBJEKT).

function drawMatrix(matrix, offset) {
	// console.log(matrix);
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				context.fillStyle = colors[value];
				context.fillRect(x + offset.x, 
							y + offset.y, 
							1, 1);
			}
		});
	});
}

// SAMMANFOGAR BITARNA NÄR DE LANDAR.

function merge(arena, player) {
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value; 
			}
		});
	});
}

// GÖR SÅ ATT OBJEKTET RÖR SIG.

function playerDrop() {
	player.pos.y++;
	if (collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		playerReset();
		arenaSweep();
		updateScore();
	}
	dropCounter = 0;
}

function playerMove(dir) {
	player.pos.x += dir;
	if (collide(arena, player)) {
		player.pos.x -= dir;
	}
}

// SKAPAR UL
let div = document.getElementById('myList');

function arrToUl(root, arr) {
	let myNode = document.getElementById('myList');
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}

	let ul = document.createElement('ul');
	let li;
  
	root.appendChild(ul); // append the created ul to the root

	arr.forEach(function(item) {
		if (Array.isArray(item)) { // if it's an array
			arrToUl(li, item); // call arrToUl with the li as the root
			return;
		}
    
		li = document.createElement('li'); // create a new list item
		li.appendChild(document.createTextNode(item)); // append the text to the li
		ul.appendChild(li); // append the list item to the ul
	});
}


// ÄNDRA PLAYER RESET OM DENNA ÄNDRAS

function restartSweep() {
	arena.forEach(row => row.fill(0));
	highArr.push(player.score);
	highArr.sort(function(a, b) {
		return b - a;
	});
	highArr.length = 5;
	arrToUl(div, highArr);
	player.score = 0;
	updateScore();
}



// STARTAR OM POÄNG. FLYTTAR UPP SPELAREN TILL TOPPEN OCH STARTAR OM IFALL ARENAN ÄR FYLLD. !!!!!SKAPAR BITAR!!!!!
let piece = undefined;
let nextPiece = undefined;

function playerReset() {
	let pieces  = '';
	if (gameMode === 'easy') {
		pieces  = 'ILJOTSZ.2';
	} else if (gameMode === 'medium' || gameMode === 'hard') {
		pieces  = 'ILJOTSZ';
	}
	piece = createPiece(pieces[pieces.length * Math.random() | 0]);
	if (power === 1) {
		piece = createPiece('I');
		power = 0;
	}
	if (dropCounter !== 0){
		console.log(dropCounter);
	}
	// nextPiece = piece = createPiece(pieces[pieces.length * Math.random() | 0]);
	player.matrix = piece;
	player.pos.y  = 0;
	player.pos.x  =  (arena[0].length / 2 | 0) -
					(player.matrix[0].length / 2 | 0);
	if (collide(arena, player)) {
		arena.forEach(row => row.fill(0));
		highArr.push(player.score);
		highArr.sort(function(a, b) {
			return b - a;
		});
		highArr.length = 5;
		arrToUl(div, highArr);
		player.score = 0;
		updateScore();
		dropInterval = speedStart;
	}
}

// GÖR SÅ ATT OBJEKTET KAN ROTERA.

function playerRotate(dir) {
	const pos = player.pos.x;
	let offset = 1;
	rotate(player.matrix, dir);
	while (collide(arena, player)) {
		player.pos.x += offset;
		offset = -(offset + (offset > 0 ? 1 : -1));
		if (offset > player.matrix[0].length) {
			rotate(player.matrix, -dir);
			player.pos.x = pos;
			return;
		}
	}
}

// ROTERAR
function rotate(matrix, dir) {
	for (let y = 0; y < matrix.length; ++y) {
		for (let x = 0; x < y; ++x) {
			[
				matrix[x][y],
				matrix[y][x],
			] = [
				matrix[y][x],
				matrix[x][y],
			];
		}
	}

	if (dir > 0) {
		matrix.forEach(row => row.reverse());
	} else {
		matrix.reverse();
	}

}



let dropCounter  = 0;
let dropInterval = speedStart;

let lastTime = 0;
// UPPDATERAR SIDAN.

function update(time = 0) {
	const deltaTime = time - lastTime; // Fattar inte hur delta time och dropCounter fungerar
	lastTime = time;

	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		playerDrop();
	}

	// FÖRKLARAR I VILKET LÄGE SPELET BEFINNER SIG I.


	if (gamestate === 'playing') {
		requestAnimationFrame(update);
	} 

	draw();
}

function updateScore() {
	document.getElementById('score').innerText = player.score;
}


// BITARNAS FÄRGER.

const colors = [
	null,
	'#ec7063',
	'#2471a3',
	'#8e44ad', 
	'#148f77',
	'#f1c40f',
	'orange',
	'#b03a2e',
	'#e842f4',
	'#00ff7f',
];

// SKAPAR SPELPLAN OCH PÅBÖRJAR RÄKNING AV POÄNGEN.

const arena = createMatrix(12, 20); // Kan man kalla den här som funktion eller göra en modifierad funktion som sätter alla slots till 0 för att undvika buggar?

const player = {
	pos: {x: 0, y: 0},
	matrix: null,
	score: 0,
};

// KNAPP-FUNKTION FÖR OBJEKTETS RÖRELSE.

document.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		playerMove(-1);
	} else if (event.keyCode === 39) {
		playerMove(1);
	} else if (event.keyCode === 40) {
		playerDrop();
	} else if (event.keyCode === 81) {
		playerRotate(-1);
	} else if (event.keyCode === 87) {
		playerRotate(1);
	} else if (event.keyCode === 69 && powerMode === 'on' && power === 0 && player.score >= 40) { // ( ͡° ͜ʖ ͡°)
		power = 1;
		player.score -= 40
	}
});


function toggleStart() {
	let s = document.getElementById('altStart');
	if (gamestate === 'quit' || gamestate === 'paused') {
		s.style.display = 'block';
	} else {
		s.style.display = 'none';
	}
}

function togglePause() {
	let p = document.getElementById('paused');
	if (gamestate === 'paused') {
		p.style.display = 'block';
	} else {
		p.style.display = 'none';
	}
}

// START, STOP OCH RESET KNAPPAR

function startFunc() {
	altStop.style.visibility = "visible"; 
	if (gamestate === 'paused') {
		gamestate = 'playing';
		toggleStart();
		update();
		window.scrollTo(0, 500);
	} else if (gamestate === 'quit') {
		playerReset();
		updateScore();
		gamestate = 'playing';
		toggleStart();
		update();
		clickSound.play();
		clickSound.currentTime = 0;
		window.scrollTo(0, 500);
	}
	
}
document.getElementById('altStart').addEventListener('click', startFunc, false);

function stopFunc() {
	let status = undefined;
	if (gamestate === 'paused') {
		gamestate = 'playing';
		status = 'Pause';
		togglePause();
		update(); 
		clickSound.play();
		clickSound.currentTime = 0;
		window.scrollTo(0, 500);
	} else {
		gamestate = 'paused';
		status = 'Unpause';
		togglePause();
		clickSound.play();
		clickSound.currentTime = 0;
	}
	document.getElementById('altStop').innerHTML = status;	
}
document.getElementById('altStop').addEventListener('click', stopFunc, false);

function resetFunc() {
	restartSweep();
	arenaSweep();
	playerReset();
	updateScore();
	player.pos.y  = 0;
	player.pos.x  =  (arena[0].length / 2 | 0) -
					(player.matrix[0].length / 2 | 0);
	dropInterval = speedStart;
	update();
	clickSound.play();
	clickSound.currentTime = 0;
}

document.getElementById('altReset').addEventListener('click', resetFunc, false);

function easy() {
	altReset.style.visibility = "visible";
	altStart.style.visibility = "visible";
	speedScale = 0.97;
	speedStart = 1000;
	gameMode   = 'easy';
	clickSound.play();
	clickSound.currentTime = 0;
}
document.getElementById('easy').addEventListener('click', easy, false);

function medium() {
	altReset.style.visibility = "visible";
	altStart.style.visibility = "visible";
	speedScale = 0.95;
	speedStart = 1000;
	gameMode   = 'medium';
	clickSound.play();
	clickSound.currentTime = 0;
}
document.getElementById('medium').addEventListener('click', medium, false);

function hard() {
	altReset.style.visibility = "visible";
	altStart.style.visibility = "visible";
	speedScale = 0.9;
	speedStart = 700;
	gameMode   = 'hard';
	clickSound.play();
	clickSound.currentTime = 0;
}
document.getElementById('hard').addEventListener('click', hard, false);