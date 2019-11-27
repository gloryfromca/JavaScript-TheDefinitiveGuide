"use strict";

whenReady(
    function () {
        var lists = document.getElementsByTagName("ul");
        var regexp = /\bdnd\b/;
        for (var i = 0; i < lists.length; i++) {
            if (regexp.test(lists[i].className)) dnd(lists[i]);
        }

        function dnd(list) {
            var origin_class = list.className;
            var enter = 0;

            list.ondragenter = function (e) {
                e = e || window.event;
                var from = e.relatedTarget;
                enter++;
                // first enter list
                if ((from && !ischild(from, list)) || enter == 1) {
                    var dt = e.dataTransfer;
                    var types = dt.types;
                    if (!types || (types.contains && types.contains("text/plain")) || (types.indexOf && types.indexOf("text/plain") != -1)) {
                        list.className = origin_class + " droppable";
                        return false;
                    }
                    return;
                }
                return false;
            };

            list.ondragover = function (e) {
                return false;
            };

            list.ondragleave = function (e) {
                e = e || window.event;
                var to = e.relatedTarget;
                enter--;
                // last leave list
                if ((to && !ischild(to, list)) || enter <= 0) {
                    list.className = origin_class;
                    enter = 0;
                }
                return false;
            };

            list.ondrop = function (e) {
                e = e || window.event;
                var dt = e.dataTransfer;
                var text = dt.getData("Text");
                if (text) {
                    var item = document.createElement("li");
                    item.draggable = true;
                    item.appendChild(document.createTextNode(text));
                    list.appendChild(item);
                    list.className = origin_class;
                    enter = 0;
                    return false;
                }
            };

            var items = list.getElementsByTagName("li");
            for (var i = 0; i < items.length; i++) {
                items[i].draggable = true;
            }

            list.ondragstart = function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.tagName !== "LI") return false;
                var dt = e.dataTransfer;
                dt.setData("Text", target.innerText || target.textContent);
                dt.effectAllowed = "copyMove";
            };

            list.ondragend = function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;

                if (e.dataTransfer.effectAllowed === "move") {
                    target.parentNode.removeChild(target);
                }
            };

            function ischild(a, b) {
                for (; a; a = a.parentNode) if (a === b) return true;
                return false;
            }


        }


    });