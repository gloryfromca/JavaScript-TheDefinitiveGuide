"use strict";

// other document features
document.cookie;

document.lastModified;

document.title;

document.domain;
document.location;
document.URL;

document.referrer;

// document write
document.write();
document.close();

function ElementStream(elt) {
    if (typeof elt === "string") elt = document.getElementById(elt);
    this.elt = elt;
    this.buffer = "";
}

ElementStream.prototype.write = function () {
    this.buffer += Array.prototype.join.call(arguments, "");
};
ElementStream.prototype.close = function () {
    this.elt.innerHTML = this.buffer;
    this.buffer = "";
};

// get selected text
window.getSelection().toString();

// Rich Text Format API
var url = "https://www.baidu.com";
document.execCommand("createLink", false, url);

document.queryCommandSupported();
document.queryCommandEnabled();

document.queryCommandState();
document.queryCommandValue();
document.queryCommandIndeterm();
