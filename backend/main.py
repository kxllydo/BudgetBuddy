from flask import Flask, jsonify, request, session
from flask_cors import CORS
from datetime import timedelta

from auth import auth_bp
from budget import budget_bp
from activities import act_bp
from auxiliary import auxiliary_bp

from database import execute

app = Flask(__name__)
app.secret_key = "dualmonitor"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)

CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(auth_bp)
app.register_blueprint(budget_bp)
app.register_blueprint(act_bp)
app.register_blueprint(auxiliary_bp)

@app.route('/')
def index():
    return jsonify({
        "hello": "hi",
        "was": "up"
    })

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)