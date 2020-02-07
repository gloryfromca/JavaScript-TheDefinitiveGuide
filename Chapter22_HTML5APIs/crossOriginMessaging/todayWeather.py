import sys
from flask import Flask, Response, render_template

app = Flask(__name__, template_folder=".")

@app.route("/todayWeather.html", methods=["GET"])
def todayWeather():
    result = Response(render_template("todayWeather.html"))
    # iframe可以跨域，由此可能导致点击劫持，需要一种机制防止页面被加载到恶意站点的iframe元素
    # https://blog.csdn.net/qq_37193537/article/details/87086279
    # https://stackoverflow.com/questions/10205192/x-frame-options-allow-from-multiple-domains
    result.headers["Content-Security-Policy"] = "frame-ancestors http://localhost:*/"
    return result


if __name__ == '__main__':
    port = 5000
    if '-p' in sys.argv:
        port = int(sys.argv[sys.argv.index('-p') + 1])
    app.run(port=port)
