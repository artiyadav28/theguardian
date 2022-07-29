import json
import csv
import pathlib

BASE_DIR = pathlib.Path(__file__).parent.resolve()
DATA_PATH = BASE_DIR / "files/data.json"
STORE_PATH = BASE_DIR / 'files/dataset.csv'

def main():
    data = {}
    try:
        with open(DATA_PATH, 'r') as f:
            data = json.load(f)
        
        params = []
        for url, val in data.items():
            params.append(data)
        
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
        return True