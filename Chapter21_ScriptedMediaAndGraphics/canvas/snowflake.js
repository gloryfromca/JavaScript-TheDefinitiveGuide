var deg = Math.PI / 180;

function snowflake(c, n, x, y, len) {
    c.save();
    c.translate(x, y);
    c.moveTo(0, 0);
    leg(n);
    c.rotate(-90 * deg);
    leg(n);
    c.rotate(-90 * deg);
    leg(n);
    c.rotate(-90 * deg);
    leg(n);
    c.closePath();
    c.restore();

    function leg(n) {
        c.save();
        if (n == 0) {
            c.lineTo(len, 0);
        } else {
            c.scale(1 / 3, 1 / 3);
            leg(n - 1);
            c.rotate(60 * deg);
            leg(n - 1);
            c.rotate(-120 * deg);
            leg(n - 1);
            c.rotate(60 * deg);
            leg(n - 1);
        }
        c.restore();
        c.translate(len, 0);
    }

}
