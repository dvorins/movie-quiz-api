import os
import requests
'''from dotenv import load_dotenv'''
import random
import json

def urls_call():
    # loads envs
    ''' load_dotenv()'''

    # env declarations
    movie_api_key = os.getenv('movie_api_key')
    movie_url = os.getenv('movie_url')
    movie_image_url = os.getenv('movie_image_url')
    youtube_api_key = os.getenv('youtube_api_key')
    youtube_url = os.getenv('youtube_url')

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

    movies = requests.get(url=movie_url, params=params, headers=headers).json()
    numbers = random.sample(range(0, len(movies["results"])), 9)
    movie_list = []

    for x in range(9):
        index = numbers[x]
        movie_id = movies["results"][index]["id"]
        movie_name = movies["results"][index]["title"]
        images = requests.get(url=movie_image_url+str(movie_id)+"/images", headers=headers).json()
        image_url = "https://image.tmdb.org/t/p/original" + images["posters"][random.randint(0, len(images["posters"]) - 1)]["file_path"]
        youtube_response = requests.get(url=youtube_url, params = {"part": "snippet", "maxResults": "5", "order": "relevance", "q": movie_name + "Soundtrack", "type": "video", "key": youtube_api_key}).json()
        soundtrack_url = "https://www.youtube.com/watch?v=" + youtube_response["items"][random.randint(0, 4)]["id"]["videoId"]
        movie_list.append({"Name": movie_name, "ImageURL": image_url, "SoundtrackURL:": soundtrack_url})
    
    file = open("urls.json", "w")
    file.write(json.dumps(movie_list))
    file.close()
    return json.dumps(movie_list)

