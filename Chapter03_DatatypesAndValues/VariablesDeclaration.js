// no init, var is undefined
var i;
console.assert(i === undefined);

// duplication is ok
var j;
var j;

// local var must be declared by prefix `var`
var g1 = "g1";

function checkScope1() {
    var g1 = "l1";
}

checkScope1();
console.assert(g1 == "g1");

var g2 = "g2";

function checkScope2() {
    g2 = "l2";
}

checkScope2();
console.assert(g2 != "g2");

// javascript has no block scope
function testBlockScope() {
    {
        var df = "b1";
    }
    return df;
}

console.assert(testBlockScope() == "b1");

// declaration hoisting
function testDeclarationHoisting() {
    td = 1;
    var td;
    return td;
}

console.assert(testDeclarationHoisting() == 1);


// no strict mode to declare variables will be attribute of global object, which can be delete.
var global1 = 1;
global2 = 2;
console.assert(!(delete global1));
console.assert(delete global2);




