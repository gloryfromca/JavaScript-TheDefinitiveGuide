"use strict";
var httpUtils = require("./httputils");

function callback(code, headers, body) {
    console.log(code);
    console.log(headers);
    console.log(body);
}

function TestGet() {
    var url = "http://www.baidu.com";
    httpUtils.getOrPost(url, callback, "GET");
}

function TestPost() {
    var url = "http://www.baidu.com";
    httpUtils.getOrPost(url, callback, "POST", {"name": "LL"});

}

TestGet();
TestPost();