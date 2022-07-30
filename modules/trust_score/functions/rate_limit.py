import requests
import json
from requests.auth import HTTPBasicAuth

def getLimit(GITHUB_TOKEN):
    try:
        r = requests.get("https://api.github.com/rate_limit", auth=HTTPBasicAuth(username="", password=GITHUB_TOKEN))
        INFO = json.loads(r.text)
        remaining = INFO["resources"]["core"]["remaining"]
        return remaining
    except:
        return -1