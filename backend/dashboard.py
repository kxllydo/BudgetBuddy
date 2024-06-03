from flask import Blueprint
from flask import jsonify, request, session
import datetime

from database import execute

dashboard_bp = Blueprint("dashboard", __name__)
_nameKey = "name"
_dataKey = "value"

MONTH_NAMES = ["January", "February", "March", "April", "May",
                "June", "July", "August", "Septemebr", "October",
                "November", "December"]
DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

@dashboard_bp.route("/get-category-spending", methods = ["GET"])
def get_category_spending():
    current_time = datetime.datetime.now()

    try:
        username = session["user"]
        data = execute("SELECT category, TRUNCATE(SUM(price), 2) AS total FROM activity WHERE user = %s AND YEAR(act_date) = %s AND MONTH(act_date) = %s GROUP BY category", (username, current_time.year, current_time.month), fetchAll = True)
        if data: data = [{f"{_nameKey}": row[0], f"{_dataKey}": row[1]} for row in data]
        else: data = [{f"{_nameKey}": "N/A", f"{_dataKey}": 1}]
        return jsonify(data), 200
    except:
        return jsonify({"message": "get category spending failed"}), 400
    
@dashboard_bp.route("/get-weekly-spending", methods = ["GET"])
def get_weekly_spending():
    pass

@dashboard_bp.route("/get-monthly-spending", methods = ["GET"])
def get_monthly_spending():
    current_time = datetime.datetime.now()

    try:
        username = session["user"]
        temp_data = execute("SELECT MONTH(act_date) AS month, TRUNCATE(SUM(price), 2) AS total FROM activity WHERE user = %s AND YEAR(act_date) = %s GROUP BY month ORDER BY month ASC", (username, current_time.year), fetchAll = True)
        data = [{f"{_nameKey}": month + 1, f"{_dataKey}": 0} for month in range(12)]

        for row in temp_data:
            if data[row[0] - 1][f"{_nameKey}"]:
                data[row[0] - 1][f"{_dataKey}"] = row[1]
        for row in data:
            row[f"{_nameKey }"] = MONTH_NAMES[row[f"{_nameKey }"] - 1]

        return jsonify(data), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "get monthly spending failed"}), 400
    
@dashboard_bp.route("/get-minmax-spending", methods = ["GET"])
def get_minmax_spending():
    current_time = datetime.datetime.now()

    try:
        username = session["user"]
        temp_data = execute("SELECT category, MIN(price) as minimum, MAX(price) as maximum FROM activity WHERE user = %s AND YEAR(act_date) = %s AND MONTH(act_date) = %s GROUP BY category", (username, current_time.year, current_time.month), fetchAll = True)
        
        if temp_data:
            minCategory = temp_data[0][0]
            minValue    = temp_data[0][1]
            maxCategory = temp_data[0][0]
            maxValue    = temp_data[0][2]

            for row in temp_data:
                if row[1] < minValue:
                    minValue = row[1]
                    minCategory = row[0]
                if row[2] > maxValue:
                    maxValue = row[2]
                    maxCategory = row[0]
            data = {"min": {"category": minCategory, "value": minValue}, "max": {"category": maxCategory, "value": maxValue}}
        else: data = {"min": {"category": "N/A", "value": "0.00"}, "max": {"category": "N/A", "value": "0.00"}}

        print(temp_data)

        return jsonify(data), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "get min/max spending failed"}), 400