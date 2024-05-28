from flask import Flask, jsonify, request, session
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import timedelta

# from models.activity import activity

load_dotenv()

app = Flask(__name__)
# app.register_blueprint(activity)
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
    cursor.execute('SELECT cap FROM expenseCap WHERE user = %s AND category = %s', (user, category))
    exists = cursor.fetchone()
    if exists is not None:
        cursor.execute('UPDATE expenseCap SET cap = %s WHERE user = %s AND category = %s', (amount, user, category))
        db.commit()
        return jsonify({'message' : 'Cap added sucessfully'}), 200
    else:
        return jsonify({'message': "Cap doesn't exist to edit"}), 400

@app.route('/edit-category', methods = ['POST'])
def editCategory():
    oldCategory = request.form['old-category']
    newCategory = request.form['new-category'].capitalize()
    user = session['user']
    cursor.execute('SELECT category FROM categories WHERE user = %s AND category = %s', (user, newCategory))
    exists = cursor.fetchone()
    if exists is not None:
        return jsonify({'message' : "This category already exists. Try a different name"}), 400
    else:
        cursor.execute('UPDATE categories SET category = %s WHERE user = %s and category = %s', (newCategory, user, oldCategory))
        db.commit()
        return jsonify({'message' : "Category updated successfully"}), 200


@app.route('/add-category', methods=['POST'])
def addCategory():
    category = request.form['category-input'].capitalize()
    print(session)
    username = session['user']
    cursor.execute('SELECT category FROM categories WHERE user = %s AND category = %s', (username, category))
    exist = cursor.fetchone()

    print(exist)
    if exists('categories', 'category', username, category):
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

    if exists('expenseCap', 'cap', username, category):
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

@app.route('/change-<type>', methods = ['POST'])
def change (type):
    old = request.form.get(f'old-{type}')
    changed = request.form.get(f'new-{type}')
    user = session['user']
    if (type == 'password'):
        cursor.execute('SELECT password FROM users WHERE user = %s', (user, ))
        hashed = cursor.fetchone()[0]
        if not check_password_hash(hashed, old):
            return jsonify({'message' : "Incorrect password"}), 400
        else:
            newPass = generate_password_hash(changed)
            cursor.execute('UPDATE users SET password = %s WHERE password = %s', (newPass, hashed))
            db.commit()
    else:
        query = f'SELECT {type} FROM users WHERE {type} = %s'
        cursor.execute(query, (old, ))
        result = cursor.fetchone()
        if result is not None:
            query = f'UPDATE users SET {type} = %s WHERE {type} = %s'
            cursor.execute(query, (changed, old))
            db.commit()
        else:
            return jsonify({'message' : f'No {type} found under that name. Try again'}), 400

    
    return jsonify({"message": f'{type} edited successfully'}), 201



@app.route('/register', methods = ["POST"])
def register():
    username = request.form['username'].lower()
    password = request.form['password']
    password2 = request.form['password2']
    hashed_password = generate_password_hash(password)
    email = request.form['email'].lower()
    
    cursor.execute("SELECT user FROM users WHERE user = %s", (username, ))
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

    cursor.execute("INSERT INTO users (user, password, email) VALUES (%s, %s, %s)", (username, hashed_password, email))
    db.commit()
    return jsonify({"message": "User successfully registerd"}), 200

@app.route('/login', methods = ['POST'])
def login():
    username = request.form['username'].lower()
    password = request.form['password']

    cursor.execute("SELECT user FROM users WHERE user = %s", (username, ))
    tusername = cursor.fetchone()
    if not tusername:
        return jsonify({"message": "User does not exist"}), 400

    cursor.execute("SELECT password FROM users WHERE user = %s", (username, ))
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
