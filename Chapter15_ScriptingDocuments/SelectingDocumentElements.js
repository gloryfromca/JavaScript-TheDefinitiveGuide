"use strict";

// getElementById
var section1 = document.getElementById("section1");

function getElements(/** ids **/) {
    var elements = {};
    for (var i = 0; i < arguments.length; i++) {
        var id = arguments[i];
        var element = document.getElementById(id);
        if (element == null) {
            throw new Error("No element with id: " + id);
        }
        elements[id] = element;
    }
    return elements;
}

// getElementByName
var radiobuttons = document.getElementsByName("favorite_color");
document.favorite_color;

// getElementByTagName
var spans = document.getElementsByTagName("span");

var firstPara = document.getElementsByTagName("p")[0];
var firstParaSpans = firstPara.getElementsByTagName("span");

// another fast access, will return HTMLCollection
document.scripts;
document.links;
document.embeds === document.plugins;
document.body;
document.head;
document.documentElement;

// getElementsByClassName
document.getElementsByClassName("Large Bold");

// CSS Selector
// #name
// div
// .Large
// p[name="x"]
// *[name="x"]
// #log span
// #log>span
// body>h1:first-child
// div, #log
document.querySelectorAll();
document.querySelector();























