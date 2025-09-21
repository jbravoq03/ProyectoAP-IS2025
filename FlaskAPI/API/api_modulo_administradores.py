from flask import Blueprint, render_template

administradores_bp = Blueprint('administradores',
                            __name__,
                            url_prefix='/administradores')

@administradores_bp.route('/status', methods=['GET'])
def statusAPIAdministradores():
    return "¡API de administradores funcionando!"

@administradores_bp.route('/create', methods=['POST'])
def create_administradores():

    return "Crear"

@administradores_bp.route('/read', methods=['GET'])
def read_administradores():

    return "leer"

@administradores_bp.route('/readu', methods=['POST'])
def readUnique_administradores():

    return "leer uno"

@administradores_bp.route('/delete', methods=['POST'])
def delete_administradores():

    return "borrar"