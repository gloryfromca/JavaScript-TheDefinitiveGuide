"use strict";

// higher-order function

// function as one of arguments of another function
function not(f) {
    return function () {
        var originResult = f.apply(this, arguments);
        return !originResult;
    }
}

function even(x) {
    return x % 2 === 0;
}

var a = [1, 2, 3, 4];
var a_odd = a.map(not(even));
console.assert(a_odd[0] === true);
console.assert(a_odd[1] === false);

// compose function
function sum(x, y) {
    return x + y;
}

function sqrt(x) {
    return x * x;
}

function compose(a, b) {
    return function () {
        return a.call(this, b.apply(this, arguments));
    };
}

var sqrtOfSum = compose(sqrt, sum);
console.assert(sqrtOfSum(3, 2) === 25);

// partial
function array(a, n) {
    return Array.prototype.slice.call(a, n || 0);
}

function partialLeft(f, /*...*/) {
    var leftPartArguments = arguments;
    return function () {
        var a = array(leftPartArguments, 1);
        a = a.concat(array(arguments));
        return f.apply(this, a);
    }
}

function b(x, y, z) {
    return (x + y) * z;
}

var b_with_x_y = partialLeft(b, 2, 5);
console.assert(b_with_x_y(2) === 14);

// another `not` function
var not = partialLeft(compose, function (x) {
    return !x;
});

function odd(x) {
    return x % 2 === 1;
}

var c = [1, 2, 3, 4];

var c_result = c.map(not(odd));
console.assert(c_result[0] === false);
console.assert(c_result[1] === true);

// memorization
function memorize(f) {
    var cache = {};
    return function () {
        var key = Array.prototype.join.call(arguments, ",");
        if (key in cache) {
            return cache[key];
        }
        cache[key] = f.apply(this, arguments);
        return cache[key];
    }
}

var factorial = function (n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
};

console.assert(factorial(4) === 24);

// just cache final result once, inner recursive call will use original function `factorial`.
var memorize_factorial = memorize(factorial);
console.assert(memorize_factorial(4) === 24);

// decorator will replace original function `factorial`, inner recursive call will use function decorated.
factorial = memorize(factorial);
console.assert(factorial(4) === 24);
