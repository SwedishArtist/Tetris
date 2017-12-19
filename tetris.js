const canvas      = document.getElementById('tetris');
const context     = canvas.getContext('2d');
const startButton = document.getElementById('Button');
let highArr       = [];
let gamestate     = 'quit'

context.scale(20, 20);

/*
function grid() {
	context.strokeStyle = white;
	context.lineWidth   = 4;
	for (i=0; i <= 400; i=i+20 ) {
		// context.beginPath();
		context.moveTo(i, 0);
		context.lineTo(i, 400);
		context.draw();
	}
} 
*/
function board() {
	context.save();
	context.beginPath();
	context.strokeStyle = '#34495e';
	context.lineWidth = 1;
	context.scale(1/20, 1/20);
	let bw = 240;
	let bh = 400;
	let p = 0;

	for (i = 0; i <= bw; i += 20) {
		context.moveTo(i + p, p);
		context.lineTo(i + p, bh + p);
		// context.strokeStyle = 'rgb(' + i*10+ ',' + i * 10 + ', 100)';  
		context.stroke();
	}
	for (i = 0; i <= bh; i += 20) {
		context.moveTo(p, 0.5 + i + p);
		context.lineTo(bw + p, 0.5 + i + p);
	}
	context.stroke();
    context.restore();
	
} 

// FÅR OBJEKTET ATT RÖRA SIG NERÅT.

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

		player.score += rowCount * 10;
		rowCount *= 2;
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

// GÖR SÅ ATT OBJEKTEN PLOCKAS UT.

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
	let tst = document.getElementById("myList", "ul")
  console.log(tst)
  document.getElementById("myList", "ul").remove();
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

// ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(let i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

// ÄNDRA PLAYER RESET OM DENNA ÄNDRAS

function restartSweep() {
			arena.forEach(row => row.fill(0));
		highArr.push(player.score);
		highArr.sort(function(a, b) {
			return b - a
	});
		highArr.length = 5;
		arrToUl(div, highArr);
		player.score = 0;
		updateScore();
}



// GÖR SÅ ATT RADEN FÖRSVINNER NÄR DEN BLIVIT FYLLD(? TVIVLAR STARKT PÅ DET), GER POÄNG. FLYTTAR UPP SPELAREN TILL TOPPEN OCH STARTAR OM IFALL ARENAN ÄR FYLLD. SKAPAR BITAR

function playerReset() {
	const pieces  = 'ILJOTSZ';
	player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
	player.pos.y  = 0;
	player.pos.x  =  (arena[0].length / 2 | 0) -
				    (player.matrix[0].length / 2 | 0);
	if (collide(arena, player)) {
		// debugger;
		arena.forEach(row => row.fill(0));
		highArr.push(player.score);
		highArr.sort(function(a, b) {
			return b - a
	});
		highArr.length = 5;
		arrToUl(div, highArr);
		player.score = 0;
		updateScore();
		// scoreCount();
		// console.log(highArr);
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
let dropInterval = 1000;

let lastTime = 0;
// UPPDATERAR SIDAN.

function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;

	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		playerDrop();
	}

	// FÖRKLARAR I VILKET LÄGE SPELET BEFINNER SIG I.


	if (gamestate === "playing") {
			requestAnimationFrame(update);
	} 

	draw();
	
	// requestAnimationFrame(update);
}

function updateScore() {
	document.getElementById('score').innerText = player.score;
}

function countScore() {
	document,getElementById('scoreSave').innerText = player.score;
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
];

// SKAPAR SPELPLAN OCH PÅBÖRJAR RÄKNING AV POÄNGEN.

const arena = createMatrix(12, 20);

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
	}
});





// START, STOP OCH RESET KNAPPAR

function startFunc() {
	// debugger;
	if (gamestate === 'paused') {
		gamestate = 'playing';
		update();
	} else if (gamestate === 'quit') {
	// arenaSweep();
	playerReset();
	updateScore();
	gamestate = 'playing';
	update();
	}
	
}
document.getElementById('start').addEventListener('click', startFunc, false);

function stopFunc() {
	if (gamestate === 'paused') {
		gamestate = 'playing';
		update(); 
	} else {
		gamestate = 'paused';
	}
	
}
document.getElementById('stop').addEventListener('click', stopFunc, false);

function resetFunc() {
	/* player.pos.y--;
	merge(arena, player);
	reset.location.reload(true);
	arenaSweep();
	updateScore();
	gamestate = 'guit';
	update(); */
	restartSweep();
	arenaSweep();
	playerReset();
	reset.location.reload(true);
	updateScore();
	update();
}
document.getElementById('reset').addEventListener('click', resetFunc, false);

function lobby() {
	document.location.href = 'index.html';
}
document.getElementById('lobby').addEventListener('click', lobby, false);
/*

function resFunc() {
	// context.clearRect(pa.left, pa.top, pa.width, pa.height);
	player.pos.y--;
	merge(arena, player);
	playerReset();
	arenaSweep();
	updateScore();
} 


function clickFunc() {
	// context.clearRect(pa.left, pa.top, pa.width, pa.height);
	arenaSweep();
	playerReset();
	updateScore();
	update();
}

function stopFunc() {

	arenaSweep();
	playerReset();
	clarTimeout();
	update();
}

document.addEventListener('stop', event => {
	if (event.stop === onClick) {
	document.stop();
	} else if (event.restart === onClick) 
	document.playerReset();
});
*/




// TJHOSAN