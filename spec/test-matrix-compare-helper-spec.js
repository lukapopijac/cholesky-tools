describe('toBeCloseToMatrix matcher', function() {
	it('should work with numbers', function() {
		expect(4).toBeCloseToMatrix(4);
		expect(4).toBeCloseToMatrix(4.0000000001);
		expect(4).not.toBeCloseToMatrix(4.00001);
	});
	it('should complain when comparing numbers with strings', function() {
		expect(5).not.toBeCloseToMatrix('5');
		expect('6').not.toBeCloseToMatrix(6);
	});
	it('should return true for empty arrays', function() {
		expect([]).toBeCloseToMatrix([]);
	});
	it('should garantee [3] != 3', function() {
		expect([3]).not.toBeCloseToMatrix(3);
		expect(3).not.toBeCloseToMatrix([3]);
	});
	it('should garantee [[7]] != 7', function() {
		expect([[7]]).not.toBeCloseToMatrix(7);
		expect(7).not.toBeCloseToMatrix([[7]]);
	});
	it('should garantee [[8]] != [8]', function() {
		expect([[8]]).not.toBeCloseToMatrix([8]);
		expect([8]).not.toBeCloseToMatrix([[8]]);
	});
	it('should work with arrays filled with numbers', function() {
		expect([3,4]).not.toBeCloseToMatrix([3]);
		expect([3,4]).toBeCloseToMatrix([3,4]);
		expect([3,7,5]).toBeCloseToMatrix([3,7.0000000000001,5]);
		expect([3,7,2]).not.toBeCloseToMatrix([3,7.00001,2]);
	});
	it('should work with arrays of arrays of numbers', function() {
		expect([[3,4],[2,1]]).toBeCloseToMatrix([[3,4],[2,1]]);
		expect([[3,4],[2,6]]).toBeCloseToMatrix([[2.999999999,4],[2,6]]);
		expect([[3,4],[2,6]]).not.toBeCloseToMatrix([[2.9999,4],[2,6]]);
		expect([[8,1],[2,3]]).not.toBeCloseToMatrix([[8,1],[]]);
		expect([[8,1],[2,3]]).not.toBeCloseToMatrix([[8,1]]);
	});
});
