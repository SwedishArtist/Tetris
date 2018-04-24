"use strict";
document.getElementById("lang").selectedIndex = 0;
let letterInput = document.getElementById('guessInput');
let allText     = undefined;
let wordAmmount = undefined;
let words       = undefined;
let word        = undefined;
let wordP       = undefined;
let trollWord   = undefined;
let result      = undefined;
let guess       = undefined;
let incLetters  = undefined;
let lives       = undefined;
let lineString  = undefined;
let lang        = undefined;
let n           = undefined;
let keyPress    = false;

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
let dropDown = document.getElementById('lang');

dropDown.addEventListener('change', (e) => {
    lang = e.target.value.toString() 
})

let specialCharacters = document.getElementById('specialCharacters');


specialCharacters.addEventListener('click', (e) => {
    if ( e.target.tagName.toLowerCase() !== 'button') {
        return false;
    }
    guess = e.target.innerHTML;
    keyPress = true;
    onGuess();
})


function normalPlay() {
	document.getElementById('guessInput').setAttribute('maxlength', '1');
	switch (lang) {
	case 'sv':
		readTextFile('sv.txt');
		wordAmmount = 24262;
		words       = allText.split('\r\n');
		word        = words[Math.round(Math.random() * wordAmmount)];
		word        = word.toUpperCase();
		trollWord   = 'Spårvagnsaktiebolagsskensmutsskjutarefackföreningspersonalbeklädnadsmagasinsförrådsförvaltarens';
		trollWord   = trollWord.toUpperCase();
		break;

	case 'plH':
		readTextFile('pl.txt');
		wordAmmount = 2703279;
		words       = allText.split('\r\n');
		word        = words[Math.round(Math.random() * wordAmmount)];
		word        = word.toUpperCase();
		break;
    case 'plE':
    wordAmmount = 9;
        words   = [
            'złość',
            'jabłko',
            'długo',
            'Dziewięćsetdziewięćdziesiątdziewięćmiliardówdziewięćsetdziewięćdziesiątdziewięćmilionówdziewięćsetdziewięćdziesiątdziewięćtysięcydziewięćsetdziewięćdziesięciodziewięcioletniego',
            'chleb',
            'kot',
            'szmaciarz',
            'głĄb',
            'lodziara'
        ]
        word  = words[Math.round(Math.random() * wordAmmount) - 1];
        word  = word.toUpperCase()
        break;
	case 'en':
		readTextFile('words.txt');
		wordAmmount = 1785;
		words       = allText.split(',');
		wordP       = words[Math.round(Math.random() * wordAmmount)];
		word        = wordP.slice(1, -1);
        break;
    default:
        alert('Please select a language');
        return 0;
	}
	result      = new Array(word.length);
	incLetters  = [];
	lives       = 10;
	lineString  = '';


	/*for (let i=0; i<word.length; i++) {
		result.splice(i, 1, '&emsp'); 
	}*/
	for (let i=0; i<word.length; i++) {
		lineString += '_&emsp;';
	}

	document.getElementById('lines').innerHTML = lineString;
}


function ownWord() {
	lang = 'own';
	word = prompt('Enter your own word').toUpperCase();
	document.getElementById('guessInput').setAttribute('maxlength', '1');
	result      = new Array(word.length);
	incLetters  = [];
	lives       = 10;
	lineString  = '';
	for (let i=0; i<word.length; i++) {
		lineString += '_&emsp;';
	}
	document.getElementById('lines').innerHTML = lineString;
}

// KOLLAR OM GISSNINGEN FINNS MED I ORDET
function onGuess() {
    if (keyPress === false) {
        let guessL = document.getElementById('guessInput').value;
        guess      = guessL.toUpperCase();
    }
	if (lang === 'sv') {
		if (!((guess >='A' && guess <='Z') || guess === 'Ä' || guess === 'Å' || guess === 'Ö')) {
			document.getElementById('guessInput').value = '';
			return;
		}
	}

	if (lang === 'en') {
		if (!(guess >='A' && guess <='Z')) {
			document.getElementById('guessInput').value = '';
			return;
		}
	}
	
	let isCorrect = false;
	for (let i=0; i<word.length; i++) {
		if (word.charAt(i) === guess) {
			result.splice(i, 1, guess);
			document.getElementById('letters').innerHTML = result.join('&emsp;'); 
			isCorrect = true;
			if (result.join('') === word) {
				win();
			}
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
    if (keyPress === true) {
        keyPress = false;
    }
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

function win() {
	document.getElementById('guessInput').setAttribute('maxlength', '0');
	let li = document.createElement('li');
	document.getElementById('incUl').appendChild(li);
	let content = document.createTextNode('HEHEHE YOU WIN! HOW DID YOU DO THAT?! THAT\'S AMAZING');
	li.appendChild(content);
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

function restart() {
	let incUl = document.getElementById('incUl');
	while (incUl.firstChild) {
		incUl.removeChild(incUl.firstChild);
	}
    document.getElementById('guessInput').setAttribute('maxlength', '1');
	incLetters  = [];
	lives       = 10;
    allText     = undefined;
    wordAmmount = undefined;
    words       = undefined;
    word        = undefined;
    wordP       = undefined;
    trollWord   = undefined;
    result      = undefined;
    guess       = undefined;
    incLetters  = undefined;
    lives       = undefined;
    lineString  = undefined;
    keyPress    = false;
	document.getElementById('lines').innerHTML = '';
	document.getElementById('goAnswer').innerHTML = '';
	document.getElementById('guessInput').setAttribute('maxlength', '1');
	document.getElementById('goAnswer').innerHTML = '';
	document.getElementById('letters').innerHTML = '';
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