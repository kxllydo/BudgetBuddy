import os
import time
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

def execute(command, arguments = None, fetchAll = False, save = False):
    result = None
    db = mysql.connector.connect(**_mysql_config)
    cursor = db.cursor()
    
    if arguments:
        cursor.execute(command, arguments)
    else:
        cursor.execute(command)

    if fetchAll:
        result = cursor.fetchall()
    else:
        result = cursor.fetchone()
    
    if save:
        db.commit()
    
    cursor.close()
    db.close()
    return result