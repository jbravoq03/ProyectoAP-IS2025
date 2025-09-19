from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.register_blueprint(laboratorios_bp)

@app.route('/status')
def hello_world():
    return 'API funcionando'



if __name__ == '__main__':
    app.run()
