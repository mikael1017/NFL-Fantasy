import pandas as pd
import json


def load_data():
    f = open('NFLdata.json')
    data = json.load(f)
    return data
