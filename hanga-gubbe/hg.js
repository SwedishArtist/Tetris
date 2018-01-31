let allText   = undefined;

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

readTextFile('words.txt');

let words       = allText.split(',');
let wordP       = words[Math.round(Math.random() * 1785)];
let word        = wordP.slice(1, -1);
let result      = new Array(word.length);
let guess       = undefined;
let letterInput = document.getElementById('guessInput');
// let letterForm  = document.getElementById('guessForm');
let incLetters  = [];

// KOLLAR OM GISSNINGEN FINNS MED I ORDET
function onGuess() {
	guessL = document.getElementById('guessInput').value;
	guess  = guessL.toUpperCase();
	let isCorrect = false;
	for (let i=0; i<word.length; i++) {
		if (word.charAt(i) === guess) {
			result.splice(i, 1, guess);
			document.getElementById('letters').innerHTML = result.toString();
		}
	}

	if (isCorrect === false) {
		if (isElementInArr(incLetters, guess) === false) {
			list();
		}
        incLetters.push(guess);
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
	if(arr != null && arr.length > 0) {
		for(let i=0; i < arr.length; i++) {
			if(arr[i] == element) {
				return true;
			}
		}
	}
	return false;
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