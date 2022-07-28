import requests
from requests.auth import HTTPBasicAuth
import json
import pathlib
from .modules import check_legit
from .modules import rate_limit
from math import ceil
from dotenv import dotenv_values

BASE_DIR = pathlib.Path(__file__).parent.resolve()
ENV_DIR = BASE_DIR / ".env"
config = dotenv_values(ENV_DIR)

PAGE_LIMIT = 100
REPO_INFO = {}

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

def main(url):
    global URL, API_URL, REPO_INFO, GITHUB_TOKEN
    URL = url
    API_URL = f"https://api.github.com/repos/{URL.split('/')[-2]}/{URL.split('/')[-1]}"
    REPORT = {}
    try:
        check, err = init()
        if not check:
            raise Exception("Token Limit Expired")
        fillRepoInfo()
        if not chooseOptimal():
            raise Exception("No optimal token found")
        REPORT = check_legit.generateReport(REPO_INFO, GITHUB_TOKEN, API_URL)
    except:
        REPORT = {}
        REPORT['error'] = ""
    finally:
        if "error" in REPORT.keys():
            return False
        print(json.dumps(REPORT, indent=4))
        return True
    
