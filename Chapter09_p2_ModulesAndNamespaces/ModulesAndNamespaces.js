"use strict";

var allInThisModule;
if (!allInThisModule)
    allInThisModule = {};

// one module one global var
var MyCollections = {};
allInThisModule.MyCollections = MyCollections;
MyCollections.Set = function () {
    this._value = Object.create({});
};

MyCollections.List = function () {
    this._value = Object.create([]);
};

// using function's local scope to create private namespace
// put what you want to hide into function's local scope
MyCollections.Cache = (function invocation() {
    function Cache(fn) {
        this._fn = fn;
        this._cache = {};
    }

    Cache.prototype.isCached = function () {
        var key = makeKey(arguments);
        if (!(key in this._cache))
            this._cache[key] = this._fn(arguments);
        return this._cache[key];
    };

    function makeKey(args) {
        var result = "";
        Array.prototype.forEach.apply(args, function (x) {
            result = result + x.toString();
        });
        return result;
    }

    return Cache;
}());

console.assert(MyCollections.Cache.prototype.makeKey === undefined);
console.assert(MyCollections.Cache.prototype.isCached !== undefined);