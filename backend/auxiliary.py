from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from database import execute

auxiliary_bp = Blueprint("auxiliary", __name__)

def exists(table, attribute, user, condition = ""):
    exist = None
    if condition == "category":
        query = f'SELECT {attribute} FROM {table} WHERE user = %s AND category = %s'
        exist = execute(query, (user, condition))
    else:
        query = f'SELECT {attribute} FROM {table} WHERE user = %s AND {attribute} = %s'
        exist = execute(query, (user, condition))
    return exist is not None

def getId(table, category, user):
    query = f'SELECT id FROM {table} WHERE user = %s AND category = %s'
    return execute(query, (user, category))[0]

@auxiliary_bp.route('/change-<type>', methods = ['POST'])
def change (type):
    old = request.form.get(f'old-{type}')
    changed = request.form.get(f'new-{type}')
    user = session['user']
    if (type == 'password'):
        hashed = execute('SELECT password FROM users WHERE user = %s', (user, ))[0]
        if not check_password_hash(hashed, old):
            return jsonify({'message' : "Incorrect password"}), 400
        else:
            newPass = generate_password_hash(changed)
            execute('UPDATE users SET password = %s WHERE password = %s', (newPass, hashed), save = True)
    else:
        query = f'SELECT {type} FROM users WHERE {type} = %s'
        result = execute(query, (old, ))
        if result is not None:
            query = f'UPDATE users SET {type} = %s WHERE {type} = %s'
            execute(query, (changed, old), save = True)
        else:
            return jsonify({'message' : f'No {type} found under that name. Try again'}), 400
    
    return jsonify({"message": f'{type} edited successfully'}), 201