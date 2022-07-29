from subprocess import Popen, PIPE
import json

def main(url):
    global URL, DEBUG_REPORT, DEBUG
    URL = url
    REPORT = {}
    try:
        p = Popen(["gittyleaks","-b","-d","-f","-l",URL], stdout=PIPE, stderr=PIPE)
        output = p.stdout.read().decode().strip().split('\n')[1:]
        LEAKS = [[x[0].strip(), x[1].strip()] for x in (line.split(':', 1) for line in output)]
        REPORT = {
            "leaks": LEAKS
        }
    except:
        REPORT = {}
        if DEBUG == 1:
            REPORT = DEBUG_REPORT
        else:
            REPORT['error'] = ""
    finally:
        if "error" in REPORT.keys():
            return False
        print(json.dumps(REPORT, indent=4))
        return True
