import requirements
from outdated import check_outdated

def requirements_txt_parse(f):
    modules=[]
    for req in requirements.parse(f):
        for condition in req.specs:
            if(condition[0]=="==" or condition[0]=="<="):
                modules.append((req.name,condition[1]))
    return modules
    
def requirements_txt_check(modules):
    outdated=[]
    for module in modules:
        is_outdated, latest_version=check_outdated(module[0],module[1])
        if is_outdated==True:
            outdated.append((module[0],module[1],latest_version))
    return outdated

# with open('req.txt','r') as f:
#     modules=requirements_txt_parse(f)
#     outdated=requirements_txt_check(modules)
#     print(outdated)