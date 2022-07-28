import json
import modulefinder
import requests
import re
import js2py

compare=js2py.require('compare-versions')

def package_json_comparev1v2(latest, current):
    return compare.satisfies(latest, current)

def package_json_parse(f):
    data=json.load(f)
    return data['dependencies']

def package_json_fetch_latest(name):
    url="https://registry.npmjs.org/{}".format(name)
    r=requests.get(url)
    response=r.text
    data=json.loads(response)
    return data["dist-tags"]['latest']

def package_json_check(modules):
    outdated=[]
    for name, version in modules.items():
        latest=package_json_fetch_latest(name)
        if package_json_comparev1v2(latest,version)==False:
            outdated.append((name,version,latest))
    return outdated

# with open('package.json','r') as f:
#     modules=package_json_parse(f)
#     outdated=package_json_check(modules)
#     print(outdated)

