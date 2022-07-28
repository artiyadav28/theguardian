import os
from .utils.package_json import package_json_parse, package_json_check
from .utils.requirements_txt import requirements_txt_parse, requirements_txt_check
import pathlib
from git import Repo
import shutil
import json

BASE_DIR = pathlib.Path(__file__).parent.resolve()
PATH = BASE_DIR / "cloned_repos"
if not os.path.exists(PATH):
    os.mkdir(PATH)

def find_all(path):
    packages = []
    requirements = []
    for root, dirs, files in os.walk(path):
        if "requirements.txt" in files:
            requirements.append(os.path.join(root, "requirements.txt"))
        if "package.json" in files:
            packages.append(os.path.join(root, "package.json"))
    return packages, requirements

def clone():
    global URL, PATH
    PATH = PATH / URL.split('/')[-1]
    if os.path.exists(PATH):
        shutil.rmtree(PATH)
    Repo.clone_from(URL, PATH)

def main(url):
    global URL
    URL = url
    try:
        clone()
        output=dict()
        packages, requirements = find_all(PATH)
        
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
        output["error"] = ""
    finally:
        if os.path.exists(PATH):
            shutil.rmtree(PATH)
        if "error" in output.keys():
            return False
        print(json.dumps(output, indent=4))
        return True
        