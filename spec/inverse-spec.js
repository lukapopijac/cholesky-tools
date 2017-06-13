describe('inverse', function() {
	var ct = require('..');

	it('should work with scalars (just number, not array)', function() {
		expect(ct.inverse(5)).toBeCloseTo(0.2, 10);
		expect(ct.inverse(5, ct.cholesky(5))).toBeCloseTo(0.2, 10);
		
		expect(ct.inverse(1)).toBeCloseTo(1, 10);
		expect(ct.inverse(1, ct.cholesky(1))).toBeCloseTo(1, 10);
		
		expect(ct.inverse(.4)).toBeCloseTo(2.5, 10);
		expect(ct.inverse(.4, ct.cholesky(.4))).toBeCloseTo(2.5, 10);
		
		expect(ct.inverse(0)).toEqual(Infinity);
		expect(ct.inverse(0, ct.cholesky(0))).toEqual(Infinity);
		
		expect(ct.inverse(Infinity)).toBeCloseTo(0, 10);
		expect(ct.inverse(Infinity, ct.cholesky(Infinity))).toBeCloseTo(0, 10);
	});

	it('should work for 1x1 matrix', function() {
		var A, B, L, det;

		A = [5];
		B = [1/5];
		L = [Math.sqrt(5)];
		det = 5;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);

		A = [[3]];
		B = [[1/3]];
		L = [[Math.sqrt(3)]];
		det = 3;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);
	});

	it('should work for 2x2 matrix', function() {
		var A, B, L, det;
		
		A = [[4,-2],[-2,2]];
		B = [[.5,.5],[.5,1]];
		L = [[2, 0], [-1, 1]];
		det = 4;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);

		A = [[.25, .5],[.5, 5]];
		B = [[5, -.5],[-.5, .25]];
		L = [[.5, 0], [1, 2]];
		det = 1;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);

		A = [[4, -6], [-6, 25]];
		B = [[25/64, 3/32], [3/32, 1/16]];
		L = [[-2, 0], [3, 4]];
		det = 64;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);

		A = [[1, 3], [3, 13]];
		B = [[13/4, -3/4], [-3/4, 1/4]];
		L = [[-1,0],[-3, -2]];
		det = 4;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);
	});

	it('should work for 3x3 matrix', function() {
		var A, B, L, det;

		A = [[25, 0, 0], [0, 4, 0], [0, 0, 9]];
		B = [[1/25, 0, 0], [0, 1/4, 0], [0, 0, 1/9]];
		L = [[5, 0, 0], [0, 2, 0], [0, 0, 3]];
		det = 900;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);

		A = [[4, 12, -16], [12, 37, -43], [-16, -43, 98]];
		B = [[1777/36, -122/9, 19/9], [-122/9, 34/9, -5/9], [19/9, -5/9, 1/9]];
		L = [[2, 0, 0], [6, 1, 0], [-8, 5, 3]];
		det = 36;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);

		A = [[4, -4, -2], [-4, 13, 8], [-2, 8, 54]];
		B = [[319/882, 50/441, -1/294], [50/441, 53/441, -2/147], [-1/294, -2/147, 1/49]];
		L = [[2, 0, 0], [-2, 3, 0], [-1, 2, 7]];
		det = 1764;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);
	});

	it('should work for 4x4 matrix', function() {
		var A, B, L, det;

		A = [[25, 0, 0, 0], [0, 4, 0, 0], [0, 0, 9, 0], [0, 0, 0, 1]];
		B = [[1/25, 0, 0, 0], [0, 1/4, 0, 0], [0, 0, 1/9, 0], [0, 0, 0, 1]];
		L = [[5, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 1]];
		det = 900;
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);
		
		A = [[1, -1, 2, -4], [-1, 10, -8, 7], [2, -8, 33, -5], [-4, 7, -5, 22]];
		B = [
			[101/20, -23/60,  -1/4, 59/60], 
			[-23/60,  11/60,  1/20, -7/60], 
			[  -1/4,   1/20,  1/20, -1/20], 
			[ 59/60,  -7/60, -1/20,   1/4]
		];
		L = [[1, 0, 0, 0], [-1, 3, 0, 0], [2, -2, 5, 0], [-4, 1, 1, 2]];
		det = 900
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);
	});
});
