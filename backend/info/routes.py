from flask import Blueprint
from info.functions import links

urls = Blueprint('urls', __name__)


@urls.route('/movies')
def grab_urls():
    return links.urls_call()