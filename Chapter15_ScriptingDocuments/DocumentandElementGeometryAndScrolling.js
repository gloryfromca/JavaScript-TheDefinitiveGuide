"use strict";

// viewport offset
window.pageXOffset;
window.pageYOffset;

// viewport size
window.innerWidth;
window.innerHeight;

// element size
var form = window.forms[0];
// will return x, y, height, width, top, bottom, left, right
form.getBoundingClientRect();
// multi rect
var span = form.firstChild();
span.getClientRects();

// locate element
var x = 300;
var y = 200;
document.elementFromPoint(x, y);

// scroll to bottom
var documentHeight = document.documentElement.offsetHeight;
var viewportHeight = window.innerHeight;
window.scrollTo(0, documentHeight - viewportHeight);

// scroll by increment
var xIncrement = 100;
var yIncrement = 100;
window.scrollBy(xIncrement, yIncrement);

// scroll element into viewport
span.scrollIntoView();

// simple getBoundingClientRect()
function getElementPos(elt) {
    var x = 0;
    var y = 0;
    for (var e = elt; e != null; e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    for (var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode) {
        x -= e.scrollLeft;
        y -= e.scrollTop;
    }
    return {x: x, y: y};
}
