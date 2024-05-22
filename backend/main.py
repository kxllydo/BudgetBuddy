# from flask import Flask
# from flask_cors import CORS
# from flask import render_template, jsonify

# app = Flask(__name__)
# cors = CORS(app, origins = "*")

# @app.route("/homess", methods = ["GET"])
# def home():
#     return jsonify({"message": "greeings!"}), 200

# if __name__ == "__main__":
#     app.run(debug = True)

from flask import Flask, jsonify, request, session
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv
from werkzeug.security import check_password_hash
from datetime import timedelta




load_dotenv()

app = Flask(__name__)
app.secret_key = "dualmonitor"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)

CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

 
db_host = os.getenv("DB_HOST")
print(db_host)
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


@app.route('/')
def index():
    mydict = {
        "hello": "hi",
        "was": "up"
    }
    return jsonify(mydict)


@app.route('/add-category', methods=['POST'])
def addCategory():
    category = request.form['category-input']
    print(session)
    username = session['user']
    cursor.execute("INSERT INTO categories (category, user) VALUES (%s, %s)", (category, username))
    db.commit()
    return jsonify({"message": "Category added successfully"}), 201

@app.route('/display-categories')
def displayCategories():
    username = session['user']
    cursor.execute('SELECT category from categories WHERE user = %s', (username, ))
    categories = cursor.fetchall()
    category_names = [row[0].capitalize() for row in categories]
    # for i in category_names:
    #     print(i)
    return jsonify({"categories": category_names}), 200






@app.route('/register', methods = ["POST"])
def register():
    username = request.form['username2']
    password = request.form['password2']
    email = request.form['email2']

    cursor.execute('INSERT INTO users (username, password, email) VALUES (%s, %s, %s)', (username, password, email)) 
    db.commit()
    return jsonify({"message": "Category added successfully"}), 201

@app.route('/login', methods = ['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    # cursor.execute('SELECT username FROM users WHERE username = %s', (username, ))
    # user = cursor.fetchone()

    
    session['user'] = username
    print(session)
    if 'user' in session:
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"logged_in": False}), 200

    # return jsonify({"message": "Login failed"}), 401

@app.route('/is_logged_in', methods=['GET'])
def is_logged_in():
    if 'user_id' in session:
        return jsonify({"logged_in": True}), 200
    return jsonify({"logged_in": False}), 401

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
 