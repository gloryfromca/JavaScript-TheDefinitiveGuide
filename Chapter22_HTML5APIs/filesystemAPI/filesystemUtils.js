function logerr(e) {
    console.log(e);
}

var filesystem;

var requested_bytes = 10 * 1024 * 1024;

navigator.webkitPersistentStorage.requestQuota(requested_bytes,
    function (grantedBytes) {
        webkitRequestFileSystem(PERSISTENT, grantedBytes, function (fs) {
            filesystem = fs;
            // startup command with option
            // /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --unlimited-quota-for-files --allow-file-access-from-files
            makeDirectory("documents", function () {
                console.log("makeDirectory done");
            });
            appendToFile("documents/name.txt", ["zhanghui"], function () {
                console.log("appendToFile done");
            });
            appendToFile("documents/name.txt", [" ", "chandler"], function () {
                console.log("appendToFile done");
            });
            readTextFile("documents/name.txt", function (result) {
                console.log("Content: ", result);
            });
            listFiles(null, function (list) {
                console.log("Files: ", list);
            });
            listFiles("documents", function (list) {
                console.log("Files: ", list);
            });
            setTimeout(
                function () {
                    deleteFile("documents/name.txt", function (e) {
                        console.log("delete done");
                        listFiles("documents", function (list) {
                            console.log("Files: ", list);
                        });
                    })
                }
                , 1000
            );

        }, logerr)
    }, logerr
);

function readTextFile(path, callback) {
    filesystem.root.getFile(path, {}, function (entry) {
        entry.file(function (file) {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                callback(reader.result);
            };
            reader.onerror = logerr;
        }, logerr);
    }, logerr);
}

function appendToFile(path, contents, callback) {
    filesystem.root.getFile(
        path,
        {create: true},
        function (entry) {
            entry.createWriter(
                function (writer) {
                    writer.seek(writer.length);
                    var bb = new Blob(contents);
                    writer.write(bb);
                    writer.onerror = logerr;
                    if (callback) {
                        writer.onwrite = callback;
                    }
                }, logerr);
        }, logerr);
}

function deleteFile(name, callback) {
    filesystem.root.getFile(name, {}, function (entry) {
        entry.remove(callback, logerr);
    }, logerr);
}

function makeDirectory(name, callback) {
    filesystem.root.getDirectory(name, {create: true, exclusive: true}, callback, logerr);
}

function listFiles(path, callback) {

    if (!path) getFiles(filesystem.root);
    else filesystem.root.getDirectory(path, {}, getFiles, logerr);

    function getFiles(dir) {
        var reader = dir.createReader();
        var list = [];
        reader.readEntries(handleEntries, logerr);

        function handleEntries(entries) {
            if (entries.length == 0) callback(list);
            else {
                for (var i = 0; i < entries.length; i++) {
                    var name = entries[i].name;
                    if (entries[i].isDirectory) name += "/";
                    list.push(name);
                }
                reader.readEntries(handleEntries, logerr);
            }
        }

    }

}