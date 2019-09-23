"use strict";
// prototype attribute
var q = {x: 1};
var p = {x: 1};
var o = Object.create(p);
console.assert(p.isPrototypeOf(o));
console.assert(!q.isPrototypeOf(o));


// class attribute
function classof(o) {
    if (o === null) {
        return "Null";
    }
    if (o === undefined) {
        return "Undefined";
    }
    return Object.prototype.toString.call(o).slice(8, -1);
}

module.exports = classof;

var num = new Number(12);
console.assert(classof(num) == 'Number');

// extensible
var gh = {x: 1, y: 2};
var gh_prevent = Object.preventExtensions(Object.create(gh));
try {
    gh_prevent.n = 1;
    console.assert(1 === 2);
} catch (exception) {
    console.assert(exception instanceof TypeError);
    console.assert(!Object.isExtensible(gh_prevent));
}

// sealed
var gh_sealed = Object.seal(Object.create(gh));
console.assert(gh_sealed.x === 1);
console.assert(Object.isSealed(gh_sealed));

// frozen
var gh_frozen = Object.freeze(Object.create(gh));
try {
    gh_frozen.x = 10;
} catch (exception) {
    console.assert(exception instanceof TypeError);
}
console.assert(gh_frozen.x == 1);


