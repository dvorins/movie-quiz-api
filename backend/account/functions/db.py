import bson

from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo


from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId


def get_db():
    
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)

    if db is None:

        db = g._database = PyMongo(current_app).db
       
    return db


# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)

# adds user
def add_user(username, password):
    print("Reached db add_user")
    list = {'username' : username, 'password' : password}
    return db.users.insert_one(list)

# checks if user exists
def exists(username, password):
    if db.users.count_documents({ 'username' : username, 'password': password}, limit = 1) != 0:
        return True
    return False
    


