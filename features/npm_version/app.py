import requests
import pathlib
import os
from subprocess import Popen, PIPE
import tarfile
import shutil
import json
from ..github_version.app import find_all
from ..github_version.utils.package_json import package_json_parse, package_json_check

BASE_DIR = pathlib.Path(__file__).parent.resolve()
PATH = BASE_DIR / "cloned_repos"

if not os.path.exists(PATH):
    os.mkdir(PATH)

def download_package():
    global URL, PATH, NAME
    try:
        package_name = URL.split('/')[-1]

        p = Popen(['npm','v',package_name,'dist.tarball'], stdout=PIPE, stderr=PIPE)
        tarballURL = p.stdout.read().strip().decode()
        name = tarballURL.split('/')[-1]

        if os.path.isfile(PATH / name):
            os.remove(PATH / name)
        if os.path.exists(PATH / name[:-4]):
            shutil.rmtree(PATH / name[:-4])

        # Download
        r = requests.get(tarballURL)
        f = open(PATH / name, "wb").write(r.content)

        # Extract
        file = tarfile.open(PATH / name)
        file.extractall(PATH / name[:-4])
        file.close()
    finally:
        if os.path.isfile(PATH / name):
            os.remove(PATH / name)
        return name[:-4]

def analyze(name):
    try:
        packages, requirements = find_all(PATH / name)

        output = {}
        for path in packages:
            with open(path, 'r') as f:
                modules=package_json_parse(f)
                outdated=package_json_check(modules)
                v=dict()
                for module in outdated:
                    d=dict()
                    d["current"]=module[1]
                    d["latest"]=module[2]
                    v[module[0]]=d
                output["package"]=v
    finally:
        if os.path.exists(PATH / name):
            shutil.rmtree(PATH / name)
        return output

def main(url):
    global URL
    URL = url
    REPORT = {}
    try:
        name = download_package()
        REPORT = analyze(name)
    except:
        REPORT = {}
        REPORT['error'] = ""
    finally:
        if "error" in REPORT.keys():
            return False
        print(json.dumps(REPORT, indent=4))
        return True