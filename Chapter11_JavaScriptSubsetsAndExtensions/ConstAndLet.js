"use strict";

// scope of let var is in statements block
{
    let a = 1;
}
try {
    a;
    console.assert(1 === 2);
} catch (e) {
    console.assert(e instanceof ReferenceError);

}

// `let` expression calculation in initial expression of recursive structure is in recursive structure's scope.
// `let` expression calculation in statements block is in recursive structure's scope.
let x = 1;

try {
    for (let x = x + 1; x < 5; x++) {
        console.assert(1 === 2);
    }
} catch (e) {
    console.assert(e instanceof ReferenceError);
}

try {
    let x = x + 1;
} catch (e) {
    console.assert(e instanceof ReferenceError);
}

// const
const d = {};
d.name = 1;
try {
    d = 1;
} catch (e) {
    console.assert(e instanceof TypeError);
}





