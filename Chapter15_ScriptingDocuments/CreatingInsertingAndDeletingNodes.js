"use strict";

// create element
var span = document.createElement("span");

// Text Node
var newTextNode = document.createTextNode("Something");

// insert element
var form = document.forms[0];
form.appendChild(span);
var i = 1;
form.insertBefore(span, form.childNodes[i]);

// delete element
span.parentNode.removeChild(span);

// replace element
span.parentNode.replaceChild(document.createTextNode("Hi"), span);

// clone element
span.cloneNode(true);

// document fragment
function reverse(n) {
    var f = document.createDocumentFragment();
    // f.appendChild will move n.lastChild to f.
    while (n.lastChild) f.appendChild(n.lastChild);
    n.appendChild(f);
}