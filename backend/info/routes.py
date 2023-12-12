from flask import Blueprint, jsonify
from info.functions import links
import json

urls = Blueprint('urls', __name__)

api_results = links.urls_call()

@urls.route('/movies')
def grab_urls():
    try:         
        return jsonify(api_results)
    except FileNotFoundError:
        return jsonify({"error": "api call eror"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON from urls.json"}), 500