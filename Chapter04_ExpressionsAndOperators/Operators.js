// +
console.assert(1 + 2 == 3);
console.assert(1 + "2" == "12");
console.assert("1" + "2" == "12");

console.assert(true + true == 2);

console.assert(1 + null == 1);

console.assert(typeof (1 + undefined) == typeof NaN);

// unitary
console.assert(+"1" == 1);
console.assert(-"1" == -1);

var a = 1;
console.assert(++a == 2);
a = 1;
console.assert(a++ == 1);

// bit
console.assert(~0 == -1);

console.assert((1 & 0) == 0);
console.assert((1 ^ 1) == 0);
console.assert((1 | 0) == 1);

// left shift
console.assert((1.7 << 0) == 1);
console.assert((1.7 << 4) == 16);

console.assert((-1 << 1) == -2);
console.assert((-1 << 32) == -1);

console.assert(((2 ** 31 + 1.7) << 4) == 16);
console.assert(((2 ** 34 + 1.7) << 4) == 16);

console.assert((1.7 << 30) == 2 ** 30);
console.assert((1.7 << 31) == -(2 ** 31));
console.assert((1.7 << 32) == 1);

// right shift with sign
console.assert((1 >> 12) == 0);

console.assert((-(2 ** 31) >> 30) == -2);
console.assert((-(2 ** 31) >> 31) == -1);
console.assert((-(2 ** 31) >> 32) == -(2 ** 31));

// right shift without sign
console.assert((1 >>> 12) == 0);

console.assert((-1 >>> 1) == (2 ** 31) - 1);

console.assert((-(2 ** 31) >>> 30) == 2);
console.assert((-(2 ** 31) >>> 31) == 1);

console.assert((-(2 ** 31) >>> 32) == (2 ** 31));

// == ===
console.assert(1 == "1");
console.assert(1 !== "1");

console.assert(null === null);
console.assert(undefined === undefined);
console.assert(NaN !== NaN);

// <
console.assert("11" < "3");
console.assert("11" > 3);
console.assert("one" < 3 == false);

// in
var point = {x: 1, y: 2};
console.assert("x" in point);
console.assert("y" in point);
console.assert("toString" in point);

var data = [7, 8, 9];
console.assert(0 in data);
console.assert(data["0"] == 7);
console.assert(data[0] == 7);
console.assert(!(7 in data));

var da = [0, 1, , 2];
console.assert((2 in da) == false);

// &&
var o = {x: 1};
var p = null;
console.assert((o && o.x) === 1);
console.assert((p && p.x) === null);

// ||
var max_width = null;
var max = max_width || 50;
console.assert(max == 50);

// !
var d = {};
var ay = [];
console.assert(!d == false);
console.assert(ay == false);
console.assert(!ay == false);

// eval
var e = {};
console.assert(eval(e) === e);

var df = 1;
eval("df += 1;");
console.assert(df == 2);

eval("var dg =1;");
console.assert(dg == 1);

try {
    var gh = function () {
        eval("return 1;");
    }();
} catch (e) {
    console.assert(!gh);
}

var x = "global";

function f() {
    var x = "local";
    eval("x = x + ' changed';");
    return x;
}

console.assert(f() == "local changed");
console.assert(x == "global");

// typeof
console.assert(typeof {} == "object");
console.assert(typeof NaN == "number");
console.assert(typeof null == "object");

// delete
var o = {x: 1, y: 2};
console.assert(delete o.x);
console.assert(delete o.x);
console.assert((delete o) == false);

console.assert(delete 1);












