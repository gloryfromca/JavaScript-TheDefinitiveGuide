"use strict";

// how to import module's function in node js
var inherit = require("./Objects.js");

// access property fail
var book = {"subtitle": {}};
var content_len = book && book.content && book.content.length;
console.assert(content_len === undefined);

// delete property
var g = {x: 1};
console.assert(delete g.x);
console.assert(delete g.x);
console.assert(delete g.toString);
console.assert(delete 1);

try {
    delete Object.prototype;
    console.assert(1 == 2);
} catch (exception) {
    console.assert(exception instanceof TypeError)
}

// console.assert(delete this.q);

// test property
var h = {x: 1};
console.assert("x" in h);
console.hasOwnProperty("x");

var n = inherit({y: 2});
n.x = 1;
console.assert(n.propertyIsEnumerable("x"));
console.assert(!n.propertyIsEnumerable("y"));
console.assert(!Object.prototype.propertyIsEnumerable("toString"));

console.assert(n.h === undefined);

var k = {x: undefined};
console.assert("x" in k);
console.assert(k.x === undefined);

// enumeration property
function extend(o, p) {
    for (var prop in p) {
        o[prop] = p[prop];
    }
    return o;
}

// accessor property
var random = {
    get int16() {
        return Math.floor(Math.random() * 65536) - 32768;
    }
};

var p = {
    x: 3, y: 4,
    get r() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    set r(newValue) {
        var oldValue = this.r;
        var ratio = newValue / oldValue;
        this.x = ratio * this.x;
        this.y = ratio * this.y;
    }
};
console.assert(p.r == 5);
p.r = 10;
console.assert(p.x == 6);
console.assert(p.y == 8);

// property attribute
var j = {x: 1};
var j_x_descriptor = Object.getOwnPropertyDescriptor(j, "x");
console.assert(typeof j_x_descriptor == "object");
console.assert(j_x_descriptor['value'] == 1);
console.assert(j_x_descriptor['writable'] == true);
console.assert(j_x_descriptor['enumerable'] == true);
console.assert(j_x_descriptor['configurable'] == true);

var hj = {
    q: 1,
    get x() {
        return this.q
    },
    set x(newValue) {
        this.q = newValue
    }
};
var hj_q_descriptor = Object.getOwnPropertyDescriptor(hj, "x");
console.assert(typeof hj_q_descriptor == "object");
console.assert(typeof hj_q_descriptor["get"] == "function");
console.assert(typeof hj_q_descriptor["set"] == "function");
console.assert(hj_q_descriptor["enumerable"]);
console.assert(hj_q_descriptor["configurable"]);

// define property
var dk = {};
Object.defineProperty(dk, "x", {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: false
});
console.assert(dk.x == 2);
dk.x = 4;
console.assert(dk.x == 4);

// configurable is true and writable is false, can change value.
var pd = Object.defineProperty({},
    "x", {"value": 1, "writable": false, "enumerable": true, "configurable": true}
);
p.x = 12;

// configurable is false, writable can be from true to false.
var qd = Object.defineProperty({},
    "x", {"value": 1, "writable": true, "enumerable": true, "configurable": false}
);
Object.defineProperty(qd, "x", {"value": 1, "writable": false, "enumerable": true, "configurable": false});

// writing property that writable is false and configurable is false will raise error.
var sd = Object.defineProperty({},
    "x", {"value": 1, "writable": false, "enumerable": true, "configurable": false}
);
try {
    sd.x = 12;
    console.assert(1 === 2);
} catch (exception) {
    console.assert(exception instanceof TypeError);
}
