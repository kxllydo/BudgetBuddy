import os
from dotenv import load_dotenv
import mysql.connector

load_dotenv()

_db_host = os.getenv("DB_HOST")
_db_user = os.getenv("DB_USER")
_db_pass = os.getenv("DB_PASS")
_db_base = os.getenv("DB")

_mysql_config = {
    "host"      : _db_host,
    "user"      : _db_user,
    "password"  : _db_pass,
    "database"  : _db_base
}

db = mysql.connector.connect(**_mysql_config)
cursor = db.cursor()