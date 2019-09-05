// implicit type cast
console.assert(10 * "4" == 40);

console.assert(!"");

console.assert("true");

console.assert("0");

const n = 1 - "x";
console.assert(n + ' object' == 'NaN object');

const x1 = 2;
console.assert(x1 + "" === "2");
console.assert(typeof (x1 + "") === typeof "2");

const x2 = "2";
console.assert(typeof x2 !== typeof 2);
console.assert(typeof +x2 === typeof 2);
console.assert(+x2 == 2);

const x3 = "0";
console.assert(!!x3 === true);
console.assert(typeof !!x3 === typeof true);

//explicit type cast
console.assert(new Number("5") == 5);

console.assert(new Boolean("false") == true);
console.assert(new Boolean("0") == true);

console.assert(new Boolean(NaN) == false);

// implicit type cast in comparison
console.assert("" == 0);
console.assert("" == false);
console.assert(false !== "");

console.assert("0" == 0);
console.assert(0 == false);
console.assert("0" == false);
console.assert("0" !== 0);
console.assert(false !== 0);

console.assert("1" == 1);
console.assert(1 == true);
console.assert("1" == true);
console.assert("1" !== 1);
console.assert(true !== 1);

console.assert("true" != true);
console.assert("true" != false);

// NaN
console.assert(undefined != NaN);
console.assert(false != NaN);

console.assert("true" != NaN);
console.assert("0" != NaN);

console.assert(NaN != NaN);

console.assert(new Number("0") != NaN);
console.assert(new Number("one") != NaN);

// null undefined
console.assert(null != false);
console.assert(undefined != true);

console.assert(null == undefined);
console.assert(null !== undefined);
