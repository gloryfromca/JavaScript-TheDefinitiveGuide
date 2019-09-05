// all number is double
const number1 = 10;
const number2 = 10.0;
console.log(number1 == number2);

const number3 = 6e-2;
console.log(number3);

console.assert(Math.log2(2) == 1);

// overflow
const infinity = 1 / 0;
console.log(infinity);
console.assert(infinity > 100);
console.assert(infinity == Infinity);
console.assert(infinity === Infinity);

// underflow
const almostZero = 1 / Infinity;
console.log(almostZero);
console.assert(almostZero == 0);
console.assert(almostZero == -almostZero);
console.assert(almostZero === -almostZero);

// 0 / 0
const NotANumber = 0 / 0;
console.log(NotANumber);
console.assert(NotANumber != NaN);

// float
console.assert(0.1 == 0.1);
console.assert(0.3 - 0.2 != 0.1);

// Date
const now = new Date();
console.log(now);
console.log(now.getUTCHours());

// String
const txt1 = "张啦啦";
console.log(txt1.length);
const txt2 = "e";
console.log(txt2.length);

const df1 = "name\n\
is \\la\
";
console.log(df1);

// number
console.assert();


// escape sequence
const escapeWord = "zhang\xA9";
console.log(escapeWord);

// String Manipulation
const msg = "Hello, " + "world";
console.log(msg);
console.assert(msg[0] == 'H');
console.assert(msg.split(',')[0] == "Hello");

// pattern
const text = "1,2,3,3";
const pattern = /\d+/g;
const contain = text.search(pattern);
console.assert(contain != -1);
console.log(text.replace(pattern, "A"));

// boolean
const ds = null;
console.log(!ds);
console.log(!text.a);

// null undefined
const dt = "as";
console.log(typeof null);
console.log(typeof undefined);
console.log(dt.a == undefined);
console.log(dt.a == null);

// global variables
const global = this;
console.log(this);

// wrapper object
var s1 = "defer";
s1.name = "sd";
console.assert(s1.name === undefined);
const s2 = "lala";
const s3 = new String(s2);
console.assert(s2 == s3);
console.assert(s2 !== s3);
console.log(typeof s2);
console.log(typeof s3);

// reference type
var a = {a: 1};
var b = {a: 1};
console.assert(a.a == b.a);
console.assert(a != b);
console.assert(a === a);
