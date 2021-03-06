function pieChart(width, height, cx, cy, r, lx, ly, data, colors, labels) {
    var svgns = "http://www.w3.org/2000/svg";
    var chart = document.createElementNS(svgns, "svg:svg");
    chart.setAttribute("width", width);
    chart.setAttribute("height", height);
    chart.setAttribute("viewbox", "0 0 " + width + " " + height);

    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total += data[i];
    }

    var angles = [];
    for (var i = 0; i < data.length; i++) {
        angles[i] = data[i] / total * Math.PI * 2;
    }

    var startangle = 0;
    for (var i = 0; i < angles.length; i++) {

        var endangle = startangle + angles[i];
        var x1 = cx + r * Math.sin(startangle);
        var y1 = cy - r * Math.cos(startangle);
        var x2 = cx + r * Math.sin(endangle);
        var y2 = cy - r * Math.cos(endangle);

        var big = 0;
        if (endangle - startangle > Math.PI) {
            big = 1;
        }

        // wedge
        var path = document.createElementNS(svgns, "path");
        var d = "M " + cx + "," + cy
            + " L " + x1 + "," + y1
            + " A " + r + "," + r + " 0 " + big + " 1 " + x2 + "," + y2
            + " Z";
        path.setAttribute("d", d);
        path.setAttribute("fill", colors[i]);
        path.setAttribute("stroke", "black");
        path.setAttribute("stroke-width", "2");
        chart.appendChild(path);

        startangle = endangle;

        // icon
        var icon = document.createElementNS(svgns, "rect");
        icon.setAttribute("x", lx);
        icon.setAttribute("y", ly + 30 * i);
        icon.setAttribute("width", 20);
        icon.setAttribute("height", 20);
        icon.setAttribute("fill", colors[i]);
        icon.setAttribute("stroke", "black");
        icon.setAttribute("stroke-width", "2");
        chart.appendChild(icon);

        // label
        var label = document.createElementNS(svgns, "text");
        label.setAttribute("x", lx + 30);
        label.setAttribute("y", ly + 30 * i + 18);
        label.setAttribute("font-family", "sans-serif");
        label.setAttribute("font-size", "16");
        label.appendChild(document.createTextNode(labels[i]));
        chart.appendChild(label);
    }
    return chart;
}