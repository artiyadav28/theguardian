import sys
import validators
import requests
import json
from github_version import app as gv
from legit_percent import app as lp
from sensitive_info import app as si

OPERATION = sys.argv[1].strip()
URL = sys.argv[2].strip()
if URL[-1] == '/':
    URL = URL[:-1]

AVAILABLE_OPERATIONS = ["legit_percent","sensitive_info","version_checker","pypi_vuln","npm_vuln"]
ERROR = {}
INVALID_URL = "Invalid URL. Please check the URL and try again."
SOMETHING_WRONG = "Something went wrong. Please try again."

def isValidURL():
    global URL
    if not validators.url(URL):
        return False
    try:
        r = requests.get(URL)
    except:
        return False
    if r.status_code == 200:
        return True
    return False

def isGitHubURL():
    global URL
    if (not URL.startswith("https://www.github.com/")) and (not URL.startswith("https://github.com/")):
        return False
    if URL.endswith(".git"):
        URL = URL[:-4]
    breakURL = URL.split('/')
    if not len(breakURL) == 5:
        return False
    return isValidURL()

def isPyPiURL():
    global URL
    if (not URL.startswith("https://www.pypi.org/project/")) and (not URL.startswith("https://pypi.org/project/")):
        return False
    breakURL = URL.split('/')
    if not len(breakURL) == 5:
        return False
    return isValidURL()

def isNpmURL():
    global URL
    if (not URL.startswith("https://www.npmjs.com/package/")) and (not URL.startswith("https://npmjs.com/package/")):
        return False
    breakURL = URL.split('/')
    if not len(breakURL) == 5:
        return False
    return isValidURL()
    
def main():
    global OPERATION, AVAILABLE_OPERATIONS, ERROR, URL
    if OPERATION not in AVAILABLE_OPERATIONS:
        return False
    if OPERATION == "version_checker":
        if not isGitHubURL():
            ERROR['error'] = INVALID_URL
            return False
        if not gv.main(URL):
            ERROR['error'] = SOMETHING_WRONG
            return False
    elif OPERATION == "legit_percent":
        if not isGitHubURL():
            ERROR['error'] = INVALID_URL
            return False
        if not lp.main(URL):
            ERROR['error'] = SOMETHING_WRONG
            return False
    elif OPERATION == "sensitive_info":
        if not isGitHubURL():
            ERROR['error'] = INVALID_URL
            return False
        if not si.main(URL):
            ERROR['error'] = SOMETHING_WRONG
            return False
    
    return True

if __name__ == "__main__":
    if not main():
        print(json.dumps(ERROR, indent=4))
    