import os
from utils.package_json import package_json_parse, package_json_check
from utils.requirements_txt import requirements_txt_parse, requirements_txt_check
import sys
import pathlib
from git import Repo
import shutil

BASE_DIR = pathlib.Path(__file__).parent.resolve()
PATH = BASE_DIR / "cloned_repos"
ERROR_MESSAGE = "SOMETHING WENT WRONG, PLEASE TRY AGAIN."

def find_all(name, path):
    result = []
    for root, dirs, files in os.walk(path):
        if name in files:
            result.append(os.path.join(root, name))
    return result

def clone():
    global URL, PATH
    URL = sys.argv[1]
    if URL[-1] == '/':
        URL = URL[:-1]
    if URL[-4:] == '.git':
        URL = URL[:-4]
    PATH = PATH / URL.split('/')[-1]
    Repo.clone_from(URL, PATH)

# clone()
output=dict()
try:
    packages=find_all("package.json",PATH)
    requirements=find_all("requirements.txt",PATH)

    for path in packages:
        with open(path,'r') as f:
            modules=package_json_parse(f)
            outdated=package_json_check(modules)
        v=dict()
        for module in outdated:
            d=dict()
            d["current"]=module[1]
            d["latest"]=module[2]
            v[module[0]]=d
        output["package"]=v
            
    for path in requirements:
        with open(path,'r') as f:
            modules=requirements_txt_parse(f)
            outdated=requirements_txt_check(modules)
            v=dict()
            for module in outdated:
                d=dict()
                d["current"]=module[1]
                d["latest"]=module[2]
                v[module[0]]=d
        output["requirements"]=v
except:
    output = dict()
    output["error"] = ERROR_MESSAGE
finally:
    print(output)
    # shutil.rmtree(PATH)