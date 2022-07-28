import json
import requests
from subprocess import Popen, PIPE

def check_pypi(package_name):
    url = 'https://pypi.python.org/pypi/' + str(package_name) + '/json'
    data = requests.get(url).json()

    dependencies=data['info']['requires_dist']
    vulnerable=[]
    for dependency in dependencies:
        info=dependency.split(' ')
        if(len(info)>1):
            name=info[0]
            versions=info[1][1:-1].split(',')
            for version in versions:
                if(version.startswith("<=")):
                    vulnerable.append(name+"=="+version[2:])
                elif(version.startswith("<")):
                    vulnerable.append(name+"=="+version[1:])
                elif(version.startswith("==")):
                    vulnerable.append(name+"=="+version[2:])
    return vulnerable

def main(url):
    global URL
    URL = url
    REPO_NAME = URL.split('/')[-1]
    final=dict()
    try:
        final["data"]=list()
        vulnerable=check_pypi(REPO_NAME)
        for p in vulnerable:
            z = Popen(["safety","check","--output","json","--stdin"],stdout=PIPE, stdin=PIPE, stderr=PIPE)
            f=z.communicate(input=p.encode())[0]
            output=f.decode()
            parsed=json.loads(output)
            params={}
            if(len(parsed["vulnerabilities"])>0):
                params["vulnerability_id"]=parsed["vulnerabilities"][0]["vulnerability_id"]
                params["package_name"]=parsed["vulnerabilities"][0]["package_name"]
                params["analyzed_version"]=parsed["vulnerabilities"][0]["analyzed_version"]
                params["CVE"]=parsed["vulnerabilities"][0]["CVE"]
                params["more_info_url"]=parsed["vulnerabilities"][0]["more_info_url"]
                final["data"].append(params)
    except:
        final = dict()
        final['error'] = ""
    finally:
        if "error" in final.keys():
            return False
        print(json.dumps(final, indent=4))
        return True