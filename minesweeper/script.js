let w = 5;
let h = 5;

let matrix = new Array(h);
let matrixT = new Array(h);
let square = {
	bomb: false,
	revealed: false,
	n: 0
}

// square.n++;
square.bomb = true;
console.log(square);

// skapar en matris med höjden w och breddeb w
for (i=0; i<h; i++) {
	matrix[i] = new Array(w);
	for (j=0; j<w; j++) {
		matrix[i][j] = Math.round(- Math.random());
		document.write(matrix [i][j] + "&emsp;")
	}
	document.write("</br>")
}

for (i=0; i<h; i++) {
	matrixT[i] = new Array(w);
	for (j=0; j<w; j++) {
		matrixT[i][j] = 0;
	}
}

// berättar hur många bomber en ruta rör vid (såvida rutan inte har en bomb)
	for (i=0; i<h; i++) {
		for (j=0; j<w; j++) {
			if (matrix[i][j] === -1) {
				square.bomb = true;
				if (i < h - 1 && matrix[i+1][j] !== -1) {
					matrixT[i+1][j]++
				}
				if (i > 0 && matrix[i-1][j] !== -1) {
					matrixT[i-1][j]++
				}
				if (j > 0 && matrix[i][j-1] !== -1) {
					matrixT[i][j-1]++
				}
				if (j < w - 1 && matrix[i][j+1] !== -1) {
					matrixT[i][j+1]++
				}
				if (i > 0 && j > 0 && matrix[i-1][j-1] !== -1) {
					matrixT[i-1][j-1]++
				}
				if (i < h - 1 && j < w - 1 && matrix[i+1][j+1] !== -1) {
					matrixT[i+1][j+1]++
				}
				if (i < h - 1 && j > 0 && matrix[i+1][j-1] !== -1) {
					matrixT[i+1][j-1]++
				}
				if (i > 0 && j < w - 1 && matrix[i-1][j+1] !== -1) {
					matrixT[i-1][j+1]++
				} else {
					square.bomb = false;
				}
			}
		}
	}


/*
	for (i=0; i<h - 1; i++) {
		for (j=0; j<w - 1; j++) {
			debugger;
			if (matrix[i][j] === 1) {
				square.bomb = true;
				if (i > 0) {
					matrix[i-1][j]++
					if (j > 0) {
						matrix[i-1][j-1]++
						matrix[i][j-1]++
					}
					if (j < w - 1) {
						matrix[i-1][j+1]++
						matrix[i][j+1]++
					}
				}
				if (i < h - 1) {
					matrix[i+1][j]++
					if (j > 0) {
						matrix[i+1][j-1]++
					}
					if (j < w - 1) {
						matrix[i+1][j+1]++
					}
				}
			} else {
				square.bomb = false;
			}
		}
	} */
document.write("</br>")
for (i=0; i<h; i++) {
	for (j=0; j<w; j++) {
		document.write(matrixT [i][j] + "&emsp;")
	}
	document.write("</br>")
}
console.log(matrixT);