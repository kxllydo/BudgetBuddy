from flask import Blueprint

activity = Blueprint("activity", __name__)

@activity.route("/get-cards", methods = ["GET"])
