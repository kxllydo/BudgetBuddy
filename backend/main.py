from flask import Flask, jsonify, request, session
from flask_cors import CORS
from datetime import timedelta

from auth import auth_bp
from categories import category_bp
from activities import act_bp
<<<<<<< HEAD
import os
import mysql.connector

=======
from auxiliary import auxiliary_bp
>>>>>>> b73f6a2e3fbbfb1004669f9a30447547a3ca6f62

from database import execute

app = Flask(__name__)
app.secret_key = "dualmonitor"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)

CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
 
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASS")
db_database = os.getenv("DB")

mysql_config = {
   "host": db_host,
   "user": db_user,
   "password": db_password,
   "database": db_database
}

db = mysql.connector.connect(**mysql_config)
cursor = db.cursor()

def exists(table, attribute, user, condition = ''):
    if condition == 'category':
        query = f'SELECT {attribute} FROM {table} WHERE user = %s AND category = %s'
        cursor.execute(query, (user, condition))
    
    else:
        query = f'SELECT {attribute} FROM {table} WHERE user = %s AND {attribute} = %s'
        cursor.execute(query, (user, condition))
    
    exist = cursor.fetchone()
    if exist is not None:
         return True
    else:
        return False

def getId(table, category, user):
    query = f'SELECT id FROM {table} WHERE user = %s AND category = %s'
    cursor.execute(query, (user, category))
    id = cursor.fetchone()[0]
    return id

app.register_blueprint(auth_bp)
app.register_blueprint(category_bp)
app.register_blueprint(act_bp)
app.register_blueprint(auxiliary_bp)

@app.route('/')
def index():
    return jsonify({
        "hello": "hi",
        "was": "up"
    })

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
