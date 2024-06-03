from flask import jsonify, request, session

from auth import auth_bp
from budget import budget_bp
from activities import act_bp
from auxiliary import auxiliary_bp
from dashboard import dashboard_bp

from config import app

app.register_blueprint(auth_bp)
app.register_blueprint(budget_bp)
app.register_blueprint(act_bp)
app.register_blueprint(auxiliary_bp)
app.register_blueprint(dashboard_bp)

@app.route('/')
def index():
    return jsonify({
        "hello": "hi",
        "was": "up"
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)