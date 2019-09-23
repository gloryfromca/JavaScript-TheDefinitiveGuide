"use strict";

// make property non-numerable
(function () {
    Object.defineProperty(Object.prototype, "objectId", {
        get: idGetter,
        enumerable: false,
        configurable: false
    });

    function idGetter() {
        if (!(idprop in this)) {
            if (!Object.isExtensible(this))
                throw Error("Can't define id for non-extensible object");
            Object.defineProperty(this, idprop, {
                value: nextid++,
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
        return this[idprop];
    }

    var idprop = "|** Object Id **|";
    var nextid = 0;

}());

var a = {};
var b = {};
console.assert(a.objectId === 0);
console.assert(b.objectId === 1);

// un-changeable class
function Range(from, to) {
    var props = {
        from: {value: from, enumerable: true, writable: false, configurable: false},
        to: {value: to, enumerable: true, writable: false, configurable: false}
    };

    if (this instanceof Range)
        Object.defineProperties(this, props);
    else
        return Object.create(Range.prototype, props);
}

var c = Range(1, 4);
for (var prop in c) {
    console.assert((c[prop] === 1) || (c[prop] === 4));
}

// property descriptor
function freeProps(o) {
    var props = (arguments.length === 1) ? Object.getOwnPropertyNames(o) : Array.prototype.slice.call(arguments, 1);
    props.forEach(function (prop) {
        if (!Object.getOwnPropertyDescriptor(o, prop).configurable) return;
        Object.defineProperty(o, prop, {writable: false, configurable: false});
    });
    return o;
}

function hideProps(o) {
    var props = (arguments.length === 1) ? Object.getOwnPropertyNames(o) : Array.prototype.slice.call(arguments, 1);
    props.forEach(function (prop) {
        if (!Object.getOwnPropertyDescriptor(o, prop).configurable) return;
        Object.defineProperty(o, prop, {enumerable: false});
    });
    return o;
}

function Name(n) {
    this.name = n;
    freeProps(this);
}

var d = new Name("ZA");
console.assert(d instanceof Name);

try {
    d.name = "ZB";
    console.assert(1 === 2);
} catch (exception) {
    console.assert(exception instanceof TypeError);
}

Name.prototype = hideProps({
    constructor: Name,
    la: 12,
    toUpCase: function () {
        return this.name.toUpperCase();
    }
});

//  `Name` d's creation is before changing prototype.
console.assert(d.toUpCase === undefined);
console.assert(!(d instanceof Name));

var f = new Name("ZA");
console.assert(f.toUpCase() === "ZA");

// prevent class extension
function G(name) {
    this._name = name;
}

var originProto = G.prototype;

G.prototype = Object.create(originProto);
Object.preventExtensions(G.prototype);

try {
    G.prototype.id = 2;
    console.assert(1 === 2);
} catch (exception) {
    console.assert(exception instanceof TypeError);
}

G.prototype = Object.create(originProto);
Object.seal(G.prototype);

try {
    G.prototype._name = "QA";
    console.assert(1 === 2);
} catch (exception) {
    console.assert(exception instanceof TypeError);
}




















