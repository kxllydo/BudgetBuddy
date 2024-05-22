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



load_dotenv()

app = Flask(__name__)
app.secret_key = "dualmonitor"
cors = CORS(app, origins = "*")
 
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


@app.route('/category', methods=['POST'])
def addCategory():
    category = request.form['category-input']
    user_id = session["user_id"]
    cursor.execute("INSERT INTO categories (category, user_id ) VALUES (%s, %s)", (category, user_id))
    db.commit()
    return jsonify({"message": "Category added successfully"}), 201

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
    cursor.execute('SELECT id, password FROM users WHERE username = %s', (username, ))
    user = cursor.fetchone()

    if user and check_password_hash(user[1], password):
        session['user_id'] = user[0]
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Login failed"}), 401

@app.route('/is_logged_in', methods=['GET'])
def is_logged_in():
    if 'user_id' in session:
        return jsonify({"logged_in": True}), 200
    return jsonify({"logged_in": False}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
 