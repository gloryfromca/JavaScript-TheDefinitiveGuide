"use strict";
// object literal
var a = {
    "df": 1,
    ds: {
        "x": 1,
        "y": 2
    }
};

// object constructor
var b = new Object();

// prototype
console.assert(Object.prototype.prototype == undefined);

// object create
var c = Object.create({x: 1, y: 2});
var d = Object.create(null);
var e = Object.create(Object.prototype);

// inherit
function inherit(p) {
    if (p == null) throw TypeError();
    if (Object.create) {
        return Object.create(p);
    }
    var t = typeof p;
    if (t != "object" && t != "function") throw TypeError();

    function f() {
    };

    f.prototype = p;
    return new f();
}

// how to export module's function in node js
module.exports = inherit;

// Object.create
var o = {x: 12};
var f = inherit(o);
console.assert(o.isPrototypeOf(f));
console.assert(Object.getPrototypeOf(f) === o);
console.assert(f.x == 12);
f.x = 14;
console.assert(o.x == 12);

o.name = function () {
    return "Name";
};

console.assert(f.name() === "Name");



