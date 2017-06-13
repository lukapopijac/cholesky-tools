beforeEach(function() {
	jasmine.addMatchers({
		toBeCloseToMatrix: function() {
			return {
				compare: function(actual, expected) {
					var a = actual;
					var b = expected;
					var t = 1e-8;
					
					// if they are just numbers
					if(typeof a == 'number' && typeof b == 'number') {
						if(a===b) return {pass: true};
						return {pass: Math.abs(a-b)<=t};
					}
					
					// now we know they should be arrays
					if(!Array.isArray(a) || !Array.isArray(b)) return {pass: false};
					if(a.length != b.length) return {pass: false};
					if(a.length == 0) return {pass: true};
					
					if(Array.isArray(a[0])) {
						for(var i=0; i<a.length; i++) {
							if(!compareArrays(a[i], b[i], t)) return {pass: false};
						}
					} else {
						return {pass: compareArrays(a, b, t)}
					}
					
					return {pass: true};
				}
			}
		}
	});
});


function compareArrays(a, b, threshold) {
	if(!Array.isArray(a) || !Array.isArray(b)) return false;
	if(a.length != b.length) return false;
	for(var i=0; i<a.length; i++) {
		if(Array.isArray(a[i]) || Array.isArray(b[i])) return false;
		if(Math.abs(a[i]-b[i])>threshold) return false;
	}
	return true;
}
