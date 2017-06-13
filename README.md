Cholesky Tools
==============

Basic operations for symmetric positive definite matrices.


Installation
------------
```
npm install cholesky-tools
```


Usage
-----

The following functions are provided: `cholesky`, `determinant` and `inverse`.
They assume the input parameter is symmetric positive definite matrix. Some
functions accept second optional parameter `choleskyL`. If provided, function
might use it for performance boost.

For performance reasons there is no input validation. It is up to user to
insure valid input.

The following example shows all the functionality.

```javascript
const ct = require('cholesky-tools');

// define symmetric positive definite matrix
var A = [
	[4, -2],
	[-2, 2]
];

// calculate cholesky decomposition, the result is lower triangular matrix
var L = ct.cholesky(A);  // [[2, 0], [-1, 1]]

// calculate inverse
var Ainv = ct.inverse(A);  // [[0.5, 0.5], [0.5, 1]]

// calculate inverse with providing cholesky decomposition matrix L.
// L must be lower triangular
var Ainv2 = ct.inverse(A, L);  // [[0.5, 0.5], [0.5, 1]]

// calculate determinant
var det = ct.determinant(A);  // 4

// calculate determinant with providing cholesky decomposition matrix L.
// L must be lower triangular
var det2 = ct.determinant(A, L);  // 4
```


License
-------
This software is released under the MIT license.

