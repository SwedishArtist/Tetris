let allText     = undefined;
let wordAmmount = undefined;
let lang        = 'pl'
let words       = undefined;
let word        = undefined;

function readTextFile(file) {
	let rawFile = new XMLHttpRequest();
	rawFile.open('GET', file, false);
	rawFile.onreadystatechange = function () {
		if ( rawFile.readyState === 4 ) {
			if ( rawFile.status === 200 || rawFile.status == 0 ) {
				allText = rawFile.responseText;
			}
		}
	};
	rawFile.send(null);
}

switch (lang) {
    case 'sv':
        readTextFile('sv.txt');
        wordAmmount = 24262;
        words   = allText.split('\r\n');
        word    = words[Math.round(Math.random() * wordAmmount)];
        break;
    case 'pl':
        readTextFile('pl.txt');
        wordAmmount = 2703280;
        words   = allText.split('\r\n');
        word    = words[Math.round(Math.random() * wordAmmount)];
        break;
    default:
        readTextFile('words.txt');
        wordAmmount = 1785;
        words   = allText.split(',');
        wordP   = words[Math.round(Math.random() * wordAmmount)];
        word    = wordP.slice(1, -1);
}



let result      = new Array(word.length);
let guess       = undefined;
let letterInput = document.getElementById('guessInput');
let incLetters  = [];
let lives       = 10;
let lineString  = ''
// let letterForm  = document.getElementById('guessForm');

for (let i=0; i<word.length; i++) {
      lineString += '_ '
}

document.getElementById('lines').innerHTML = lineString


// KOLLAR OM GISSNINGEN FINNS MED I ORDET
function onGuess() {
	let guessL = document.getElementById('guessInput').value;
	guess  = guessL.toUpperCase();
	/*if (guess <'A'|| guess >'Z' || guess === 'Ä' || guess === 'Å' || guess === 'Ö') {
		document.getElementById('guessInput').value = '';
		return;
	}*/
	let isCorrect = false;
	for (let i=0; i<word.length; i++) {
		if (word.charAt(i) === guess) {
			result.splice(i, 1, guess);
			document.getElementById('letters').innerHTML = result.toString();
			isCorrect = true;
		}
	}

	if (isCorrect === false) {
		if (isElementInArr(incLetters, guess) === false) {
			list();
			hang();
			incLetters.push(guess);
		}
	}
	document.getElementById('guessInput').value = '';
}

letterInput.addEventListener('input', onGuess, false);

function list() {
	let li = document.createElement('li');
	document.getElementById('incUl').appendChild(li);
	let content = document.createTextNode(guess);
	li.appendChild(content);
}

function isElementInArr(arr,element) {
	if (arr != null && arr.length > 0) {
		for(let i=0; i < arr.length; i++) {
			if(arr[i] == element) {
				return true;
			}
		}
	}
	return false;
} 

function hang() {
	lives--;
	if (lives < 0) {
		gameOver();
	}
}

function gameOver() {
    document.getElementById('guessInput').setAttribute('maxlength', '0');
	for (let i=0; i<5; i++) {
		let li = document.createElement('li');
		document.getElementById('incUl').appendChild(li);
		let content = document.createTextNode('GAMEOVER');
		li.appendChild(content);
	}
    document.getElementById('goAnswer').innerHTML = word;
}

/*function arrToUl(root, arr) {
    console.log(incLetters);
    let ul = document.createElement('ul');
    let li;
    div    = document.getElementById('incDiv');

    root.appendChild(ul);
    arr.forEach(function(item) {
        if (Array.isArray(item)) {
            arrToUl(li, item);
            return;
        }
        li = document.createElement('li');
        li.appendChild(document.createTextNode(item));
        ul.appendChild(li);
    });
}*/


// document.getElementById('letters');

// let guessIndex = undefined;
// let guessArr = new Array(word.length);
// guessArr.splice(guessIndex, 1, guess);
// console.log(guessArr);


// SKAPAR GISSNINGSRUTOR
/*for (let i=0; i<word.length; i++) {
    let letterForm = document.createElement('form');
    let letterInput = document.createElement('input');
    letterForm.appendChild(letterInput);
    letterInput.setAttribute('type', 'text');
    letterForm.setAttribute('id', 'guess' + i.toString());
    document.getElementById('letters').appendChild(letterForm);
    letterForm.innerHTML = 'tjosan'

    letterForm.addEventListener('compositionend', guessFunc, false);
}*/