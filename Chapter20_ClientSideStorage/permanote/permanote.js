var editor, statusline, savebutton, idletimer;

window.onload = function () {
    if (localStorage.note == null) localStorage.note = "";
    if (localStorage.lastModified == null) localStorage.lastModified = 0;
    if (localStorage.lastSync == null) localStorage.lastSync = 0;
    editor = document.getElementById("editor");
    statusline = document.getElementById("statusline");
    savebutton = document.getElementById("savebutton");

    editor.value = localStorage.note;
    editor.disabled = true;

    editor.addEventListener("input", function (e) {
        localStorage.note = editor.value;
        localStorage.lastModified = Date.now();
        // autoSave
        if (idletimer) clearTimeout(idletimer);
        idletimer = setTimeout(save, 5000);
        savebutton.disabled = false;
    }, false);

    sync();
};

window.onbeforeunload = function () {
    if (localStorage.lastSync < localStorage.lastModified) {
        save();
    }
};

window.onoffline = function () {
    status("Offline");
};

window.ononline = function () {
    sync();
};

window.applicationCache.onupdateready = function () {
    status("A newer version of this application is available. Reload to run it.");
};

window.applicationCache.onnoupdate = function () {
    status("you are running the latest version of the application.");
};

function save() {
    if (idletimer) clearTimeout(idletimer);
    idletimer = null;
    if (navigator.onLine) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5000/note");
        xhr.send(editor.value);
        xhr.onload = function (e) {
            localStorage.lastSync = Date.now();
            savebutton.disabled = true;
        }
    }
}

function sync() {
    // disable editor
    editor.disabled = true;

    if (navigator.onLine) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:5000/note");
        xhr.send();

        xhr.onload = function () {
            var remoteModTime = 0;
            var now = Date.now();
            if (xhr.status === 200) {
                var remoteModTimeString = xhr.getResponseHeader("Last-Modified");
                remoteModTime = new Date( parseInt(remoteModTimeString) ).getTime();
            }
            if (remoteModTime > localStorage.lastModified) {
                status("Newer note found on server.");
                var useit = confirm("Click Ok to use that version, or click Cancel to continue editing this version");
                if (useit) {
                    editor.value = xhr.responseText;
                    localStorage.note = xhr.responseText;
                    localStorage.lastSync = now;
                    status("use newer version of the note.");
                } else {
                    status("ignoring newer version of the note.");
                }
                localStorage.lastModified = now;
            } else {
                status("you are editing the current version of the note.");
            }

            if (localStorage.lastModified > localStorage.lastSync) {
                save();
            }

        };
    } else {
        status("offline can't sync");
    }

    // enable editor
    editor.disabled = false;
    editor.focus = true;
}

function status(msg) {
    statusline.innerHTML = msg;
}