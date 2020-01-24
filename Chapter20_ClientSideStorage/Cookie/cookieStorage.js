function CookieStorage(maxage, path) {
    var cookie = (function () {
        var cookie = {};
        var all = document.cookie;
        if (all === "")
            return cookie;
        var list = all.split("; ");
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var p = item.indexOf("=");
            var name = item.substring(0, p);
            var value = item.substring(p + 1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    }());

    var keys = [];
    for (var key in cookie) {
        keys.push(key);
    }

    this.length = keys.length;

    this.key = function (n) {
        if (n < 0 || n > keys.length) return null;
        return keys[n];
    };

    this.getItem = function (name) {
        return cookie[name] || null;
    };

    this.setItem = function (key, value) {
        if (!(key in cookie)) {
            keys.push(key);
            this.length++;
        }

        cookie[key] = value;

        var item = key + "=" + encodeURIComponent(value);

        if (maxage) item += "; max-age=" + maxage;
        if (path) item += "; path=" + path;
        document.cookie = item;
    };

    this.removeItem = function (key) {
        if (!(key in cookie)) {
            return;
        }
        delete cookie[key];
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
                keys.splice(i, 1);
                break;
            }
        }
        this.length--;
        var item = key + "=; max-age=0";
        if (path) item += "; path=" + path;
        document.cookie = item;

    };

    this.clear = function () {
        for (var i = 0; i < keys.length; i++) {
            item = key + "=; max-age=0";
            if (path) item += "; path=" + path;
            document.cookie = item;
        }
        cookie = {};
        keys = [];
        this.length = 0;
    };
}