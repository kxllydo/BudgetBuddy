from flask import Flask
from flask_cors import CORS
from flask import render_template, jsonify

app = Flask(__name__)
cors = CORS(app, origins = "*")

@app.route("/homess", methods = ["GET"])
def home():
    return jsonify({"message": "greeings!"}), 200

if __name__ == "__main__":
    app.run(debug = True)