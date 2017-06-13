'use strict';

module.exports = {
	determinant: determinant,
	inverse: inverse,
	cholesky: cholesky
};

function determinant(A, choleskyL) {  // choleskyL is optional parameter
	if(typeof A == 'number') return A;
	else if(A.length==1) return A[0].length==1 ? A[0][0] : A[0];
	else if(A.length==2) return A[0][0]*A[1][1]-A[0][1]*A[1][0];
	else if(A.length==3) return (choleskyL ?
		Math.pow(choleskyL[0][0]*choleskyL[1][1]*choleskyL[2][2], 2) :
		A[0][0] * (A[1][1]*A[2][2] - A[1][2]*A[2][1]) +
		A[0][1] * (A[1][2]*A[2][0] - A[1][0]*A[2][2]) +
		A[0][2] * (A[1][0]*A[2][1] - A[1][1]*A[2][0])
	);
	var r = 1;
	var L = choleskyL || cholesky(X);
	for(var i=0; i<A.length; i++) r *= L[i][i];
	return r*r;
}

function inverse(A, choleskyL) {
	// A must be symmetric positive definite matrix
	// choleskyL is optional
	if(typeof A == 'number') return 1/A;
	else if(A.length==1) [[1/A[0][0]]];
	else if(A.length==2) {
		var a = A[0][0], b = A[0][1], d = A[1][1];
		var di = 1/(a*d-b*b);
		return [
			[d*di, -b*di],
			[-b*di, a*di]
		];
	} else if(A.length==3) {
		var a = A[0][0];
		var d = A[1][0], e = A[1][1];
		var g = A[2][0], h = A[2][1], i = A[2][2];

		var a00 = e*i-h*h;
		var a10 = h*g-d*i, a11 = a*i-g*g;
		var a20 = d*h-e*g, a21 = d*g-a*h, a22 = a*e-d*d;
		var detI = 1/(a*a00 + d*a10 + g*a20);

		return [
			[a00*detI, a10*detI, a20*detI],
			[a10*detI, a11*detI, a21*detI],
			[a20*detI, a21*detI, a22*detI]
		];
	}
	var L = choleskyL || cholesky(A);
	var X = lowerTriangularInverse(L);
	var n = L.length;
	for(var i=0; i<n; i++) {
		for(var j=0; j<=i; j++) {
			var s = 0;
			for(var k=i; k<n; k++) s += X[k][i]*X[k][j];
			X[i][j] = s;
			X[j][i] = s;
		}
	}
	return X;
}

function lowerTriangularInverse(L) {  // L must be lower-triangular
	let n = L.length;
	let X = Array(n);
	for(let i=0; i<n; i++) X[i] = Array(n);
	for(let k=0; k<n; k++) {
		X[k][k] = 1/L[k][k];
		for(let i=k+1; i<n; i++) {
			let s = 0;
			for(let j=k; j<i; j++) s -= L[i][j]*X[j][k];
			X[i][k] = s/L[i][i];
		}
	}
	return X;
}

function cholesky(A) {
	if(typeof A == 'number') return Math.sqrt(A);
	if(A.length==1) return [[Math.sqrt(A[0][0])]];
	let L = Array(A.length);
	for(let i=0; i<A.length; i++) {
		let Li = L[i] = Array(i+1);
		for(let j=0; j<i+1; j++) {
			let Lj = L[j];
			let s = A[i][j];
			for(let k=0; k<j; k++) s -= Li[k]*Lj[k];
			Li[j] = i==j ? Math.sqrt(s) : s/Lj[j];
		}
	}
	return L;
}
