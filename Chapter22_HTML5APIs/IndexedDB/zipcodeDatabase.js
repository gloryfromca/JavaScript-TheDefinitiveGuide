var indexedDB = window.indexedDB || window.mozIndexedDB || window.wekitIndexedDB;

var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

var DB_VERSION = 1;

function logerr(e) {
    console.log("IndexedDB error " + e.code + ": " + e.message);
}

function withDB(f) {
    var request = indexedDB.open("zipcodes", DB_VERSION);
    request.onerror = logerr;
    var isUpgradeneeded = 0;
    request.onsuccess = function (e) {
        if (isUpgradeneeded) return;
        var db = request.result;
        f(db);
    };
    // onupgradeneeded before onsuccess
    request.onupgradeneeded = function (e) {
        isUpgradeneeded = 1;
        initdb(request.result, f);
    };
}

function initdb(db, f) {
    // some APIs deprecated, See reference below:
    // https://book.douban.com/people/16966317/annotation/10549733/

    var statusline = document.createElement("div");
    statusline.style.cssText = "position: fixed; left: 0px; top: 0px; width: 100%; color: white; background-color: black;" +
        "font: bold 18pt sans-serif; padding: 10px;";
    document.body.appendChild(statusline);

    function status(msg) {
        statusline.innerHTML = msg.toString();
    }

    status("Initializing zipcode database");

    var store = db.createObjectStore("zipcodes", {keyPath: "zipcode"});
    store.createIndex("cities", "city");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/JavaScript-TheDefinitiveGuide/Chapter22_HTML5APIs/samples/zipcodes.csv");
    xhr.send();
    xhr.onerror = logerr;
    var lastChar = 0;

    xhr.onload = function (e) {
        var lastNewLine = xhr.responseText.lastIndexOf("\n");
        if (lastNewLine > lastChar) {
            var chunk = xhr.responseText.substring(lastChar, lastNewLine);
            lastChar = lastNewLine + 1;
            var lines = chunk.split("\n");

            var transaction = db.transaction(["zipcodes"], "readwrite");
            var store = transaction.objectStore("zipcodes");
            for (var i = 0; i < lines.length; i++) {
                var fields = lines[i].split(",");
                var record = {
                    zipcode: fields[0],
                    city: fields[1],
                    state: fields[2],
                    latitude: fields[3],
                    longitude: fields[4]
                };
                var numbers = i + 1;
                var request;
                if (numbers === lines.length) {
                    request = store.put(record);
                    request.onsuccess = function () {
                        document.body.removeChild(statusline);
                        withDB(f);
                    };
                } else {
                    request = store.put(record);
                    request.onsuccess = function () {
                        status("Initializing zipcode database: loaded " + numbers + " records.");
                    }
                }
            }
        }
    };
}

function lookupCity(zip, callback) {
    withDB(function (db) {
        var transaction = db.transaction(["zipcodes"], "readonly", 0);
        var objects = transaction.objectStore("zipcodes");
        var request = objects.get(zip);
        request.onerror = logerr;
        request.onsuccess = function () {
            var object = request.result;
            if (object) {
                callback(object.city + ", " + object.state);
            } else {
                callback("Unknown zip code");
            }
        }
    });

}

function lookupZipcodes(city, callback) {
    withDB(function (db) {
        var transaction = db.transaction(["zipcodes"], "readonly", 0);
        var store = transaction.objectStore("zipcodes");
        var index = store.index("cities");

        var range = IDBKeyRange.only(city);
        var request = index.openCursor(range);
        request.onerror = logerr;
        request.onsuccess = function () {
            var cursor = request.result;
            if (!cursor) return;
            var object = cursor.value;
            callback(object);
            cursor.continue();
        }
    });
}

function displayCity(zip) {
    lookupCity(zip, function (s) {
        document.getElementById("city").value = s;
    });
}

function displayZipcodes(city) {
    var output = document.getElementById("zipcodes");
    output.innerHTML = "Matching zipcodes:";
    lookupZipcodes(city, function (o) {
        var div = document.createElement("div");
        var text = o.zipcode + ": " + o.city + ", " + o.state;
        div.appendChild(document.createTextNode(text));
        output.appendChild(div);
    })
}
