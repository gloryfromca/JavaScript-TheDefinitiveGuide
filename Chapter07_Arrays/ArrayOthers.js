"use strict";

// isArray
var a = [1, 2, 3];
Array.isArray(a);

// isArrayLike
function isArrayLike(o) {
    if (o && typeof o === "object" && isFinite(o.length) && o.length === Math.floor(o.length) && o.length >= 0 && o.length < 4294967296)
        return true;
    return false;
}

// apply array's func on Array-Like
var b = {};
b[0] = 1;
b[1] = 2;
b.length = 2;
console.assert(isArrayLike(b));
var c = Array.prototype.map.call(b, function (v) {
    return v + 1;
});
console.assert(c[0] === 2);

// string is viewed as read-only array
var d = "test";
console.assert(d.charAt(0) === 't');
console.assert(d[0] === 't');
console.assert(!Array.isArray(d));
