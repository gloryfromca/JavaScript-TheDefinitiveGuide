"use strict";

// destructuring assignment
var [x, y] = [1, 2];
console.assert(x === 1);
console.assert(y === 2);

var [m, n] = [1];
console.assert(m === 1);
console.assert(n === undefined);

var all, w, v;
all = [w, , v] = [1, 2, 4];
console.assert(w === 1);
console.assert(v === 4);
console.assert(all.length === 3);

var {x: name, y: age} = {x: "ZG", y: 12};
console.assert(name === "ZG");
console.assert(age === 12);

// for each / for
let a = {one: 1, two: 2};
for (let o in a) {
    console.assert(o === "one" || o === "two");
}
// for each not supported

// iterator
function Counter() {
    let count = 0;
    return {
        next: function () {
            return ++count;
        }
    };
}

let iterator = Counter();
console.assert(iterator.next() === 1);
console.assert(iterator.next() === 2);

// generator
// yield not supported

// array comprehension
// not supported

// generator expression
// not supported

// E4X
// not supported

