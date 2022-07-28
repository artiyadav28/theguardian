import requests
import pathlib
import os
from subprocess import Popen, PIPE
import shutil

BASE_DIR = pathlib.Path(__file__).parent.resolve()
PATH = BASE_DIR / "cloned_repos"

if not os.path.exists(PATH):
    os.mkdir(PATH)

def download_package():
    global URL, PATH, NAME
    package_name = URL.split('/')[-1]
    p = Popen(['npm','v',package_name,'dist.tarball'], stdout=PIPE, stderr=PIPE)
    tarballURL = p.stdout.read().strip().decode()
    name = tarballURL.split('/')[-1]
    r = requests.get(tarballURL)
    f = open(PATH / name, "wb").write(r.content)

def main(url):
    global URL
    URL = url
    return True