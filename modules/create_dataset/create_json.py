import pathlib
import json
from time import sleep
from dotenv import dotenv_values

from ..legit_percent.app import choose_optimal, init, fill_repo_info
from ..legit_percent.data_collection import stars, forks, watchers

BASE_DIR = pathlib.Path(__file__).parent.resolve()
DATA_PATH = BASE_DIR / "files/links.txt"
STORE_PATH = BASE_DIR / "files/data.json"
ENV_DIR = BASE_DIR / "../../.env"

config = dotenv_values(ENV_DIR)

def initialise():
    global DATA_PATH, URLS, DATASET
    URLS = []
    f = open(DATA_PATH, "r")
    for line in f.readlines():
        line = line.strip()
        URLS.append(line)
    f.close()
    URLS = set(URLS)

    if STORE_PATH.is_file():
        f = open(STORE_PATH, "r")
        DATASET = json.load(f)
        f.close()
    else:
        DATASET = {}

def set_github_token(api):
    global config
    # Get one token for initial data, and fill repo_info
    repo_info = {}
    token = init(config)
    if token == "ERROR":
        return (token, repo_info)
    repo_info = fill_repo_info(api, token)
    token = choose_optimal(repo_info, config)
    return (token, repo_info)

def main():
    global REPO_INFO, DATASET
    initialise()

    i = 0
    try:
        for url in URLS:
            if url in DATASET.keys():
                continue
            API_URL = f"https://api.github.com/repos/{url.split('/')[-2]}/{url.split('/')[-1]}"
            token, repo_info = set_github_token(API_URL)
            if token == "ERROR":
                raise("Token Error")
            
            STARS = stars.getStars(repo_info, token, API_URL)
            FORKS = forks.getForks(repo_info)
            WATCHERS = watchers.getWatchers(repo_info)

            DATASET[url] = {
                "stars":STARS,
                "watchers":WATCHERS,
                "forks":FORKS
            }
            # print(DATASET)

            sleep(30)
            i += 1
            if i == 5:
                break
    finally:
        if token == "ERROR":
            return False
        f = open(STORE_PATH, "w")
        f.write(json.dumps(DATASET, indent=4))
        f.close()
        return True
