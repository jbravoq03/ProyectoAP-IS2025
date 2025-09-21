from flask import Blueprint, render_template

usuarios_bp = Blueprint('usuarios',
                            __name__,
                            url_prefix='/usuarios')

@usuarios_bp.route('/status', methods=['GET'])
def statusAPIUsuarios():
    return "¡API de usuarios funcionando!"

@usuarios_bp.route('/create', methods=['POST'])
def create_Usuarios():

    return "Crear"

@usuarios_bp.route('/read', methods=['GET'])
def read_Usuarios():

    return "leer"

@usuarios_bp.route('/readu', methods=['POST'])
def readUnique_Usuarios():

    return "leer uno"

@usuarios_bp.route('/delete', methods=['POST'])
def delete_Usuarios():

    return "borrar"