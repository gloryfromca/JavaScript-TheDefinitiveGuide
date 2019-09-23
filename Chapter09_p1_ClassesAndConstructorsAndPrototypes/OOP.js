"use strict";
var inherit = require("../Chapter06_Objects/Objects");

// Set
function Set() {
    this.values = {};
    this.n = 0;
    this.add.apply(this, arguments);
}

Set.prototype.add = function () {
    for (var i = 0; i < arguments.length; i++) {
        var val = arguments[i];
        var str = Set._v2s(val);
        if (!this.values.hasOwnProperty(str)) {
            this.values[str] = val;
            this.n++;
        }
    }
    return this;
};

Set.prototype.delete = function () {
    for (var i = 0; i < arguments.length; i++) {
        var val = arguments[i];
        var str = Set._v2s(val);
        if (this.values.hasOwnProperty(str)) {
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};

Set.prototype.contains = function (value) {
    var str = Set._v2s(value);
    return this.values.hasOwnProperty(str);
};

Set.prototype.size = function () {
    return this.n;
};

Set._v2s = function (val) {
    switch (typeof val) {
        case "number":
            return "# " + val;
        case "string":
            return "' " + val;
        default:
            return "@ " + Set._v2s.objectId(val);
    }
};

Set._v2s.next = 0;

Set._v2s.objectId = function (o) {
    var prop = "|** objectId **|";
    if (!o.hasOwnProperty(prop)) {
        o[prop] = Set._v2s.next++;
    }
    return o[prop];
};


// Set test
var e1 = 1;
var e2 = new Date();
var e3 = {};
var e4 = [];

var e5 = {};
var e6 = 1;
var e7 = 4;

var s = new Set(e1, e2, e3, e4);
console.assert(s.contains(e1));
console.assert(s.contains(e2));
console.assert(s.contains(e3));
console.assert(s.contains(e4));
console.assert(!s.contains(e5));
console.assert(s.contains(e6));
console.assert(!s.contains(e7));
console.assert(s.size() === 4);

s.add("WE");
console.assert(s.size() === 5);
console.assert(s.contains("WE"));

s.delete(e6);
console.assert(s.size() === 4);
console.assert(!s.contains(e6));

// Enumerated Type
function enumeration(nameValues) {
    var _enumeration = function () {
        throw "Can't Instantiate Enumerations";
    };
    var proto = _enumeration.prototype = {
        constructor: _enumeration,
        toString: function () {
            return this.name;
        },
        valueOf: function () {
            return this.value;
        },
        toJSON: function () {
            return this.name;
        }
    };
    for (var name in nameValues) {
        var e = inherit(proto);
        _enumeration[name] = e;
        e.name = name;
        e.value = nameValues[name];
    }

    return _enumeration;
}

var Coin = enumeration({Penny: 1, Nickel: 5, Dime: 10, Quarter: 25});

console.assert(Coin.Penny == 1);
console.assert((Coin.Nickel + Coin.Penny + Coin.Dime + Coin.Quarter) === 41);
console.assert(String(Coin.Nickel) === "Nickel");

// equals
function A(x) {
    this.x = x;
}

var a1 = new A(1);
var a2 = new A(1);
A.prototype.equals = function (rhs) {
    return this.x === rhs.x;
};
console.assert(a1.equals(a2));

// how to get prototype of obj?
console.assert(a1.__proto__ === a1.constructor.prototype);
console.assert(A.prototype === a1.constructor.prototype);
console.assert(Object.getPrototypeOf(a1) === a1.constructor.prototype);
console.assert(a1.prototype === undefined);
























