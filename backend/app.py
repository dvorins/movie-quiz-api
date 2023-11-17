from __future__ import print_function
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for
from flask_cors import CORS

import links
import io
import os
import uuid
import json

app = Flask(__name__)
CORS(app)
app.secret_key = 's3cr3t'
app.debug = True
app._static_folder = os.path.abspath("movie-quiz-api/movie-quiz/")


@app.route("/test")
def test():
    return jsonify({
        "urls": [
            "https://www.example.com/page1",
            "https://www.example.com/page2",
            "https://www.example.com/page3",
            "https://www.example.com/page4",
            "https://www.example.com/page5"
        ]
    })

@app.route("/movies")
def movies():
    try:
        with open("urls.json", "r") as file:
            data = json.load(file)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "urls.json not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON from urls.json"}), 500

@app.route("/")
def test1():
    return("test")



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)