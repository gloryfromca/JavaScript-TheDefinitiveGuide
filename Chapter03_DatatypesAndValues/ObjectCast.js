// to boolean
console.assert({});

console.assert([]);

console.assert([] == false);
console.assert([] != true);

console.assert({} != false);
console.assert({} != true);

// object type cast
console.assert(new Boolean([]));
console.assert(new Boolean({}));

console.assert(new Number([]) == 0);
console.assert(typeof new Number([]) == typeof new Number(0));

console.assert(new Number(["9"]) == 9);
console.assert(typeof new Number(["9"]) == typeof new Number(9));

// valueOf toString
const df1 = ["9"];
console.assert(df1.valueOf() === df1);
console.assert(df1.toString() == "9");
console.assert(df1 == "9");
console.assert(df1 == 9);

const df2 = ["9", "12"];
console.assert(df2.valueOf() === df2);
console.assert(df2.toString() == "9,12");
console.assert(df2 == "9,12");

console.assert(["9"] + "12" == "912");
console.assert(["9"] + 12 == "912");

console.assert(3 < ["9"]);
console.assert("3" < ["9"]);

const a1 = {};
a1.valueOf = function () {
    return "1";
};
console.assert(a1 == 1);
console.assert(a1 !== 1);

const a2 = {};
a2.valueOf = function () {
    return {};
};
a2.toString = function () {
    return 12;
};
console.assert(new Number(a2) == 12);
console.assert(new String(a2) == "12");

const a3 = {};
a3.valueOf = function () {
    return 13;
};
a3.toString = function () {
    return 12;
};
console.assert(new Number(a3) == 13);
console.assert(new String(a3) == "12");

// object + string or object + number:
// valueOf first, toString second
// getting string or number is end, no more conversion.
const b1 = {};
b1.valueOf = function () {
    return 1;
};
console.assert(b1 + 1 == 2);

const b2 = {};
b2.valueOf = function () {
    return "1";
};
console.assert(b2 + 1 == "11");

const b3 = {};
b3.valueOf = function () {
    return {};
};
b3.toString = function () {
    return "43"
};
console.assert(b3 + 1 == "431");
