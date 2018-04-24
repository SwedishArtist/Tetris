const board = document.getElementById('board')
const overHand = document.getElementById('overHand')
let cards = ['ca', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13',
	'ha', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13',
	'da', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13',
	'sa', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13',
];
let boardArr = [];
let state = 'flop'
let hands = [];
let cash  = [];
let players = prompt('How many are playing?');

for (let i=0; i<players; i++) {
	hands[i] = [];
	cash[i]  = 1000;
}


function move(source, index, target) {
	if (index != -1) {
		target.push(source[index]);
		source.splice(index, 1);
	}
}

function deal() {
	for (let i=0; i<players; i++) {
		move(cards, (Math.random() * cards.length) | 0, hands[i]);
		move(cards, (Math.random() * cards.length) | 0, hands[i]);
	}
}
function progress() {
	debugger
	if (state === 'flop') {
		move(cards, (Math.random() * cards.length) | 0, boardArr)
		move(cards, (Math.random() * cards.length) | 0, boardArr)
		move(cards, (Math.random() * cards.length) | 0, boardArr)
		board.innerHTML = boardArr
		state = 'turn'
	} else if (state === 'turn') {
		move(cards, (Math.random() * cards.length) | 0, boardArr)
		board.innerHTML = boardArr
		state = 'river'
	} else if (state === 'river') {
		move(cards, (Math.random() * cards.length) | 0, boardArr)
		board.innerHTML = boardArr
		state = 'over'
	} else if (state === 'over') {
		reveal()
	}

}

function reveal() {
	for (let i=0; i<players; i++) {
		overHand.innerHTML = hands[i]
	}
	
}

deal()
progress()
progress()
progress()
progress()