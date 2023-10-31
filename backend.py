from flask import Flask, Response
from requests_toolbelt import MultipartEncoder
import requests
import os
from dotenv import load_dotenv
import json

# loads envs
load_dotenv()

# env declarations
movie_api_key = os.getenv('movie_api_key')
movie_url = os.getenv('movie_url')
youtube_api_key = os.getenv('youtube_api_key')

# tmdb api headers and parameters
headers = {
    "accept": "application/json",
    "Authorization": movie_api_key
}
params = {
    "include_adult": "false",
    "include_video": "false",
    "language": "en-US",
    "sort_by": "vote_average.desc",
    "region": "US",
    "vote_average.gte": "8.0",
    "vote_count.gte": "200.0"
}

response = requests.get(url=movie_url, params=params, headers=headers)
movie_names = response.json()
movie_names_list = []
print(movie_names["results"][0]["title"])
for x in range(9):
    pass


#app = Flask(__name__)


#@app.route('/')
#def soundtrack_call():
#    return ""

#if __name__ == '__main__':
#    app.run(debug=True)
