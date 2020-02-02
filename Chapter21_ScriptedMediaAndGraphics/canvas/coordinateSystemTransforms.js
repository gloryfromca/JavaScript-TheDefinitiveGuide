function shear(c, kx, ky) {
    c.transform(1, ky, kx, 1, 0, 0);
}

function rotateAbout(c, theta, x, y) {
    var ct = Math.cos(theta);
    var st = Math.sin(theta);
    c.transform(ct, -st, st, ct, -x * ct - y * st + x, x * st - y * ct + y);
}

function callDefaultCoordinateSystem() {
    c.save();
    c.setTransform(1, 0, 0, 1, 0, 0);
    // c.restore();
}
