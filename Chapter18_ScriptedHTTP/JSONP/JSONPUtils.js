"use strict";

function getJSONP(url, callback) {
    var cbnum = "cb" + getJSONP.counter++;
    var cbname = "getJSONP." + cbnum;
    if (url.indexOf("?") === -1)
        url = url + "?jsonp=" + cbname;
    else {
        url = url + "&jsonp=" + cbname;
    }
    var script = document.createElement("script");
    getJSONP[cbnum] = function (response) {
        try {
            callback(response);
        } finally {
            delete getJSONP[cbnum];
            script.parentNode.removeChild(script);
        }
    };
    script.src = url;
    document.body.appendChild(script);
}

getJSONP.counter = 0;