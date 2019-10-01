"use strict";

function onLoad(f) {
    if (onLoad.loaded) {
        setTimeout(f, 0);
    } else if (window.addEventListener) {
        window.addEventListener("load", f, false);
    }
}

onLoad.loaded = false;
onLoad(function () {
    onLoad.loaded = true;
});