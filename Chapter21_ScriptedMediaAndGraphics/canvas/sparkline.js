function sparkline() {
    var elts = document.getElementsByClassName("sparkline");

    main: for (var i = 0; i < elts.length; i++) {
        var elt = elts[i];

        var content = elt.textContent || elt.innerText;
        var text = content.replace(/#.*$/gm, "");
        text = text.replace(/[\n\r\t\v\f]/g, " ").replace(/^\s+|\s+$/g, "");
        var data = text.split(/[\s,]+/);
        for (var num = 0; num < data.length; num++) {
            data[num] = Number(data[num]);
            if (isNaN(data[num])) continue main;
        }

        var style = getComputedStyle(elt, null);
        var color = style.color;
        var height = parseInt(elt.getAttribute("data-height")) || parseInt(style.fontSize) || 20;
        var width = parseInt(elt.getAttribute("data-width")) || data.length * (parseInt(elt.getAttribute("data-dx")) || height / 6);
        var ymin = parseInt(elt.getAttribute("data-ymin")) || Math.min.apply(Math, data);
        var ymax = parseInt(elt.getAttribute("data-ymax")) || Math.max.apply(Math, data);

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.title = content;
        elt.innerHTML = "";
        elt.appendChild(canvas);

        var context = canvas.getContext("2d");
        for (var j = 0; j < data.length; j++) {
            var x = width * ((j + 0.5) / data.length);
            var y = (ymax - data[j]) * height / (ymax - ymin);
            context.lineTo(x, y);
        }
        context.strokeStyle = color;
        context.stroke();
    }
}