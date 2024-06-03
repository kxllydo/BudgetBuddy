from flask import Blueprint
from flask import jsonify, request, session
# from flask_mail import Message
from werkzeug.security import check_password_hash, generate_password_hash

from database import execute
# from config import mail, SMTP_USER

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods = ["POST"])
def register():
    username = request.form["username"].lower()
    password = request.form["password"]
    password2 = request.form["password2"]
    hashed_password = generate_password_hash(password)
    email = request.form["email"].lower()
    
    tuser = execute("SELECT user FROM users WHERE user = %s", (username, ))
    if tuser: tuser = tuser[0]
    if tuser == username:
        return jsonify({"message": "Username already exists!"}), 400
    
    temail = execute("SELECT email FROM users WHERE email = %s", (email, ))
    if temail: temail = temail[0]
    if temail == email:
        return jsonify({"message": "Email already used!"}), 400
    
    if not password == password2:
        return jsonify({"message": "Passwords do not match!"}), 400

    execute("INSERT INTO users (user, password, email) VALUES (%s, %s, %s)", (username, hashed_password, email), save = True)

    session["user"] = username
    if "user" in session:
        return jsonify({"message": "User successfully registerd"}), 200
    return jsonify({"registered": False}), 400

@auth_bp.route("/login", methods = ["POST"])
def login():
    username = request.form["username"].lower()
    password = request.form["password"]

    tusername = execute("SELECT user FROM users WHERE user = %s", (username, ))
    if not tusername:
        return jsonify({"message": "User does not exist"}), 400

    tpassword = execute("SELECT password FROM users WHERE user = %s", (username, ))[0]
    if not check_password_hash(tpassword, password):
        return jsonify({"message": "Incorrect password!"}), 400

    session["user"] = username
    if "user" in session:
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"logged_in": False}), 400

@auth_bp.route("/logout", methods = ["POST"])
def logout():
    if "user" in session:
        session.pop("user")
        return jsonify({"message": "Logged out!"}), 200
    return jsonify({"message": "Not logged out..."}), 400

@auth_bp.route("/is_logged_in", methods=["GET"])
def is_logged_in():
    if "user" in session:
        return jsonify({"logged_in": True}), 200
    return jsonify({"logged_in": False}), 401

@auth_bp.route("/send-forgot-password-link", methods = ["POST"])
def send_forgot_link():
    try:
        user = None
        if "email" in request.form:
            email = request.form["email"].lower()
            user = execute("SELECT user FROM users WHERE email = %s", (email, ))[0]
        elif "username" in request.form:
            user = request.form["username"].lower()
            user = execute("SELECT user FROM users WHERE user = %s", (user, ))[0]
        else:
            raise Exception("No identifier or matching username found.")
        
        session["user"] = user
        if "user" in session:
            return jsonify({"message": "Login successful"}), 200
        return jsonify({"logged_in": False}), 400
    except:
        return jsonify({"message": "Error sending link."}), 400

    # try:
    #     email = None
    #     if "email" in request.form:
    #         email = request.form["email"].lower()
    #         email = execute("SELECT email FROM users WHERE email = %s", (email, ))[0]
    #     elif "username" in request.form:
    #         username = request.form["username"].lower()
    #         email = execute("SELECT email FROM users WHERE user = %s", (username, ))[0]
    #     else:
    #         raise Exception("No identifier found, or no matching email found.")

    #     msg = Message("is this the subejct?", sender = SMTP_USER, recipients = [email])
    #     msg.body = "Test"
    #     mail.send(msg)

    #     return "asd", 200
    # except:
    #     return jsonify({"message": "Error sending link"}), 400