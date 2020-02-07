onmessage = function (e) {
    postMessage("Start");
    postMessage(smear(e.data));
    postMessage("End");
};

function smear(pixels) {
    var width = pixels.width;
    var height = pixels.height;
    var data = pixels.data;
    var n = 10;
    var m = n - 1;
    for (var row = 0; row < height; row++) {
        var i = row * width * 4 + 4;
        for (var col = 1; col < width; col++, i += 4) {
            data[i] = (data[i] + data[i - 4] * m) / n;
            data[i + 1] = (data[i + 1] + data[i - 3] * m) / n;
            data[i + 2] = (data[i + 2] + data[i - 2] * m) / n;
            data[i + 3] = (data[i + 3] + data[i - 1] * m) / n;
        }
    }
    return pixels;

}