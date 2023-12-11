from account.functions.db import get_db, add_user, exists
import jwt
import os
from dotenv import load_dotenv


def login_user_account(username, password):
    load_dotenv()
    if (exists(username, password)): 
        key = os.getenv('secret_key')
        payload = {
        'username': username,
        'password': password
        }
        return jwt.encode(payload, key)
    
    return False

def register_user(username, password):
    load_dotenv()
    if (exists(username, password)):
        return False
    add_user(username, password)
    key = os.getenv('secret_key')
    payload = {
        'username': username,
        'password': password
    }
    return jwt.encode(payload, key)