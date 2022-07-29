def isForked(REPO_INFO):
    return REPO_INFO["fork"]

def getForks(REPO_INFO):
    f = REPO_INFO["forks_count"]
    return f