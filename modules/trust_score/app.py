import requests
from requests.auth import HTTPBasicAuth
import json
import pathlib
from .functions import check_legit
from .functions import rate_limit
from math import ceil
from dotenv import dotenv_values

BASE_DIR = pathlib.Path(__file__).parent.resolve()
ENV_DIR = BASE_DIR / "../../.env"
config = dotenv_values(ENV_DIR)

PAGE_LIMIT = 100
REPO_INFO = {}

def init(cnf):
    # Choose one which has atleast one request remaining and also check for validity of the tokens
    token = "ERROR"
    for name in cnf:
        limit = rate_limit.getLimit(cnf[name])
        if limit == -1:
            return "ERROR"
        if (token == "ERROR") and (limit >= 1):
            token = cnf[name]
    return token

def choose_optimal(info, cnf):
    # Choosing a suitable token based on the approximate number of requests we have to make
    number_of_req = ceil(info["stargazers_count"]/100)
    chosen_one = 1000000
    token = "ERROR"
    for name in cnf:
        limit = rate_limit.getLimit(cnf[name])
        if limit >= number_of_req and limit < chosen_one:
            chosen_one = limit
            token = cnf[name]
    return token

def fill_repo_info(api, token):
    r = requests.get(api, auth=HTTPBasicAuth("", token))
    return json.loads(r.text)

def main(url):
    global URL, API_URL, REPO_INFO, GITHUB_TOKEN, config
    URL = url
    API_URL = f"https://api.github.com/repos/{URL.split('/')[-2]}/{URL.split('/')[-1]}"
    REPORT = {}
    try:
        if len(config) > 0:
            token = init(config)
        else:
            token = ""
        if token == "ERROR":
            raise Exception("Token Limit Expired")
        else:
            GITHUB_TOKEN = token
        REPO_INFO = fill_repo_info(API_URL, GITHUB_TOKEN)
        if len(config)>0:
            token = choose_optimal(REPO_INFO, config)
        if token == "ERROR":
            raise Exception("No optimal token found")
        else:
            GITHUB_TOKEN = token
        
        REPORT = check_legit.generateReport(REPO_INFO, GITHUB_TOKEN, API_URL)
    except:
        REPORT = {}
        REPORT['error'] = ""
    finally:
        if "error" in REPORT.keys():
            return False
        if "message" in REPORT.keys():
            REPORT['error'] = REPORT['message']
            del REPORT['message']
        print(json.dumps(REPORT, indent=4))
        return True
    
