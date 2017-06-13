const ct = require('..');

var matrices = [
	{
		A: 1,
		Ainv: 1,
		L: 1,
		Linv: 1,
		det: 1
	}, {
		A: 5,
		Ainv: 1/5,
		L: Math.sqrt(5),
		Linv: 1/Math.sqrt(5),
		det: 5
	}, {
		A: 0,
		Ainv: Infinity,
		L: 0,
		Linv: Infinity,
		det: 0
	}, {
		A: Infinity,
		Ainv: 0,
		L: Infinity,
		Linv: 0,
		det: Infinity
	}, {
		A: [[3]],
		Ainv: [[1/3]],
		L: [[Math.sqrt(3)]],
		Linv: [[1/Math.sqrt(3)]],
		det: 3
	}, {
		A: [[4, -2], [-2, 2]],
		Ainv: [[.5, .5], [.5, 1]],
		L: [[2, 0], [-1, 1]],
		Linv: null,
		det: 4
	}, {
		A: [[.25, .5],[.5, 5]],
		Ainv: [[5, -.5],[-.5, .25]],
		L: [[.5, 0], [1, 2]],
		Linv: null,
		det: 1
	}, {
		A: [[4, -6], [-6, 25]],
		Ainv: [[25/64, 3/32], [3/32, 1/16]],
		L: [[2, 0], [-3, 4]],
		Linv: null,
		det: 64
	}, {
		A: [[1, 3], [3, 13]],
		Ainv: [[13/4, -3/4], [-3/4, 1/4]],
		L: [[1,0],[3, 2]],
		Linv: null,
		det: 4
	}, {
		A: [[25, 0, 0], [0, 4, 0], [0, 0, 9]],
		Ainv: [[1/25, 0, 0], [0, 1/4, 0], [0, 0, 1/9]],
		L: [[5, 0, 0], [0, 2, 0], [0, 0, 3]],
		Linv: null,
		det: 900,
	}, {
		A: [[4, 12, -16], [12, 37, -43], [-16, -43, 98]],
		Ainv: [[1777/36, -122/9, 19/9], [-122/9, 34/9, -5/9], [19/9, -5/9, 1/9]],
		L: [[2, 0, 0], [6, 1, 0], [-8, 5, 3]],
		Linv: null,
		det: 36,
	}, {
		A: [[4, -4, -2], [-4, 13, 8], [-2, 8, 54]],
		Ainv: [[319/882, 50/441, -1/294], [50/441, 53/441, -2/147], [-1/294, -2/147, 1/49]],
		L: [[2, 0, 0], [-2, 3, 0], [-1, 2, 7]],
		Linv: null,
		det: 1764,
	}, {
		A: [[25, 0, 0, 0], [0, 4, 0, 0], [0, 0, 9, 0], [0, 0, 0, 1]],
		Ainv: [[1/25, 0, 0, 0], [0, 1/4, 0, 0], [0, 0, 1/9, 0], [0, 0, 0, 1]],
		L: [[5, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 1]],
		Linv: null,
		det: 900,
	}, {
		A: [[1, -1, 2, -4], [-1, 10, -8, 7], [2, -8, 33, -5], [-4, 7, -5, 22]],
		Ainv: [
			[101/20, -23/60,  -1/4, 59/60], 
			[-23/60,  11/60,  1/20, -7/60], 
			[  -1/4,   1/20,  1/20, -1/20], 
			[ 59/60,  -7/60, -1/20,   1/4]
		],
		L: [[1, 0, 0, 0], [-1, 3, 0, 0], [2, -2, 5, 0], [-4, 1, 1, 2]],
		Linv: null,
		det: 900
	}
];

function itString(A) {
	return 'should work for A = ' + JSON.stringify(A);
}

describe('Determinant (without parameter choleskyL)', function() {
	matrices.forEach(function(m) {
		it(itString(m.A), function() {
			expect(ct.determinant(m.A)).toBeCloseToMatrix(m.det);
		});
	});
});

describe('Determinant (with parameter choleskyL)', function() {
	matrices.forEach(function(m) {
		it(itString(m.A), function() {
			expect(ct.determinant(m.A, m.L)).toBeCloseToMatrix(m.det);
		});
	});
});

describe('Inverse (without parameter choleskyL)', function() {
	matrices.forEach(function(m) {
		it(itString(m.A), function() {
			expect(ct.inverse(m.A)).toBeCloseToMatrix(m.Ainv);
		});
	});
});

describe('Inverse (with parameter choleskyL)', function() {
	matrices.forEach(function(m) {
		it(itString(m.A), function() {
			expect(ct.inverse(m.A, m.L)).toBeCloseToMatrix(m.Ainv);
		});
	});
});

describe('Cholesky decomposition', function() {
	matrices.forEach(function(m) {
		it(itString(m.A), function() {
			expect(ct.cholesky(m.A)).toBeCloseToMatrix(m.L);
		});
	});
});
