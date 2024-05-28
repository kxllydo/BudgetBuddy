from flask import Blueprint
from flask import jsonify, request, session

from database import execute

category_bp = Blueprint("category", __name__)

@category_bp.route('/add-category', methods=['POST'])
def addCategory():
    category = request.form['category-input'].capitalize()
    print(session)
    username = session['user']
    execute("INSERT INTO categories (category, user) VALUES (%s, %s)", (category, username), save = True)
    return jsonify({"message": "Category added successfully"}), 201

@category_bp.route('/add-cap', methods = ['POST'] )
def addCap():
    expenseCap = request.form['expense-cap']
    category = request.form['cap-categories']
    username = session['user']
    execute("INSERT INTO expenseCap (cap, category, user) VALUES (%s, %s, %s)", (expenseCap, category, username ), save = True)
    return jsonify({"message": "Cap added successfully"}), 201


@category_bp.route('/display-categories')
def displayCategories():
    username = session['user']
    categories = execute('SELECT category FROM categories WHERE user = %s', (username, ), True)
    category_names = [row[0].capitalize() for row in categories]
    print(category_names)
    return jsonify({"categories": category_names}), 200

@category_bp.route('/delete-cap', methods = ['POST'])
def deleteCap():
    user = session['user']
    category = request.form['cap-category']
    execute ('DELETE FROM expenseCap WHERE user = %s AND category = %s', (user, category), save = True)
    return jsonify({"message": "Cap deleted successfully"}), 201

@category_bp.route('/delete-category', methods = ['POST'])
def deleteCategory():
    user = session['user']
    category = request.form['category']
    execute ('DELETE FROM categories WHERE user = %s AND category = %s', (user, category), save = True)
    return jsonify({"message": "Cap deleted successfully"}), 201