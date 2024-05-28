from flask import Blueprint
from flask import jsonify, request, session

from database import db, cursor

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
    pass

@act_bp.route("/add-data", methods = ["POST"])
def add_data():
    pass