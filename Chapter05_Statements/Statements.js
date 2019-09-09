// expression statement
var greeting;
greeting = "hello " + "world";
var df = 1;
df++;
var cos90;
cos90 = Math.cos(90);

// compound statement
{
    var x = Math.PI;
    var cx = Math.cos(Math.PI);
    console.assert(cx == -1);
}

// empty statement
var ds = 1;
if (false) ;
ds = 12;
console.assert(ds == 12);

// declaration statement
var i = 2;
var i = 2;

console.assert(dc1() == "1");

function dc1() {
    return "1";
}

console.assert(dc2 === undefined);
var dc2 = function () {
    return "1";
};

// condition statement
var which = 0;
switch (1) {
    case "1": {
        which = 1;
        break;
    }
    case 1: {
        which = 2;
        break;
    }
    default: {
        which = 3;
    }
}
console.assert(which === 2);

// for in
var dk = {x: 1, y: 2, z: 3};
var a = [], i = 0;
for (a[i++] in dk) ;
console.assert(new String(a) == 'x,y,z');

var dl = ["a", "b", "c"];
var b = [], j = 0;
for (b[j++] in dl) ;
console.assert(new String(b) == '0,1,2');

// identifier statements
var g = 0;
var h = 0;
whileloop: while (g < 4) {
    g++;
    continue whileloop;
    h = 12;
}
console.assert(g == 4);
console.assert(h == 0);

var success = false;
outercompound: {
    for (var i = 0; i < 10; i++) {
        if (i > 7) {
            break outercompound;
        }
    }
    success = true;
}
console.assert(success == false);

// others
var dr = {x: 2};
with (dr) x = 4;
console.assert(dr.x == 4);












