import psycopg2
import os
from dotenv import load_dotenv


load_dotenv()

db  = os.getenv("DB")
user = os.getenv("DB_USER")
conn = psycopg2.connect(f'dbname={db} user={user}')

cursor = conn.cursor()



def add_trades_toDB():

    cursor.execute("""

    CREATE TABLE if not EXISTS trade (
        id INT PRIMARY KEY,
        instrument VARCHAR(255),
        openTime VARCHAR(255),
        price DECIMAL(10,5),
        initialUnits INT,
        initialMarginRequired DECIMAL(10,4),
        state VARCHAR(255),
        currentUnits INT,
        realizedPL DECIMAL(10,5),
        closeTime VARCHAR(255),
        averageClosePrice DECIMAL(10,5),
        takeProfitOrder , ******
        stopLossOrder , *******

    )""")

