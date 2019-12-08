"use strict";

function timeGetText(url, timeout, callback) {
    var request = new XMLHttpRequest();
    var timedout = false;

    var timer = setTimeout(function () {
        timedout = true;
        request.abort();
    }, timeout);
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState !== 4) return;
        if (timedout) return;
        clearTimeout(timer);
        if (request.status === 200) {
            callback(request.responseText);
        }
    };
    request.send(null);
}