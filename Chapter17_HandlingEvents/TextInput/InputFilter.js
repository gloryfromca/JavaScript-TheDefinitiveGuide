"use strict";
whenReady(
    function () {
        var inputelts = document.getElementsByTagName("input");
        for (var i = 0; i < inputelts.length; i++) {
            var inputelt = inputelts[i];
            if (inputelt.type !== "text" || !inputelt.getAttribute("data-allowed-chars"))
                continue;
            if (inputelt.addEventListener) {
                inputelt.addEventListener("keypress", filter, false);
                inputelt.addEventListener("textinput", filter, false);
                inputelt.addEventListener("textInput", filter, false);
            } else {
                inputelt.attachEvent("onkeypress", filter);
            }
            inputelt.oninput = upcase;
            inputelt.onpropertychange = upcaseOnPropertyChange;
        }

        function filter(event) {
            var e = event || window.event;
            var target = e.target || e.srcElement;
            var text = null;
            if (e.type === "textinput" || e.type === "textInput") text = e.data;
            else {
                var code = e.charCode || e.keyCode;
                if (code < 32 || e.charCode == 0 || e.ctrlKey || e.altKey)
                    return;
                text = String.fromCharCode(code);
            }

            var allowed = target.getAttribute("data-allowed-chars");
            var messageid = target.getAttribute("data-messageid");
            if (messageid) {
                var messageElement = document.getElementById(messageid);
            }

            for (var i = 0; i < text.length; i++) {
                var c = text.charAt(i);
                if (allowed.indexOf(c) === -1) {
                    if (messageElement) messageElement.style.visibility = "visible";
                    if (e.preventDefault) e.preventDefault();
                    if (e.returnValue) e.returnValue = false;
                    return false;
                }
            }
            if (messageElement) messageElement.style.visibility = "hidden";
        }

        function upcase(event) {
            this.value = this.value.toUpperCase();
        }

        function upcaseOnPropertyChange(event) {
            var e = event || window.event;
            if (e.propertyName === "value") {
                this.onpropertychange = null;
                this.value = this.value.toUpperCase();
                this.onpropertychange = upcaseOnPropertyChange;
            }
        }

    }
);