from flask import Flask, jsonify, request, session
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import timedelta

load_dotenv()

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

def exists(table, attribute, category, user):
    query = f'SELECT {attribute} FROM {table} WHERE user = %s AND category = %s'
    cursor.execute(query, (user, category))
    exist = cursor.fetchone()
    if exist is not None:
         return True
    else:
        return False

def updateTable(table, attribute, value, category, user):
    query = f"UPDATE {table} SET {attribute} = %s WHERE user = %s AND category = %s"
    cursor.execute(query, (value, user, category))
    db.commit()

def getId(table, category, user):
    query = f'SELECT id FROM {table} WHERE user = %s AND category = %s'
    cursor.execute(query, (user, category))
    id = cursor.fetchone()[0]
    return id


@app.route('/')
def index():
    mydict = {
        "hello": "hi",
        "was": "up"
    }
    return jsonify(mydict)

@app.route('/edit-cap', methods=['POST'])
def editCap():
    category = request.form['cap-category']
    amount = request.form['new-cap']
    user = session['user']
    updateTable('expenseCap', 'cap', amount, category, user=user)
    return "Cap updated successfully"

@app.route('/edit-category', methods = ['POST'])
def editCategory():
    oldCategory = request.form['old-category']
    newCategory = request.form['new-category']
    user = session['user']
    updateTable('categories', 'category', newCategory, oldCategory, user)
    updateTable('expenseCap', 'category', newCategory, oldCategory, user)
    return "Category updated successfully"


@app.route('/add-category', methods=['POST'])
def addCategory():
    category = request.form['category-input'].capitalize()
    print(session)
    username = session['user']
    cursor.execute('SELECT category FROM categories WHERE user = %s AND category = %s', (username, category))
    exist = cursor.fetchone()

    print(exist)
    if exists('categories', 'category', category, username):
         return jsonify({'message': 'Category already exists'}), 400
    else:
        cursor.execute("INSERT INTO categories (category, user) VALUES (%s, %s)", (category, username))
        db.commit()
        return jsonify({"message": "Category added successfully"}), 201

@app.route('/add-cap', methods = ['POST'] )
def addCap():
    expenseCap = request.form['expense-cap']
    category = request.form['cap-categories']
    username = session['user']

    if exists('expenseCap', 'cap', category, username):
        return jsonify({'message': 'Cap already exists for that category. Try editing instead'}), 400
    else:
        cursor.execute("INSERT INTO expenseCap (cap, category, user) VALUES (%s, %s, %s)", (expenseCap, category, username ))
        db.commit()
        return jsonify({"message": "Cap added successfully"}), 201


@app.route('/display-categories')
def displayCategories():
    username = session['user']
    cursor.execute('SELECT category from categories WHERE user = %s', (username, ))
    categories = cursor.fetchall()
    category_names = [row[0].capitalize() for row in categories]
    # for i in category_names:
    #     print(i)
    return jsonify({"categories": category_names}), 200

@app.route('/delete-cap', methods = ['POST'])
def deleteCap():
    user = session['user']
    category = request.form['cap-category']
    cursor.execute ('DELETE FROM expenseCap WHERE user = %s AND category = %s', (user, category))
    db.commit()
    return jsonify({"message": "Cap deleted successfully"}), 201

@app.route('/delete-category', methods = ['POST'])
def deleteCategory():
    user = session['user']
    category = request.form['category']
    cursor.execute ('DELETE FROM categories WHERE user = %s AND category = %s', (user, category))
    db.commit()
    return jsonify({"message": "Cap deleted successfully"}), 201


@app.route('/register', methods = ["POST"])
def register():
    username = request.form['username'].lower()
    password = request.form['password']
    password2 = request.form['password2']
    hashed_password = generate_password_hash(password)
    email = request.form['email'].lower()
    
    cursor.execute("SELECT username FROM users WHERE username = %s", (username, ))
    tuser = cursor.fetchone()
    if tuser: tuser = tuser[0]
    if tuser == username:
        return jsonify({"message": "Username already exists!"}), 400
    
    cursor.execute("SELECT email FROM users WHERE email = %s", (email, ))
    temail = cursor.fetchone()
    if temail: temail = temail[0]
    if temail == email:
        return jsonify({"message": "Email already used!"}), 400
    
    if not password == password2:
        return jsonify({"message": "Passwords do not match!"}), 400

    cursor.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, hashed_password, email))
    db.commit()
    return jsonify({"message": "User successfully registerd"}), 200

@app.route('/login', methods = ['POST'])
def login():
    username = request.form['username'].lower()
    password = request.form['password']

    cursor.execute("SELECT username FROM users WHERE username = %s", (username, ))
    tusername = cursor.fetchone()
    if not tusername:
        return jsonify({"message": "User does not exist"}), 400

    cursor.execute("SELECT password FROM users WHERE username = %s", (username, ))
    tpassword = cursor.fetchone()[0]
    if not check_password_hash(tpassword, password):
        return jsonify({"message": "Incorrect password!"}), 400

    session['user'] = username
    if 'user' in session:
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"logged_in": False}), 400

@app.route("/logout", methods = ["POST"])
def logout():
    if "user" in session:
        session.pop("user")
        return jsonify({"message": "Logged out!"}), 200
    return jsonify({"message": "Not logged out..."}), 400

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
