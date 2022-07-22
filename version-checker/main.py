import os
from utils.package_json import package_json_parse, package_json_check
from utils.requirements_txt import requirements_txt_parse, requirements_txt_check
import sys

def find_all(name, path):
    result = []
    for root, dirs, files in os.walk(path):
        if name in files:
            result.append(os.path.join(root, name))
    return result

packages=find_all("package.json",sys.argv[1])
requirements=find_all("requirements.txt",sys.argv[1])

output=dict()
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
    output["package.json"]=v
        
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
    output["requirements.txt"]=v
print(output)
