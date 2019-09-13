"use strict";

// serialization
var o = {x: 1, y: {g: 2}, z: [1, 2, 3]};

var so = JSON.stringify(o);
var dso = JSON.parse(so);
console.assert(dso.x === 1);
console.assert(dso.y.g === 2);
console.assert(dso.z[2] === 3);
