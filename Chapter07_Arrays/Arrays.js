"use strict";
var a = ["a", "b", "c", "d"];
console.assert(a.length === 4);

// "1" and 1.000 is index 1
console.assert(a["1"] === "b");
console.assert(a[1.000] === "b");

// "1.000" is property not index
console.assert(a["1.000"] === undefined);

// minus is property not index
console.assert(a[-1] === undefined);

// 12.1 is property not index
a[12.1] = "f";
console.assert(a.length === 4);
console.assert(a[12.1] === 'f');
console.assert(a["12.1"] === 'f');

// -1 is property not index
a[-1] = "f";
console.assert(a.length === 4);
console.assert(a["-1"] === 'f');
console.assert(a[-1] === 'f');

// ellipsis in array literal is same with new a empty array
var a1 = [, , ,];
var a2 = new Array(3);
console.assert(a1.length === 3);
console.assert(a2.length === 3);
console.assert(!(0 in a1));
console.assert(!(0 in a2));

var a3 = [, undefined, ,];
console.assert(!(0 in a3));
console.assert(1 in a3);
console.assert(!(2 in a3));
console.assert(a3.length === 3);

// array length is not read-only view
var d = [5, 4, 3, 2, 1];
d.length = 3;
console.assert(d[3] === undefined);

// delete element not change array length
var q = ["a", "b"];
delete a[0];
console.assert(q.length === 2);

// pop shift / push unshift
q.unshift("z");
console.assert(q[0] === "z");
q.shift();
q.shift();
console.assert(q[0] === "b");

// for...in sparse array will skip empty item's index
var g = [1, , 2];
for (var i in g) {
    console.assert(i !== 1);
}

// index of item with `undefined` value will cover
var j = [1, undefined, 2];
var hasIndex1 = false;
for (var i in j) {
    if (i == 1) {
        hasIndex1 = true;
    }
}
console.assert(hasIndex1);
