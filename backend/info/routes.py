from flask import Blueprint, jsonify
from info.functions import links
import json

urls = Blueprint('urls', __name__)


@urls.route('/movies')
def grab_urls():
    try:
        with open("/Users/samdvorin/Desktop/code/411/movie-quiz-api/backend/info/urls.json", "r") as file:
            data = json.load(file)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "urls.json not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON from urls.json"}), 500