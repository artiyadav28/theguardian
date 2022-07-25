import sys
import requests
from requests.auth import HTTPBasicAuth
import json
import pathlib
from modules import check_legit
from math import ceil
from modules import rate_limit
from dotenv import dotenv_values

BASE_DIR = pathlib.Path(__file__).parent.resolve()
ENV_DIR = BASE_DIR / ".env"
config = dotenv_values(ENV_DIR)

GITHUB_TOKEN = ""

URL = sys.argv[1]
if URL[-1] == '/':
    URL = URL[:-1]
if URL[-4:] == '.git':
    URL = URL[:-4]
API_URL = f"https://api.github.com/repos/{URL.split('/')[-2]}/{URL.split('/')[-1]}"
PAGE_LIMIT = 100
REPO_INFO = {}

DEBUG = 1

def init():
    global GITHUB_TOKEN
    # Choose one which has atleast one request remaining and also check for validity of the tokens
    foundToken = False
    for name in config:
        limit = rate_limit.getLimit(config[name])
        if limit == -1:
            return (False, name)
        if (not foundToken) and (limit >= 1):
            GITHUB_TOKEN = config[name]
            foundToken = True
    return (foundToken, "NOTA")

def chooseOptimal():
    global GITHUB_TOKEN
    # Choosing a suitable token based on the approximate number of requests we have to make
    numberReq = ceil(REPO_INFO["stargazers_count"]/100)
    chosen_one = 1000000
    for name in config:
        limit = rate_limit.getLimit(config[name])
        if limit >= numberReq:
            if limit < chosen_one:
                chosen_one = limit
                GITHUB_TOKEN = config[name]
    if chosen_one == 1000000:
        return False
    return True

def fillRepoInfo():
    global API_URL, REPO_INFO, GITHUB_TOKEN
    r = requests.get(API_URL, auth=HTTPBasicAuth("", GITHUB_TOKEN))
    REPO_INFO = json.loads(r.text)

if __name__ == "__main__":
    ERROR = {}
    ERROR_MESSAGE = "SOMETHING WENT WRONG, PLEASE TRY AGAIN."
    try:
        check, err = init()
        if not check:
            if DEBUG:
                if err == "NOTA":
                    ERROR['message'] = "TOKEN LIMIT EXPIRED. PLEASE WAIT"
                else:
                    ERROR['message'] = f"SOMETHING WRONG WITH TOKEN: {err}"
            else:
                ERROR['message'] = ERROR_MESSAGE
            print(json.dumps(ERROR, indent=4))
            exit(0)
        fillRepoInfo()
        if not chooseOptimal():
            if DEBUG:
                ERROR['message'] = "TOKEN LIMIT INSUFFICIENT"
            else:
                ERROR['message'] = ERROR_MESSAGE
            print(json.dumps(ERROR, indent=4))
            exit(0)

        REPORT = check_legit.generateReport(REPO_INFO, GITHUB_TOKEN)
        print(json.dumps(REPORT, indent=4))
    except:
        ERROR['message'] = ERROR_MESSAGE
        print(json.dumps(ERROR, indent=4))
