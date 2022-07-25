def hasIssues(REPO_INFO):
    return REPO_INFO["has_issues"]
    
def getIssues(REPO_INFO):
    i = REPO_INFO["open_issues_count"]
    return i