"use strict";

// access element attribute
var form = document.forms[0];
form.action = "https://www.baidu.com";
form.method = "POST";

// special attribute name
// <label for=""></label>
label.htmlFor;
// <span class="Large"></span>
span.className;
console.assert(span.style instanceof CSSStyleDeclaration);

// non-standard attributes
var image = document.images[0];
var width = parseInt(image.getAttribute("WIDTH"));
image.hasAttribute("SHOW");

// dataset attributes
// <span id="spanA" data-xmin=1></span>
var xmin = parseInt(span.dataset.xmin);

// attributes
document.body.attributes.link;