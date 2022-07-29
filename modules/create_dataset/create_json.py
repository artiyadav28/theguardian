import pathlib
import json
from time import sleep
from dotenv import dotenv_values
from ..legit_percent.app import choose_optimal, init, fill_repo_info

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
    global config, REPO_INFO
    # Get one token for initial data, and fill repo_info
    token = init(config)
    if token == "ERROR":
        return False
    REPO_INFO = fill_repo_info(api, token)
    token = choose_optimal(REPO_INFO, config)
    if token == "ERROR":
        return False
    return token

def main():
    initialise()

    for url in URLS:
        API_URL = f"https://api.github.com/repos/{url.split('/')[-2]}/{url.split('/')[-1]}"
        token = set_github_token(API_URL)
        break
