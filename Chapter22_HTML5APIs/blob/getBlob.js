function getBlob(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function () {
        callback(xhr.response);
    };
    xhr.send(null);
}