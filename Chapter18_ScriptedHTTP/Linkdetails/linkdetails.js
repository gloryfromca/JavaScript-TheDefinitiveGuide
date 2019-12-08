"use strict";

whenReady(function () {
        var supportsCORS = (new XMLHttpRequest()).withCredentials != undefined;
        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (!link.href) continue;
            if (link.title) continue;
            if (link.host !== location.host || link.protocol !== location.host) {
                link.title = "Other Site Link";
                if (!supportsCORS) {
                    continue;
                }
            }
            if (link.addEventListener) {
                link.addEventListener("mouseover", mouseoverHandler, false);
            } else {
                link.attachEvent("onmouseover", mouseoverHandler);
            }
        }

        function mouseoverHandler(e) {
            var link = e.target || e.srcElement;
            var url = link.href;
            var request = new XMLHttpRequest();

            request.open("HEAD", url);
            request.onreadystatechange = function () {
                if (request.readyState !== 4) return;
                if (request.status === 200) {
                    var type = request.getResponseHeader("Content-Type");
                    var length = request.getResponseHeader("Content-Length");
                    var date = request.getResponseHeader("Last-Modified");
                    link.title = "Type: " + type + " Length: " + length + " Date: " + date;
                } else {
                    link.title = "Status: " + request.status + " Text: " + request.statusText;
                }
            };
            request.send(null);
            if (link.removeEventListener) {
                link.removeEventListener("mouseover", mouseoverHandler, false);
            } else {
                link.detachEvent("onmouseover", mouseoverHandler);
            }
        }
    }
);