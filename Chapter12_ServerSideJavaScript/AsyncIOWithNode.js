"use strict";
var fs = require("fs");

// how to print
console.log(1 === 1);

// wait for 500 ms
setTimeout(function () {
    console.log("after 500ms!")
}, 500);

// process namespace
console.log(process.version);
console.log(process.argv);
console.log(process.env["MAIL_PASSWORD"]);
console.log(process.pid);
console.log(process.getuid());
console.log(process.cwd());

// event emitter
// process.exit("exit", function () {
//     console.log("GoodBye!");
// });

// stream API

// buffer
var bytes = new Buffer.alloc(256);
for (var i = 0; i < bytes.length; i++) {
    bytes[i] = i;
}
var end = bytes.slice(240, 256);
console.assert(end[0] == 240);
end[0] = 0;
console.assert(bytes[240] == 0);
var more = new Buffer.alloc(8);
end.copy(more, 0, 8, 16);
console.assert(more[0] == 248);

// bytes encoding
var bytes = new Buffer.from("2πr", "utf8");
console.assert(bytes.length === 4);
console.assert(bytes.toString() === "2πr");
var buf = new Buffer.alloc(10);
var len = buf.write("2πr", 4);
console.assert(len === 4);
console.log(buf[4] === 50);
console.assert(buf.toString("utf8", 4, 4 + len) === "2πr");

// fs module
var text = fs.readFileSync("TestFile.json", "utf8");
var test_json = JSON.parse(text);
console.assert(test_json['name'] === "TestWeb");

function fileCopy(filename1, filename2, done) {
    var input = fs.createReadStream();
    var output = fs.createWriteStream();
    input.on("data", function (d) {
        output.write(d);
    });
    input.on("error", function (err) {
        throw err;
    });
    input.on("end", function () {
        output.end();
        if (done) {
            done()
        }
    });
}
