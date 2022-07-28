from ..data_collection import stars, forks, watchers, percentage

def percentLegitness(REPORT):
    i,j,k,percent = percentage.getPercentage(REPORT)
    i = round(i, 2)
    j = round(j, 2)
    k = round(k, 2)
    percent = round(percent, 2)
    return (i, j, k, percent)

def generateReport(REPO_INFO, GITHUB_TOKEN, api_url):
    DATA = {}
    
    if forks.isForked(REPO_INFO):
        return {'message':"This is a forked repo. Please enter the original repo URL."}
    
    DATA["stars"] = stars.getStars(REPO_INFO, GITHUB_TOKEN, api_url)
    DATA["watchers"] = watchers.getWatchers(REPO_INFO)
    DATA["forks"] = forks.getForks(REPO_INFO)
    i,j,k,percent = percentLegitness(DATA)

    REPORT = {
        REPO_INFO['name']:{
            'stars':[DATA['stars'], i],
            'watchers':[DATA['watchers'], j],
            'forks':[DATA['forks'], k],
            'percentage':percent
        }
    }

    return REPORT
