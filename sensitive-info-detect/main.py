from subprocess import Popen, PIPE
import json
import sys

URL = sys.argv[1]
if URL[-1] == '/':
    URL = URL[:-1]
if URL[-4:] == '.git':
    URL = URL[:-4]

ERROR_MESSAGE = "SOMETHING WENT WRONG, PLEASE TRY AGAIN."

if __name__ == "__main__":
    REPORT = {}
    try:
        p = Popen(["gittyleaks","-b","-d","-f","-l",URL], stdout=PIPE, stderr=PIPE)
        output = p.stdout.read().decode().strip().split('\n')[1:]
        LEAKS = [[x[0].strip(), x[1].strip()] for x in (line.split(':', 1) for line in output)]
        REPORT = {
            "leaks": LEAKS
        }
    except:
        REPORT['error'] = ERROR_MESSAGE
    finally:
        print(json.dumps(REPORT, indent=4))