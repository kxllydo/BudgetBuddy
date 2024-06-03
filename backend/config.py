from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
import os 

from datetime import timedelta

load_dotenv()

app = Flask(__name__)
app.secret_key = "dualmonitor"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, supports_credentials=True)

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = os.getenv("SMTP_USER")
app.config["MAIL_PASSWORD"] = os.getenv("SMTP_PASS")
mail = Mail(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response