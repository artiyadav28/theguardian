from subprocess import Popen, PIPE
import json
import pathlib
import os

BASE_DIR = pathlib.Path(__file__).parent.resolve()
CLONE_FOLDER = BASE_DIR / "cloned_repos"

if not os.path.exists(CLONE_FOLDER):
    os.mkdir(CLONE_FOLDER)

def main(url):
    global URL, DEBUG_REPORT, DEBUG, CLONE_FOLDER
    URL = url
    REPORT = {}
    try:
        p = Popen(["gittyleaks","-b","-d","-f","-l",URL], stdout=PIPE, stderr=PIPE, cwd=CLONE_FOLDER)
        output = p.stdout.read().decode().strip().split('\n')[1:]
        LEAKS = [[x[0].strip(), x[1].strip()] for x in (line.split(':', 1) for line in output)]
        REPORT = {
            "leaks": LEAKS
        }
    except:
        REPORT = {}
        REPORT['error'] = ""
    finally:
        if "error" in REPORT.keys():
            return False
        print(json.dumps(REPORT, indent=4))
        return True
