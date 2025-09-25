from flask import Blueprint, render_template, jsonify, request

usuarios_bp = Blueprint('usuarios',
                            __name__,
                            url_prefix='/usuarios')

@usuarios_bp.route('/status', methods=['GET'])
def statusAPIUsuarios():
    return "¡API de usuarios funcionando!"

"""
Cuerpo del JSON para los POST:
{
    "idUsr": "",
    "idRol": "",
    "idDc": "",
    "idInsti": "",
    "correoInsti": "",
    "nombre": "",
    "telefono": "",
    "contrasena": ""
}
"""

#Endpoint para crear usuarios
@usuarios_bp.route('/create', methods=['POST'])
def create_Usuarios():
    entrada = request.get_json()

    idRol = entrada["idRol"]
    idDc = entrada["idDc"]
    idInsti = entrada["idInsti"]
    correoInsti = entrada["correoInsti"]
    nombre = entrada["nombre"]
    telefono = entrada["telefono"]
    contrasena = entrada["contrasena"]

    return "Crear"

#Endpoint que retorna todos los usuarios
@usuarios_bp.route('/read', methods=['GET'])
def read_Usuarios():

    return "leer"

#Endpoint que retorna solo un usuario
@usuarios_bp.route('/readu', methods=['POST'])
def readUnique_Usuarios():

    return "leer uno"

#Endpoint para modificar un usuario
@usuarios_bp.route('/update', methods=['POST'])
def update_Usuarios():

    entrada = request.get_json()

    idUsr = entrada["idUsr"]
    idRol = entrada["idRol"]
    idDc = entrada["idDc"]
    idInsti = entrada["idInsti"]
    correoInsti = entrada["correoInsti"]
    nombre = entrada["nombre"]
    telefono = entrada["telefono"]
    contrasena = entrada["contrasena"]

    return "Modificar"

#Enpoint para borrar un usuario
@usuarios_bp.route('/delete', methods=['POST'])
def delete_Usuarios():

    return "borrar"