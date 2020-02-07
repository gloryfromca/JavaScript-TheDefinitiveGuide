function readfile(f) {
    var reader = new FileReader();
    reader.readAsText(f);
    reader.onload = function () {
        var text = reader.result;
        var out = document.getElementById("output");
        out.innerHTML = "";
        out.appendChild(document.createTextNode(text));
    };
    reader.onerror = function (e) {
        console.log("Error", e);
    }
}

function typefile(f) {
    var slice = f.slice(0, 4);
    var reader = new FileReader();
    reader.readAsArrayBuffer(slice);
    reader.onload = function (e) {
        var buffer = reader.result;
        var view = new DataView(buffer);
        var magic = view.getUint32(0, false);
        switch (magic) {
            case 0x89504E47:
                f.verified_type = "image/png";
                break;
            case 0x47494638:
                f.verified_type = "image/gif";
                break;
            case 0x25504446:
                f.verified_type = "application/pdf";
                break;
            case 0x504b0304:
                f.verified_type = "application/zip";
                break;
        }
        console.log(f.name, f.verified_type);
    }
}