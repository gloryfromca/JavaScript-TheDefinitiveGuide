if (window.EventSource === undefined) {
    window.EventSource = function (url) {
        var xhr;
        var evtsrc = this;
        var charsReceived = 0;
        var type = null;
        var data = "";
        var eventName = "message";
        var lastEventId = "";
        var retrydelay = 1000;
        var aborted = false;

        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            switch (xhr.readyState) {
                case 3:
                    processData();
                    break;
                case 4:
                    reconnect();
                    break;
            }
        };

        connect();

        function connect() {
            charsReceived = 0;
            type = null;
            xhr.open("GET", url);
            xhr.setRequestHeader("Cache-Control", "no-cache");
            if (lastEventId) xhr.setRequestHeader("Last-Event-Id", lastEventId);
            xhr.send();
        }

        function reconnect() {
            if (aborted) return;
            if (xhr.status >= 300) return;
            setTimeout(connect, retrydelay);
        }

        function processData() {
            if (!type) {
                type = xhr.getResponseHeader("Content-Type");
                if (type !== "text/event-stream") {
                    aborted = true;
                    xhr.abort();
                    return;
                }
            }

            var chunk = xhr.responseText.substring(charsReceived);
            charsReceived = xhr.responseText.length;
            var lines = chunk.replace(/\r\n|\r|\n$/, "").split(/\r\n|\r|\n/);
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i], pos = lines.indexOf(":"), name, value = "";
                if (pos === 0) continue;
                if (pos > 0) {
                    name = line.substring(0, pos);
                    value = line.substring(pos + 1);
                    if (value.charAt(0) === " ") value = value.substring(1);
                } else {
                    name = line;
                }
                switch (name) {
                    case "event" :
                        eventName = value;
                        break;
                    case "data":
                        data += value + "\n";
                        break;
                    case "id":
                        lastEventId = value;
                        break;
                    case "retry":
                        retrydelay = parseInt(value) || 1000;
                        break;
                    default:
                        break;
                }
                // empty line means that message is sent in client.
                if (line === "") {
                    if (evtsrc.onmessage && data !== "") {
                        if (data.charAt(data.length - 1) === "\n") {
                            data = data.substring(0, data.length - 1);
                        }
                        evtsrc.onmessage({
                            type: eventName,
                            data: data,
                            origin: url,
                        });
                    }
                    data = "";
                    eventName = "message";
                }

            }

        }

    };

}