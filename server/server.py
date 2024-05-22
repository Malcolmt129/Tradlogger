from flask import Flask
from logging import raiseExceptions
import datetime
import calendar
import json
import pandas as pd
import os
from flask_cors import CORS
import requests
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app)

load_dotenv()


@app.route('/trades/data')
def getTrades():
    practiceUrl  = os.getenv("URL_PRACTICE")
    liveURL = os.getenv("URL_LIVE")
    liveKey = os.getenv("LIVE_ACCESS_KEY")
    key  = os.getenv("ACCESS_KEY")
    live_account = os.getenv("ACCOUNT_ID_LIVE")
    practice_account = os.getenv("ACCOUNT_ID_PRACTICE") 
    tradesURL = f"{liveURL}/v3/accounts/{live_account}/trades"
    auth  = {'Authorization': f'Bearer {liveKey}'}
    trades = requests.get(tradesURL, 
                          headers=auth,
                          params={
                          'state':'CLOSED'
                          }
                          )
    response = trades.json() 
    return response['trades']


def run():
   print(getTrades())

if __name__ == "__main__":
    app.run(debug=True)


