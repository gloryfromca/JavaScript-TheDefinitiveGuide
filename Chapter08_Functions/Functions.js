"use strict";

// function expression can have func name
var a = function ad(x) {
    if (x % 2 == 0)
        return x;
    else
        return ad(x + 1);
};
console.assert(a(1) === 2);
console.assert(a(2) === 2);

// this is None when use strict
function b() {
    console.assert(this === undefined);
}

b();

// function or method
function c() {
    this.a += 1;
}

var d = {a: 0};
d.add = c;

d.add();
console.assert(d.a === 1);

try {
    c();
    console.assert(1 === 2);
} catch (exception) {
    console.assert(exception instanceof TypeError);
}

// `this` in nest function will not point to `this` of outer method.
var e = {f: 2};
e.do = function () {
    function anotherAdd() {
        this.f += 1;
    }

    this.f += 1;
    return anotherAdd
};

try {
    e.do()();
    console.assert(1 === 2);
} catch (exception) {
    console.assert(e.f === 3);
    console.assert(exception instanceof TypeError);
}

// alias to `this` make using `this` of outer method is possible.
var g = {h: 1};
g.do = function () {
    var self = this;

    function antherDo() {
        self.h += 1;
    }

    this.h += 1;
    return antherDo
};

g.do()();
console.assert(g.h === 3);

// constructor can ignore parenthesis if no parameter.
var k = new Object();
var l = new Object;

// constructor just initializes object which prototype is constructor's prototype.
// return basic type will be ignored, the object will be returned.
var m = function arrayWithOneElement() {
    this[0] = 1;
    return 1;
};
m.prototype = Array.prototype;
var n = new m();
console.assert(n[0] === 1);

// optional parameter
function o(a, /* optional */ b) {
    b = b || 1;
    return a + b;
}

console.assert(o(1) === 2);

// extra arguments
function p() {
    var max = -Infinity;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max)
            max = arguments[i];
    }
    return max;
}

console.assert(p(1, 2, 3, 4) === 4);

// caller callee
// just work in non-strict mode.

// use object's property as arguments.
var s = {b: 2, a: 1};
var t = function (a, b, c) {
    return a * c;
};
var easy_t = function (args) {
    return t(args.a, args.b, args.c || 3);
};
console.assert(easy_t(s) === 3);

//function self's property
u.id = 1;

function u() {
    u.id = u.id || 0;
    u.id += 1;
}

u();
console.assert(u.id === 2);

// call apply
function v(a, b) {
    return a + b;
}

console.assert(v.call(null, 1, 2) === 3);
console.assert(v.apply(null, [1, 2]) === 3);

// bind
function bind(f, o) {
    if (f.bind) return f.bind(o);
    else return function () {
        return f.apply(o, arguments);
    }
}

function w(b) {
    return this.a + b;
}

var y = {a: 1};
var w_bind_y = bind(w, y);

console.assert(w_bind_y(2) === 3);

var w_bind_y_b = w.bind(y, 1);
console.assert(w_bind_y_b(10) === 2);

// bind function as constructor
function z(a, b, c) {
    this.q = a + b + c;
}

z.prototype = {y: 2};
var oz = {x: 1};

var z_bind = z.bind(oz, 1, 2);
var o_z_bind = new z_bind(3);
console.assert(o_z_bind.q === 6);
console.assert(o_z_bind.x === undefined);
console.assert(o_z_bind.y === 2);

// new Function
var ab = new Function("x", "y", "return x+y;");
console.assert(ab(1, 2) === 3);

// patch_extend
var extend = (function () {
    for (var p in {toString: null}) {
        return function (o) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var prop in source) {
                    o[prop] = source[prop];
                }
            }
            return o;
        };
    }

    return function (o) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var prop in source) {
                o[prop] = source[prop];
            }
            for (var j in protoprops) {
                var proto_prop = protoprops[j];
                if (source.hasOwnProperty(proto_prop)) {
                    o[proto_prop] = source[proto_prop];
                }
            }
        }
        return o;

    };
    var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty", "isPrototypeOf", "PropertyIsEnumerable", "toLocaleString"];

}());

var ae = {};
var be = {x: 2};
var ce = {toString: 4};
var de = {hasOwnProperty: 6};
var ae_extend = extend(ae, be, ce, de);
console.assert(ae.x === 2);
console.assert(ae.toString === 4);
console.assert(ae.hasOwnProperty === 6);

module.exports = extend;

// new Function is out of local scope.
var scope = "global";

function constructFunction() {
    var scope = "local";
    return new Function("return scope;");
}

var ac = constructFunction();
try {
    ac();
    console.assert(1 === 2);
} catch (exception) {
    console.assert(exception instanceof ReferenceError);
}
