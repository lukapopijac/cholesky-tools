describe('inverse', function() {
	var ct = require('..');

	it('should work with scalars (just number, not array)', function() {
		expect(ct.inverse(5)).toBeCloseTo(0.2, 10);
		expect(ct.inverse(1)).toBeCloseTo(1, 10);
		expect(ct.inverse(0.4)).toBeCloseTo(2.5, 10);
		expect(ct.inverse(0)).toEqual(Infinity);
		expect(ct.inverse(Infinity)).toBeCloseTo(0, 10);
	});

	it('should work for 1x1 matrix', function() {
		expect(ct.inverse([5])).toBeCloseToMatrix([0.2]);
		expect(ct.inverse([[2]])).toBeCloseToMatrix([[0.5]]);
	});

	it('should work for 2x2 matrix', function() {
		var A, B;

		A = [[4,-2],[-2,2]];
		B = [[.5,.5],[.5,1]];
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);

		A = [[.25,.5],[.5,5]];
		B = [[5,-.5],[-.5,.25]];
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);

		A = [[4,-6],[-6,25]];
		B = [[25/64, 3/32], [3/32, 1/16]];
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);

		A = [[1,3],[3,13]];
		B = [[3.25,-.75],[-.75,.25]];
		expect(ct.inverse(A)).toBeCloseToMatrix(B);
		expect(ct.inverse(A, ct.cholesky(A))).toBeCloseToMatrix(B);
	});

});


/*
in order:
A
inverse(A)
cholesky(A)
-----------
 4 -2
-2  2

.5 .5
.5 1

 2 0
-1 1
-----------
.25 .5
.5  5

 5   -.5
-.5  .25

.5 0
1  2
-----------
4  -6
-6 25

.390625  .09375
.09375   .0625

-2 0
3  4
-----------
1  3
3 13

3.25  -.75
-.75   .25

-1 0
-3 -2
------------
*/
