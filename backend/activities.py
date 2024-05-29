from flask import Blueprint
from flask import jsonify, request, session

from database import execute

act_bp = Blueprint("activities", __name__)

@act_bp.route("/get-card", methods = ["GET"])
def get_card():
    pass

@act_bp.route("/add-card", methods = ["POST"])
def add_card():
    pass

@act_bp.route("/edit_card", methods = ["PUT"])
def edit_card():
    pass

@act_bp.route("/delete_card", methods = ["DELETE"])
def delete_card():
    pass

@act_bp.route("/get-data", methods = ["GET"])
def get_data():
    try:
        username = session["user"]
        data = execute("SELECT id, act_date, category, merchant, price FROM activity WHERE user = %s", (username, ), True)
        data = [(row[0], row[1].strftime("%Y-%m-%d"),
                 row[2], row[3], row[4]) for row in data]
        return jsonify(data), 200
    except:
        return jsonify({"message": "Failed to fetch activity in server."}), 400 

@act_bp.route("/add-data", methods = ["POST"])
def add_data():
    username = session["user"]
    date = request.form["my-activity-date"]
    category = request.form["my-activity-category"]
    merchant = request.form["my-activity-merchant"]
    price = request.form["my-activity-price"]

    if not (date and category and merchant and price):
        return jsonify({"message": "Insufficient data for activity."}), 400
    
    try:
        price = float(price)
    except:
        return jsonify({"message": "Price is not float."}), 400 
    
    try:
        tdate = date.split("-")  
        date = f"{tdate[0]}-{tdate[1]}-{tdate[2]}"
    except:
        return jsonify({"message": "Incorrect format for date.."}), 400

    print(username, date, category, merchant, price)
    execute("INSERT INTO activity (act_date, merchant, price, user, category) VALUES (%s, %s, %s, %s, %s)", (date, merchant, price, username, category), save = True)
    return jsonify({"message": "worked.."}), 200