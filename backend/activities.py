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

@act_bp.route("/get-data/<int:year>/<int:month>/<string:order>/<asc>", methods = ["GET"])
def get_data(year, month, order, asc):
    try:
        asc = asc.lower() == "true"
        username = session["user"]
        
        data = execute(f"SELECT id, act_date, category, merchant, price FROM activity WHERE user = %s AND YEAR(act_date) = %s AND MONTH(act_date) = %s ORDER BY {order} {"ASC" if asc else "DESC"}", (username, year, month), True)
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
    category = category[0].capitalize() + category[1:]
    merchant = request.form["my-activity-merchant"]
    merchant = merchant[0].capitalize() + merchant[1:]
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

@act_bp.route("/edit-data/<int:serial>", methods = ["POST", "DELETE"])
def edit_data(serial):
    username = session["user"]

    try:
        if request.method == "DELETE":
            execute("DELETE FROM activity WHERE user = %s AND id = %s", (username, serial), save = True)
            return jsonify({"message": "delete activity successful"}), 200
        else:
            date = request.form["my-activity-date"]
            category = request.form["my-activity-category"]
            category = category[0].capitalize() + category[1:]
            merchant = request.form["my-activity-merchant"]
            merchant = merchant[0].capitalize() + merchant[1:]
            price = request.form["my-activity-price"]

            execute("UPDATE activity SET act_date = %s, category = %s, merchant = %s, price = %s WHERE user = %s AND id = %s", (date, category, merchant, price, username, serial), save = True)
            return jsonify({"message": "edit activity successful"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400