from flask import Blueprint, jsonify
from flask_login import LoginManager
from flask import Flask
from flask import request
from account.functions.login import login_user_account, register_user_account

auth = Blueprint('auth', __name__)

@auth.route('/login', methods = ['POST'])
def login_user():
    response = request.get_json()
    if (response is None):
        return "Error with logging into user, please try again", 401
    
    res = login_user_account(response['username'], response['password'])
    if (res == False):
        print("code 401")
        return "Error with logging into user, please try again", 401
    else:
        print("code 200")
        data = {"jwt": res}
        return data, 200


@auth.route('/register', methods = ['POST'])
def register_user():
    response = request.get_json()
    print(response)
    if (response is None):
        return "Error with logging into user, please try again", 401
    
    res = register_user_account(response['username'], response['password'])
    if (res == False):
        return "Error with registering user, please try again", 401
    else:
        data = {"jwt": res}
        return data, 200
