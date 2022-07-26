import sys
import validators
import requests
import json
from modules.trust_score import app as ts
from modules.sensitive_info import app as si
from modules.git_vuln import app as gv
from modules.npm_vuln import app as nv
from modules.pypi_vuln import app as pv
from modules.create_dataset import create_json, parse_json

AVAILABLE_OPERATIONS = ["trust_score","sensitive_info","git_vuln","pypi_vuln","npm_vuln","create_dataset"]
ERROR = {}
INVALID_URL = "Invalid URL. Please check the URL and try again."
SOMETHING_WRONG = "Something went wrong. Please try again."

OPERATION = ""
URL = ""

if len(sys.argv) == 1:
    print(json.dumps({"error": SOMETHING_WRONG}, indent=4))
    exit(0)
elif len(sys.argv) == 2:
    OPERATION = sys.argv[1].strip()
    if OPERATION != "create_dataset":
        print(json.dumps({"error": SOMETHING_WRONG}, indent=4))
        exit(0)
else:
    OPERATION = sys.argv[1].strip()
    URL = sys.argv[2].strip()
    if URL[-1] == '/':
        URL = URL[:-1]

def is_valid_url():
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

def is_github_url():
    global URL
    if (not URL.startswith("https://www.github.com/")) and (not URL.startswith("https://github.com/")):
        return False
    if URL.endswith(".git"):
        URL = URL[:-4]
    break_url = URL.split('/')
    if len(break_url) != 5:
        return False
    return is_valid_url()

def is_pypi_url():
    global URL
    if (not URL.startswith("https://www.pypi.org/project/")) and (not URL.startswith("https://pypi.org/project/")):
        return False
    break_url = URL.split('/')
    if len(break_url) != 5:
        return False
    return is_valid_url()

def is_npm_url():
    global URL
    if (not URL.startswith("https://www.npmjs.com/package/")) and (not URL.startswith("https://npmjs.com/package/")):
        return False
    break_url = URL.split('/')
    if len(break_url) != 5:
        return False
    return is_valid_url()

def main():
    global OPERATION, AVAILABLE_OPERATIONS, ERROR, URL
    if OPERATION not in AVAILABLE_OPERATIONS:
        return False
    if OPERATION == "git_vuln":
        if not is_github_url():
            ERROR['error'] = INVALID_URL
            return False
        if not gv.main(URL):
            ERROR['error'] = SOMETHING_WRONG
            return False
    elif OPERATION == "trust_score":
        if not is_github_url():
            ERROR['error'] = INVALID_URL
            return False
        if not ts.main(URL):
            ERROR['error'] = SOMETHING_WRONG
            return False
    elif OPERATION == "sensitive_info":
        if not is_github_url():
            ERROR['error'] = INVALID_URL
            return False
        if not si.main(URL):
            ERROR['error'] = SOMETHING_WRONG
            return False
    elif OPERATION == "npm_vuln":
        if not is_npm_url():
            ERROR['error'] = INVALID_URL
            return False
        if not nv.main(URL):
            ERROR['error'] = SOMETHING_WRONG
            return False
    elif OPERATION == "pypi_vuln":
        if not is_pypi_url():
            ERROR['error'] = INVALID_URL
            return False
        if not pv.main(URL):
            ERROR['error'] = SOMETHING_WRONG
            return False
    elif OPERATION == "create_dataset":
        if not create_json.main():
            ERROR['error'] = SOMETHING_WRONG
            return False
        if not parse_json.main():
            ERROR['error'] = SOMETHING_WRONG
            return False
    else:
        return False
    return True

if __name__ == "__main__":
    if not main():
        print(json.dumps(ERROR, indent=4))
    