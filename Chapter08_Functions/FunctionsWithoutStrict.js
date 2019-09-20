// function check args' length.
function check(args) {
    var actual = args.length;
    var expected = args.callee.length;
    if (actual !== expected) {
        throw Error("Expected " + expected + "; got " + actual);
    }
}

function a(x, y, z) {
    check(arguments);
    return x + y + z;
}

console.assert(a(1, 2, 3) === 6);
try {
    console.assert(a(1, 2) === -1);
} catch (exception) {
    console.assert(exception instanceof Error);
}


