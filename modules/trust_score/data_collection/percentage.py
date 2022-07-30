import pathlib
import pandas as pd
from bisect import bisect_right

BASE_DIR = pathlib.Path(__file__).parent.resolve()
DATA_LOC = BASE_DIR / "Dataset/dataset.csv"
FACTOR=1.1

STARS = []
WATCHERS = []
FORKS = []

def load_data():
    global STARS, WATCHERS, FORKS
    df = pd.read_csv(DATA_LOC)
    STARS = list(df['stars'])
    WATCHERS = list(df['watchers'])
    FORKS = list(df['forks'])
    STARS.sort()
    WATCHERS.sort()
    FORKS.sort()

def getPercentage(DATA):
    global FACTOR, STARS, WATCHERS, FORKS
    load_data()
    stars = min(FACTOR*DATA["stars"], STARS[-1])
    watchers = min(FACTOR*DATA["watchers"], WATCHERS[-1])
    forks = min(FACTOR*DATA["forks"], FORKS[-1])

    i=(bisect_right(STARS,stars)/len(STARS))*100
    j=(bisect_right(WATCHERS,watchers)/len(WATCHERS))*100
    k=(bisect_right(FORKS,forks)/len(FORKS))*100

    percent = (i+j+k)/3

    return (i,j,k,percent)


