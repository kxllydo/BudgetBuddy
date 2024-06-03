from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from database import execute

auxiliary_bp = Blueprint("auxiliary", __name__)

def exists(table, attribute, user, condition = ""):
    if condition == "category":
        query = f'SELECT {attribute} FROM {table} WHERE user = %s AND category = %s'
        response = execute(query, (user, condition))
    elif (condition == ''):
        query = f'SELECT {attribute} FROM {table} WHERE user = %s'
        response = execute(query, (user, ))
    else:
        query = f'SELECT {attribute} FROM {table} WHERE user = %s AND {attribute} = %s'
        response = execute(query, (user, condition))

    if response is not None:
        return True
    else:
        return False

def getId(table, category, user):
    query = f'SELECT id FROM {table} WHERE user = %s AND category = %s'
    return execute(query, (user, category))[0]

@auxiliary_bp.route('/change-<type>', methods = ['POST'])
def change (type):
    user = session['user']
    if (type == 'password'):
        old = request.form.get(f'old-{type}')
        changed = request.form.get(f'new-{type}')
        hashed = execute('SELECT password FROM users WHERE user = %s', (user, ))[0]
        if not check_password_hash(hashed, old):
            return jsonify({'message' : "Incorrect password"}), 400
        else:
            newPass = generate_password_hash(changed)
            execute('UPDATE users SET password = %s WHERE password = %s', (newPass, hashed), save = True)
    elif (type == 'color'):
        category = request.form['category']
        color = request.form['color']
        if (exists('preferences', 'color', user, color)):
            return jsonify({'message':'A color already exists for this category'}), 400
        else:
            execute('INSERT INTO preferences (color, user, category) VALUES (%s, %s, %s)', (color, user, category), save=True)
            return jsonify({'message' : 'Sucessfully added color'}), 200
    else:
        old = request.form.get(f'old-{type}')
        changed = request.form.get(f'new-{type}')
        query = f'SELECT {type} FROM users WHERE {type} = %s'
        result = execute(query, (old, ))
        if result is not None:
            query = f'UPDATE users SET {type} = %s WHERE {type} = %s'
            execute(query, (changed, old), save = True)
        else:
            return jsonify({'message' : f'No {type} found under that name. Try again'}), 400
    
    return jsonify({"message": f'{type} edited successfully'}), 201

@auxiliary_bp.route('/<category>-colors', methods = ['GET'])
def categoryColors(category):
    user = session['user']
    response = execute('SELECT color FROM preferences WHERE user = %s AND category = %s', (user, category), True)
    print(response)
    lastIndex = len(response) - 1
    color = ''
    print(lastIndex)
    if (lastIndex == 0):
        color = response[0][0]
    elif (lastIndex >= 1):
        color = response[lastIndex][0]
    else:
        color = '#486c44'
    return jsonify({'color' : color}), 200

@auxiliary_bp.route('/delete-account', methods = ['POST'])
def deleteAccount():
    user = session['user']
    execute('DELETE FROM users WHERE user = %s', (user, ), save=True)
    session.clear()
    return jsonify({'deleted' : user}), 200

def getId(table, category, user):
    query = f'SELECT id FROM {table} WHERE user = %s AND category = %s'
    return execute(query, (user, category))[0]