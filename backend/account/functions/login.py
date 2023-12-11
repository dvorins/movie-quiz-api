from account.functions.db import get_db, add_user, exists
import jwt
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone

def login_user_account(username, password):
    load_dotenv()
    if (exists(username, password)): 
        key = os.getenv('secret_key')
        payload = {
        'username': username,
        'password': password
        }
        jwt = jwt.encode({"exp": (datetime.now(tz=timezone.utc) + timedelta(hours=24))}, payload, key)
        return {
            "username": username,
            "token": jwt
        }
    
    return False

def register_user_account(username, password):
    load_dotenv()
    if (exists(username, password)):
        return False
    add_user(username, password)
    key = os.getenv('secret_key')
    payload = {
        'username': username,
        'password': password
    }
    jwt = jwt.encode({"exp": (datetime.now(tz=timezone.utc) + timedelta(hours=24))}, payload, key)
    return {
            "username": username,
            "token": jwt
        }