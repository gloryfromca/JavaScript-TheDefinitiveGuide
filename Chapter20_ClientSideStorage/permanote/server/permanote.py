from flask import Flask, Response, request
import time

app = Flask(__name__)

notes = []

begin_time = int(time.time() * 1000)

class Note(object):
    def __init__(self, modified_time, note):
        self.modified_time = modified_time
        self.note = note

@app.route('/note', methods=['GET'])
def note_fetcher():
    if len(notes) == 0:
        content = "None"
        modified_time = begin_time
    else:
        last_note = notes[-1]
        content = last_note.note
        modified_time = last_note.modified_time

    result = Response(content, mimetype="text/plain")
    result.headers["Last-Modified"] = modified_time
    result.headers["Access-Control-Allow-Origin"] = "*"
    return result


@app.route('/note', methods=['POST'])
def note_saver():
    note = request.data

    notes.append(Note(modified_time=int(time.time() * 1000), note=note))
    result = Response("ok", mimetype="text/plain")
    result.headers["Access-Control-Allow-Origin"] = "*"
    return result


if __name__ == '__main__':
    app.run()
