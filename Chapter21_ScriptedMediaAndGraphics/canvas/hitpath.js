function getlocationincanvas(context, event) {
    var canvas = context.canvas;
    var bb = canvas.getBoundingClientRect();

    var x = (event.clientX - bb.left) * (canvas.width / bb.width);
    var y = (event.clientY - bb.top) * (canvas.height / bb.height);
    return {"x": x, "y": y};
}

function hitpath(context, event) {
    var location = getlocationincanvas(context, event);
    return context.isPointInPath(location.x, location.y);
}

function hitpaint(context, event) {
    var location = getlocationincanvas(context, event);
    var pixels = context.getImageData(location.x, location.y, 1, 1);

    for (var i = 3; i < pixels.data.length; i += 4) {
        if (pixels.data[i] !== 0) return true;
    }
    return false;
}