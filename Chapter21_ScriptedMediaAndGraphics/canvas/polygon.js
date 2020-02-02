function polygon(c, n, x, y, r, angle, counterclockwise) {
    angle = angle || 0;
    counterclockwise = counterclockwise || false;

    c.moveTo(x + r * Math.sin(angle), y - r * Math.cos(angle));
    var delta = 2 * Math.PI / n;
    for (var i = 1; i < n; i++) {
        angle += counterclockwise ? -delta : delta;
        c.lineTo(x + r * Math.sin(angle), y - r * Math.cos(angle));
    }
    c.closePath();
}

var canvas = document.getElementById("polygons");
canvas.setAttribute("width", "450");
canvas.setAttribute("height", "140");
c = canvas.getContext("2d");
c.beginPath();
polygon(c, 3, 50, 70, 50);
polygon(c, 4, 150, 60, 50, Math.PI / 4);
polygon(c, 5, 255, 55, 50);
polygon(c, 6, 365, 53, 50, Math.PI / 6);
polygon(c, 4, 365, 53, 20, Math.PI / 4, true);
c.fillStyle = "#ccc";
c.strokeStyle = "#008";
c.lineWidth = 5;

c.fill();
c.stroke();