from flask import Blueprint, render_template, jsonify, request

tecnicencar_bp = Blueprint('tecnicencar',
                            __name__,
                            url_prefix='/tecnicencar')

@tecnicencar_bp.route('/status', methods=['GET'])
def statusAPITecniEncar():
    return "¡API de tecnicos y encargados funcionando!"

@tecnicencar_bp.route('/create', methods=['POST'])
def create_TecniEncar():

    return "Crear"

@tecnicencar_bp.route('/read', methods=['GET'])
def read_TecniEncar():

    return "leer"

@tecnicencar_bp.route('/readu', methods=['POST'])
def readUnique_TecniEncar():

    return "leer uno"

@tecnicencar_bp.route('/delete', methods=['POST'])
def delete_TecniEncar():

    return "borrar"