"use strict";
var classof = require("../Chapter06_Objects/ObjectAttributes");

function Name() {
    this._name = "ER";
}

// how to distinguish type of object?

// instanceof
var a = new Name();
console.assert(a instanceof Name);
console.assert(Name.prototype.isPrototypeOf(a));

// constructor
console.assert(a.constructor === Name);

// constructor name
function type(o) {
    var t, c, n;
    if (o == null)
        return "null";
    if (o !== o)
        return "nan";
    if ((t = typeof o) !== "object") {
        return t;
    }
    if ((c = classof(o)) !== "Object") {
        return c.toLowerCase();
    }
    if (o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getOwnName())) {
        return n.toLowerCase();
    }
    return "object";
}

Function.prototype.getOwnName = function () {
    if ("name" in this)
        return this.name;
    return this.name = this.toString().match(/function\s*([^(]*)\(/)[2];
};

console.assert(type(1) === "number");
console.assert(type(new Date()) === "date");
console.assert(type({}) === "object");
console.assert(type(new Name()) === "name");
