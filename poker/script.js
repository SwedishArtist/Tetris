let cards = ['ca', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13',
	'ha', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13',
	'da', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13',
	'sa', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13',
];
let trash = [];
let hand1 = [];
let hand2 = [];
let ammount

function move(source, index, target) {
	if (index != -1) {
		target.push(source[index]);
		source.splice(index, 1);
	}
}

function reset() {
	cards = ['ca', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13',
		'ha', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13',
		'da', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13',
		'sa', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13',
	];

	hand1 = [];
	hand2 = [];
	trash = [];
}

function deal() {
	for (let i=0; i<5; i++) {
		move(cards, (Math.random() * cards.length) | 0, hand1);
		move(cards, (Math.random() * cards.length) | 0, hand2);
	}
}

function reDeal(hand, ammount) {
	for (let i=0; i<ammount - 1; i++) {
		move(cards, (Math.random() * cards.length) | 0, hand);
	}
}

function exchange(hand, string) {
	ammount = 0;
	for (let i=0; i<5; i++) {
		if (string[i] === '1') {
			ammount++;
			move(hand, i, trash);
		}
		reDeal(hand, ammount);
	}
}

function play() {
	deal();
	alert('Player two look away');
	console.log(hand1)
	let h1s = prompt('Player one, your cards are: ' + hand1 + ' choose what cards you want to exchange by marking them with a 1 (i.e. if you have ca, c2, c3, c4, c5 and want to keep c2 and c5 you type 10110)');
	console.log(h1s)
	exchange(hand1, h1s);
	console.log(trash);
	console.log(hand1)
	console.log(hand2)
	alert('Player one look away');
	let h2s = prompt('Player two, your cards are: ' + hand2 + ' choose what cards you want to exchange by marking them with a 1 (i.e. if you have ca, c2, c3, c4, c5 and want to keep c2 and c5 you type 10110)');
	exchange(hand2, h2s);
	console.log(trash);
	console.log(hand2)

	alert('Player two look away');
	h1s = prompt('Player one, your cards are: ' + hand1 + ' choose what cards you want to exchange by marking them with a 1 (i.e. if you have ca, c2, c3, c4, c5 and want to keep c2 and c5 you type 10110)');
	exchange(hand1, h1s);
	console.log(trash);
	console.log(h1s)
	console.log(hand1)
	alert('Player one look away');
	h2s = prompt('Player two, your cards are: ' + hand2 + ' choose what cards you want to exchange by marking them with a 1 (i.e. if you have ca, c2, c3, c4, c5 and want to keep c2 and c5 you type 10110)');
	exchange(hand2, h2s);
	console.log(trash);
	console.log(hand2)

	alert('Player one: ' + hand1 + ' Player two: ' + hand2);
}

play();

console.log(trash);
console.log(cards);