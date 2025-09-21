from flask import Flask, jsonify, request
from flask_cors import CORS
from API.api_modulo_administradores import *
from API.api_modulo_laboratorios import *
from API.api_modulo_tecnicos_encargados import *
from API.api_modulo_usuarios import *

app = Flask(__name__)
CORS(app)

app.register_blueprint(administradores_bp)
app.register_blueprint(laboratorios_bp)
app.register_blueprint(tecnicencar_bp)
app.register_blueprint(usuarios_bp)

@app.route('/status')
def hello_world():
    return 'API funcionando'



if __name__ == '__main__':
    app.run()
