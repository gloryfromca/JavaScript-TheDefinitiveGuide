(function ($) {
    $.fn.clickstar = function () {
        var isBind = true;
        if (arguments.length > 0) {
            isBind = arguments[0];
        }

        function showClickStar(e) {
            var clientX = e.clientX;
            var clientY = e.clientY;

            var newDiv = document.createElement("div");
            newDiv.innerText = "Star!!";
            newDiv.style.left = clientX + "px";
            newDiv.style.top = clientY + "px";
            document.body.appendChild(newDiv);
            setTimeout(function () {
                document.body.removeChild(newDiv);
            }, 800);
        }

        if (isBind) {
            this.each(function () {
                $(this).bind("click.clickstar", showClickStar);
            });
        } else {
            this.each(function () {
                $(this).unbind("click.clickstar");
            });
        }
        return this;
    };
}(jQuery));