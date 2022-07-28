from concurrent.futures import ThreadPoolExecutor
from math import ceil
import requests
from requests.auth import HTTPBasicAuth
import json

THREADS = 400
LAST_PAGE = "In order to keep the API fast for everyone, pagination is limited for this resource."
GITHUB_TOKEN = ""

def getStarDate(START, END):
    global API_URL, GITHUB_TOKEN, LAST_PAGE
    output = []
    for i in range(START, END):
        URL = API_URL + str(i)
        r = requests.get(URL, headers={"Accept":"application/vnd.github.v3.star+json"}, auth=HTTPBasicAuth("", GITHUB_TOKEN))
        if LAST_PAGE in r.text:
            break
        try:
            output += [x["starred_at"] for x in json.loads(r.text)]
        except:
            print(GITHUB_TOKEN)
            print(r.text)
            return output
    return output

def fixStars(stars):
    global API_URL, THREADS
    API_URL += f"/stargazers?per_page=100&page="
    
    pages = ceil(stars/100)

    pagesPerThread = ceil(pages/THREADS)
    start = 1

    output = []
    t = []
    with ThreadPoolExecutor(max_workers=500) as executor:
        for i in range(THREADS):
            t.append(executor.submit(getStarDate, start, min(start+pagesPerThread, pages+1)))
            start += pagesPerThread
    
    for thread in t:
        output+=thread.result()
    
    unique_output = set(output)
    return len(unique_output)

def getStars(REPO_INFO, TOKEN, api_url):
    global API_URL, GITHUB_TOKEN
    API_URL = api_url
    GITHUB_TOKEN = TOKEN
    s = REPO_INFO["stargazers_count"]
    return fixStars(s)