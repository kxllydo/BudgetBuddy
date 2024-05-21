# from flask import Flask
# from flask_cors import CORS
# from flask import render_template, jsonify

# app = Flask(__name__)
# cors = CORS(app, origins = "*")

# @app.route("/homess", methods = ["GET"])
# def home():
#     return jsonify({"message": "greeings!"}), 200

# if __name__ == "__main__":
#     app.run(debug = True)

from flask import Flask, jsonify
from flask_cors import CORS
 
app = Flask(__name__)
CORS(app)
 
@app.route('/')
def index():
    mydict = {
        "hello": "hi",
        "was": "up"
    }
    return jsonify(mydict)
 
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
 