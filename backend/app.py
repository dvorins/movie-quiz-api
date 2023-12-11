from __future__ import print_function
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for
from flask import Blueprint
from flask_cors import CORS

from info import routes
from account import login_routes
import io
import os
import uuid
import json

from flask import Flask
from flask_cors import CORS
from info import routes
from account import login_routes

app = Flask(__name__)
app.register_blueprint(routes.urls)
app.register_blueprint(login_routes.auth)

# Enable CORS for all routes
CORS(app)

app.config['MONGO_URI'] = "mongodb://localhost:27017/accounts"

if __name__ == '__main__':
    app.run(host='localhost', port=5001, debug=True)

