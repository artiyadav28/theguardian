import pathlib
import json
from time import sleep
from importlib.machinery import SourceFileLoader
from dotenv import dotenv_values

from features.legit_percent.app import REPO_INFO, fill_repo_info

BASE_DIR = pathlib.Path(__file__).parent.resolve()
DATA_PATH = BASE_DIR / "../files/links.txt"
STORE_PATH = BASE_DIR / "../files/data.json"
LEGIT_PERCENT_PATH = BASE_DIR / "../../features/legit_percent"
ENV_DIR = BASE_DIR / "../../.env"

config = dotenv_values(ENV_DIR)
lp_app = SourceFileLoader("lp_app", LEGIT_PERCENT_PATH / "app.py")

def init():
    global DATA_PATH, URLS, DATASET
    f = open(DATA_PATH, "r")
    for line in f.readlines():
        line = line.strip()
        URLS.append(line)
    f.close()
    URLS = set(URLS)

    if DATA_PATH.is_file():
        f = open(DATA_PATH, "r")
        DATASET = json.load(f)
        f.close()
    else:
        DATASET = {}

def set_github_token(api):
    global config, REPO_INFO
    # Get one token for initial data, and fill repo_info
    token = lp_app.init(config)
    REPO_INFO = fill_repo_info(api, token)
    print(REPO_INFO)
    return token

def main():
    init()

    for url in URLS:
        API_URL = f"https://api.github.com/repos/{url.split('/')[-2]}/{url.split('/')[-1]}"
        token = set_github_token(API_URL)
        break

main()
