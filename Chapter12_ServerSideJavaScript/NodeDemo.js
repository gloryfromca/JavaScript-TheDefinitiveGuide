#! /usr/local/bin/node
var http = require("http");
var fs = require("fs");

var server = new http.Server();
server.listen(2000);
server.on("request", function (request, response) {
    var url = require("url").parse(request.url);
    if (url.pathname === "/test/delay") {
        var delay = parseInt(url.query) || 2000;
        response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
        response.write("Sleeping for " + delay + " milliseconds ...");
        setTimeout(function () {
            response.write("done");
            response.end();
        }, delay);
    } else if (url.pathname === "/test/mirror") {
        response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
        response.write(request.method + " " + request.url + " HTTP/" + request.httpVersion + "\r\n");
        for (var h in request.headers) {
            response.write(h + ": " + request.headers[h] + "\r\n");
        }
        response.write("\r\n");
        request.on("data", function (data) {
            response.write(response.write(data));
        });
        request.on("end", function (data) {
            response.end();
        });
    } else {
        var filename = url.pathname.substring(1);
        var type;
        switch (filename.substring(filename.lastIndexOf(".") + 1)) {
            case "html":
            case "htm":
                type = "text/html; charset=UTF-8";
                break;
            case "js":
                type = "application/javascript; charset=UTF-8";
                break;
            case "css":
                type = "text/css; charset=UTF-8";
                break;
            case "txt":
                type = "text/plain; charset=UTF-8";
                break;
            case "manifest":
                type = "text/cache-manifest; charset=UTF-8";
                break;
            default:
                type = "application/octet-stream";
                break;
        }
        fs.readFile(filename, function (err, content) {
            if (err) {
                response.writeHead(404,
                    {
                        "Content-Type": type
                    }
                );
                response.write(err.message);
                response.end();
            } else {
                response.writeHead(200, {
                    "Content-Type": type
                });
                response.write(content);
                response.end();
            }
        });
    }
});

