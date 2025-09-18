from flask import Flask, jsonify, request
from flask_cors import CORS
from API.api_laboratorios import *

app = Flask(__name__)
CORS(app)

app.register_blueprint(laboratorios_bp)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'



if __name__ == '__main__':
    app.run()
