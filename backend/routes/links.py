import os
import requests
from dotenv import load_dotenv
import random
import json

def urls_call():
    # loads envs
    load_dotenv()

    # env declarations
    movie_api_key = os.getenv('movie_api_key')
    movie_url = os.getenv('movie_url')
    movie_image_url = os.getenv('movie_image_url')
    youtube_api_key = os.getenv('youtube_api_key')
    youtube_url = os.getenv('youtube_url')

    # tmdb api header
    headers = {
        "accept": "application/json",
        "Authorization": movie_api_key
    }
    
    movies_list = {} # storage for 5 pages of movies, a nested dict thats TECHNICALLY 1-indexed
    movies_links = [] # final result
    
    # adds 5 pages worth of movies into movies dict
    # randomize between japanese movies and american movies
    for page_num in range(0, 5):
        coin = random.random()
        if (coin >= 0.5): # coin flip, greater than 0.5 = american movie, less than = japanese movie
            response = requests.get(url=movie_url, params = {"region": "US", "language": "en-US", "sort_by": "popularity.desc", "page": page_num + 1}, headers=headers).json()
        else:
            response = requests.get(url=movie_url, params = {"region": "US", "language": "ja", "sort_by": "popularity.desc", "page": page_num + 1}, headers=headers).json()
        movies_list[page_num] = response

    numbers = random.sample(range(100), k=60) # indexes of random movies in movies_list WITHOUT replacement
    
    for x in range(len(numbers)):
        page = int(numbers[x] / 20)
        index = numbers[x] - (20 * page)
        movie_id = movies_list[page]["results"][index]["id"]
        movie_name = movies_list[page]["results"][index]["title"]
        images = requests.get(url=movie_image_url+str(movie_id)+"/images", headers=headers).json()
        image_url = "https://image.tmdb.org/t/p/original" + images["posters"][random.randint(0, len(images["posters"]) - 1)]["file_path"]
        youtube_response = requests.get(url=youtube_url, params = {"part": "snippet", "maxResults": "5", "order": "relevance", "q": movie_name + "Soundtrack", "type": "video", "key": youtube_api_key}).json()
        soundtrack_url = "https://www.youtube.com/watch?v=" + youtube_response["items"][random.randint(0)]["id"]["videoId"]
        movies_links.append({"Name": movie_name, "ImageURL": image_url, "SoundtrackURL": soundtrack_url})
    
    return movies_links.json()