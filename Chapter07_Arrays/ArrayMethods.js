"use strict";

// join
var a = [1, 2, 3];
console.assert(a.join() === "1,2,3");

// reverse
a.reverse();
console.assert(a[0] === 3);
a.reverse();
console.assert(a[0] === 1);

// sort
var b = ["b", "d", "c"];
b.sort();
console.assert(b[1] === "c");

// concat
var c = [1, 2, 3];
c = c.concat([4, 5]);
console.assert(c[3] === 4);

// slice
var d = [1, 2, 3, 4];
var d1 = d.slice(1, -1);
console.assert(d1.length === 2);
console.assert(d1[1] === 3);

// splice
var e = [1, 2, 3, 4];
var e1 = e.splice(1, 2, "a");
console.assert(e.length === 3);
console.assert(e[0] === 1);
console.assert(e[1] === "a");

console.assert(e1.length === 2);
console.assert(e1[0] === 2);

// foreach
var f = [1, 2, 3, 4];
f.forEach(function (value, index, array) {
    array[index] = value + 1;
});
console.assert(f[0] === 2);

// map
var g = [1, 2, 3, , 5];
var h = g.map(function (value) {
    return value + value;
});
console.assert(h[0] === 2);


// filter
var k = [1, 2, 3, , 5];
var l = k.filter(function (value) {
    return true;
});
console.assert(l[3] === 5);

// every some
var m = [1, 2, 3, 0];
console.assert(!m.every(function (value) {
    return value > 0;
}));
console.assert(m.some(function (value) {
    return value === 0;
}));

// reduce reduceRight
var n = [0, 1, 2, 3];
console.assert(n.reduce(function (x, y) {
    return x + y;
}) === 6);
console.assert(n.reduceRight(function (x, y) {
    return x + y;
}) === 6);

// indexOf lastIndexOf
var o = [1, 2, 5, 6, 6];
console.assert(o.indexOf(5) === 2);
console.assert(o.indexOf(7) === -1);
console.assert(o.lastIndexOf(6) === 4);















