"use strict";
var inherit = require("../Chapter06_Objects/Objects");
var extend = require("../Chapter08_Functions/Functions");

// subclass
function defineSubclass(superclass, constructor, methods, statics) {
    var proto = inherit(superclass.prototype);
    constructor.prototype = proto;
    proto.constructor = constructor;
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    return constructor;
}

Function.prototype.extend = function (constructor, methods, statics) {
    return defineSubclass(this, constructor, methods, statics);
};

// constructor and method chain
function SubclassWithFilter(superclass, filter) {
    var _constructor = function () {
        superclass.apply(this, arguments);
    };
    var proto = inherit(superclass.prototype);
    _constructor.prototype = proto;
    proto.constructor = _constructor;
    proto.filter = filter;
    return _constructor;
}

function A() {
    this.value = [];
    for (var i = 0; i < arguments.length; i++) {
        this.value[i] = arguments[i];
    }
}

var AGtZeroValue = SubclassWithFilter(A, function () {
    return this.value.filter(function (x) {
        return x > 0;
    });
});

var c = new AGtZeroValue(1, -2, 3, -1);
var d = c.filter();
console.assert(d[0] === 1);
console.assert(d[1] === 3);
