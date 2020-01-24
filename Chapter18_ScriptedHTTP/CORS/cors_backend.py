import sys
from flask import Flask, Response, render_template

app = Flask(__name__, template_folder="../CORS")


@app.route("/note", methods=["GET"], provide_automatic_options=False)
def note():
    result = Response('{"name": 1}', mimetype="application/json")
    result.headers["Access-Control-Allow-Origin"] = "*"
    return result


@app.route("/note", methods=["OPTIONS"])
def note_cors_preflight():
    result = Response('OK')
    result.headers["Access-Control-Allow-Origin"] = "*"
    result.headers["Access-Control-Allow-Headers"] = "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, My-Name"
    result.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST"
    result.headers["Access-Control-Max-Age"] = 1000
    return result


@app.route("/index.html", methods=["GET"])
def index_getter():
    result = render_template("cors_frontend.html")
    return result


if __name__ == '__main__':
    port = 5000
    if '-p' in sys.argv:
        port = int(sys.argv[sys.argv.index('-p') + 1])
    app.run(port=port)
