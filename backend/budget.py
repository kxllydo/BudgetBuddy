from flask import Blueprint
from flask import jsonify, request, session

from database import execute
from auxiliary import exists as _exists, getId

budget_bp = Blueprint("budget", __name__)

@budget_bp.route('/edit-cap', methods = ['POST'])
def editCap():
    category = request.form['cap-category']
    amount = request.form['new-cap']
    user = session['user']
    exists = execute('SELECT cap FROM expenseCap WHERE user = %s AND category = %s', (user, category))
    if exists is not None:
        execute('UPDATE expenseCap SET cap = %s WHERE user = %s AND category = %s', (amount, user, category), save = True)
        return jsonify({'message' : 'Cap added sucessfully'}), 200
    else:
        return jsonify({'message': "Cap doesn't exist to edit"}), 400

@budget_bp.route('/edit-category', methods = ['POST'])
def editCategory():
    oldCategory = request.form['old-category']
    newCategory = request.form['new-category'].capitalize()
    user = session['user']
    exists = execute('SELECT category FROM categories WHERE user = %s AND category = %s', (user, newCategory))
    if exists is not None:
        return jsonify({'message' : "This category already exists. Try a different name"}), 400
    else:
        execute('UPDATE categories SET category = %s WHERE user = %s and category = %s', (newCategory, user, oldCategory), save = True)
        return jsonify({'message' : "Category updated successfully"}), 200


@budget_bp.route('/add-category', methods=['POST'])
def addCategory():
    category = request.form['category-input'].capitalize()
    print(session)
    username = session['user']
    exist = execute('SELECT category FROM categories WHERE user = %s AND category = %s', (username, category))

    print(exist)
    if _exists('categories', 'category', username, category):
         return jsonify({'message': 'Category already exists'}), 400
    else:
        execute("INSERT INTO categories (category, user) VALUES (%s, %s)", (category, username), save = True)
        return jsonify({"message": "Category added successfully"}), 201

@budget_bp.route('/add-cap', methods = ['POST'] )
def addCap():
    expenseCap = request.form['expense-cap']
    category = request.form['cap-categories']
    username = session['user']

    if _exists('expenseCap', 'cap', username, category):
        return jsonify({'message': 'Cap already exists for that category. Try editing instead'}), 400
    else:
        execute("INSERT INTO expenseCap (cap, category, user) VALUES (%s, %s, %s)", (expenseCap, category, username ), save = True)
        return jsonify({"message": "Cap added successfully"}), 201

@budget_bp.route('/display-categories')
def displayCategories():
    username = session['user']
    categories = execute('SELECT category from categories WHERE user = %s', (username, ), True)
    category_names = [row[0].capitalize() for row in categories]
    return jsonify({"categories": category_names}), 200

@budget_bp.route('/delete-cap', methods = ['POST'])
def deleteCap():
    user = session['user']
    category = request.form['cap-category']
    execute('DELETE FROM expenseCap WHERE user = %s AND category = %s', (user, category), save = True)
    return jsonify({"message": "Cap deleted successfully"}), 201

@budget_bp.route('/delete-category', methods = ['POST'])
def deleteCategory():
    user = session['user']
    category = request.form['category']
    execute('DELETE FROM categories WHERE user = %s AND category = %s', (user, category), save = True)
    return jsonify({"message": "Cap deleted successfully"}), 201

@budget_bp.route('/get-<category>-percentage')
def getPercentage(category):
    cap = 0
    user = session['user']
    capTuple = execute('SELECT cap FROM expenseCap WHERE user = %s AND category = %s', (user, category))
    if capTuple is None:
        return jsonify({'message': 'no cap', 'percent': 0, 'cap': '', 'spent' : 'unset'}), 200
    else:
        cap = capTuple[0]
    spent = execute ('SELECT price FROM activity WHERE user = %s AND category = %s', (user, category), True)
    if spent is not None:
        totalSpent = 0
        for amount in spent:
            totalSpent += float(amount[0])
        percent = (totalSpent/cap) * 100
        return jsonify({'message':'success!', 'percent': percent, 'cap' : cap, 'spent': totalSpent}), 200
    else:
        return jsonify({'message':'no activity','percent': 0, 'cap': cap, 'spent': 0}), 200