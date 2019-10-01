"use strict";

console.assert(window.location === document.location);

// parse url args
function urlArgs() {
    var args = {};
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf("=");
        if (pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[name] = value;
    }
    return args;
}

// jump to another web
location.assign("https://www.baidu.com");
location.replace("index.html");
location.reload();
location = "https://www.baidu.com";
location = "index.html";

// fragment identifier
location = "#top";

// change attribute of location
location.search = "?name=1";