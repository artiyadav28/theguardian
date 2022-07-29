import json
import csv
import pathlib
import os
import shutil

BASE_DIR = pathlib.Path(__file__).parent.resolve()
DATA_PATH = BASE_DIR / "files/data.json"
STORE_PATH = BASE_DIR / "files/dataset.csv"
FINAL_PATH = BASE_DIR / "../legit_percent/data_collection/Dataset"

def main():
    data = {}
    try:
        with open(DATA_PATH, 'r') as f:
            data = json.load(f)
        
        params = []
        i = 0
        for url, val in data.items():
            value = {}
            value['sno'] = i
            for key, item in val.items():
                value[key] = item
            params.append(value)
            i += 1
        
        with open(STORE_PATH, 'w', encoding='utf8', newline='') as f:
            fc = csv.DictWriter(f, fieldnames=params[0].keys())
            fc.writeheader()
            fc.writerows(params)
    except:
        data = {}
        data["error"] = ""
    finally:
        if "error" in data.keys():
            return False
        if os.path.isfile(FINAL_PATH / 'dataset.csv'):
            os.rename(FINAL_PATH / 'dataset.csv', FINAL_PATH / 'dataset.csv.bak')
        shutil.copy(STORE_PATH, FINAL_PATH / 'dataset.csv')
        return True