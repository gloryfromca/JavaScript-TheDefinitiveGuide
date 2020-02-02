function rads(x) {
    return Math.PI * x / 180;
}

function DrawingAndFillingCurves(c) {
    c.beginPath();

    c.arc(75, 100, 50, 0, rads(360), false);
    c.moveTo(200, 100);
    c.arc(200, 100, 50, rads(-60), rads(0), false);
    c.closePath();
    c.moveTo(325, 100);
    c.arc(325, 100, 50, rads(-60), rads(0), true);
    c.closePath();

    c.moveTo(450, 50);
    c.arcTo(500, 50, 500, 150, 30);
    c.arcTo(500, 150, 400, 150, 20);
    c.arcTo(400, 150, 400, 50, 10);
    c.arcTo(400, 50, 500, 50, 0);
    c.closePath();

    c.moveTo(75, 250);
    c.quadraticCurveTo(100, 200, 175, 250);
    c.fillRect(100 - 3, 200 - 3, 6, 6);

    c.moveTo(200, 250);
    c.bezierCurveTo(220, 220, 280, 280, 300, 250);

    c.fillRect(220 - 3, 220 - 3, 6, 6);
    c.fillRect(280 - 3, 280 - 3, 6, 6);

    c.fillStyle = "hsla(60, 100%, 50%, 0.5)";
    c.lineWidth = 5;
    c.fill();
    c.stroke();

}