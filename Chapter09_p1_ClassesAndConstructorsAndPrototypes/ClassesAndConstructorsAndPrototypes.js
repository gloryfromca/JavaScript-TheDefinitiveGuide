"use strict";
var inherit = require("../Chapter06_Objects/Objects");
var extend = require("../Chapter08_Functions/Functions");

// class implementation by prototype and factory function
function range(from, to) {
    var obj = inherit(range.methods);
    obj.from = from;
    obj.to = to;
    return obj;
}

range.methods = {
    includes: function (x) {
        return this.from <= x && this.to >= x;
    },
    toString: function () {
        return "from: " + this.from + " " + "to: " + this.to;
    }
};

var temperatureRange = range(10, 20);
console.assert(temperatureRange.includes(12));
console.assert(!temperatureRange.includes(21));
console.assert(temperatureRange.toString() === "from: 10 to: 20");

// class implementation by constructor
function Range(from, to) {
    this.from = from;
    this.to = to;
}

var rangeMethods = Object.create(range.methods);
rangeMethods.constructor = Range;
Range.prototype = rangeMethods;

var gradeRange = new Range(60, 100);
console.assert(!gradeRange.includes(59));
console.assert(gradeRange.includes(90));
console.assert(gradeRange.toString() === "from: 60 to: 100");

console.assert(gradeRange instanceof Range);

// prototype's `constructor` prototype
console.assert(Range.prototype.constructor === Range);

var a = function () {
};
console.assert(a.prototype.constructor === a);
var object_a = new a();
console.assert(object_a.constructor === a);

// simulation Java's class
function defineClass(constructor, methods, statics) {
    if (methods) {
        extend(constructor.prototype, methods);
    }
    if (statics) {
        extend(constructor, statics);
    }
    return constructor;

}

var simpleRange = defineClass(
    function (f, t) {
        this.f = f;
        this.t = t;
    },
    {
        includes: function (x) {
            return this.f <= x && this.t >= x
        },
        toString: function () {
            return "from: " + this.f + " " + "to: " + this.t;
        }
    },
    {
        upto: function (t) {
            return new simpleRange(0, t);
        }
    }
    )
;

var ageRange = simpleRange.upto(50);
console.assert(!ageRange.includes(51));
console.assert(ageRange.includes(1));

// function's prototype is not Object's prototype
var b = function () {
};
var c = function () {
};
console.assert(b.prototype !== c.prototype);

// extend prototype
var d = {};
var e = Object.create(d);
console.assert(e.name === undefined);
d.name = 'ER';
console.assert(e.name === 'ER');
