"use strict";

var http = require("http");

exports.getOrPost = function (url, callback, method, data) {
    url = require("url").parse(url);
    var hostname = url.hostname;
    var port = url.port || 80;
    var path = url.pathname;
    var query = url.query;
    if (query) path += "?" + query;

    var request;
    var options = {
        hostname: hostname,
        port: port,
        path: path,
        query: query
    };
    var headers;
    if (method.toUpperCase() === "POST") {
        var type;
        if (data == null) data = "";
        if (data instanceof Buffer) type = "application/octet-stream";
        else if (typeof data === "string") type = "text/plain charset=UTF-8";
        else if (typeof data === "object") {
            data = require("querystring").stringify(data);
            type = "application/x-www-form-urlencoded";
        }
        headers = {
            "Host": hostname,
            "Content-Type": type
        };
        options["headers"] = headers;
        request = http.request(options);
        request.write(data);
    } else {
        headers = {
            "Host": hostname,
        };
        options["headers"] = headers;
        request = http.request(options);
    }
    request.on("response", function (response) {
        response.setEncoding("utf-8");
        var body = "";
        response.on("data", function (chunk) {
            body += chunk;
        });
        response.on("end", function (chunk) {
            if (callback) {
                callback(response.statusCode, response.headers, body);
            }
        });
    });
    request.end();
};
