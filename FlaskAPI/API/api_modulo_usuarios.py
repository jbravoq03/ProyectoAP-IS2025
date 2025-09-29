from flask import Blueprint, render_template, jsonify, request
from Controladores_Tablas.controlador_usuarios import *

# Se define el blueprint
usuarios_bp = Blueprint('usuarios',
                            __name__,
                            url_prefix='/usuarios')

# Comprobacion de estado del API
@usuarios_bp.route('/status', methods=['GET'])
def statusAPIUsuarios():
    return "¡API de usuarios funcionando!"

#-------------------------------------
# Tabla de Usuarios

#Cuerpo del JSON para los POST:
"""
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

    # Lectura del JSON
    entrada = request.get_json()
    idRol = entrada["idRol"]
    idDc = entrada["idDc"]
    idInsti = entrada["idInsti"]
    correoInsti = entrada["correoInsti"]
    nombre = entrada["nombre"]
    telefono = entrada["telefono"]
    contrasena = entrada["contrasena"]

    # Se crea el usuario
    respuesta = createUsuarios(idRol, idDc, idInsti, correoInsti, nombre, telefono, contrasena)

    #Verificamos si hubo error
    if respuesta != 501:

        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        #Indicamos que hubo un error
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint que retorna todos los usuarios
@usuarios_bp.route('/read', methods=['GET'])
def read_Usuarios():

    # Se lee la tabla de usuarios
    respuesta = readUsuarios()

    # Verificamos si hubo error
    if respuesta != 501:

        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data
        })

    else:
        # Indicamos que hubo un error
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint que retorna solo un usuario
@usuarios_bp.route('/readu', methods=['POST'])
def readUnique_Usuarios():

    # Lectura del JSON
    entrada = request.get_json()
    idUsr = entrada["idUsr"]

    # Se lee la tabla de usuarios
    respuesta = readOneUsuarios(idUsr)

    # Verificamos si hubo error
    if respuesta != 501:

        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data
        })

    else:
        # Indicamos que hubo un error
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint para modificar un usuario
@usuarios_bp.route('/update', methods=['POST'])
def update_Usuarios():

    # Lectura del JSON
    entrada = request.get_json()
    idUsr = entrada["idUsr"]
    idRol = entrada["idRol"]
    idDc = entrada["idDc"]
    idInsti = entrada["idInsti"]
    correoInsti = entrada["correoInsti"]
    nombre = entrada["nombre"]
    telefono = entrada["telefono"]
    contrasena = entrada["contrasena"]

    # Se crea el usuario
    respuesta = updateUsuarios(idUsr, idRol, idDc, idInsti, correoInsti, nombre, telefono, contrasena)

    # Verificamos si hubo error
    if respuesta != 501:

        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        # Indicamos que hubo un error
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Enpoint para borrar un usuario
@usuarios_bp.route('/delete', methods=['POST'])
def delete_Usuarios():

    # Lectura del JSON
    entrada = request.get_json()
    idUsr = entrada["idUsr"]

    # Se lee la tabla de usuarios
    respuesta = deleteUsuarios(idUsr)

    # Verificamos si hubo error
    if respuesta != 501:

        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })

    else:
        # Indicamos que hubo un error
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint para el login de usuarios
@usuarios_bp.route('/login', methods=['POST'])
def login_Usuarios():

    # Lectura del JSON
    entrada = request.get_json()
    correo = entrada["correoInsti"]
    contrasena = entrada["contrasena"]

    # Se lee la tabla de usuarios
    respuesta = iniciarSesion(correo, contrasena)

    # Verificamos si hubo error
    if respuesta != 501:
        print(respuesta)
        # Se convierte la respuesta en un JSON
        if respuesta != False:
            resp = jsonify({"data": respuesta.data})
        else:
            resp = jsonify({"data": respuesta})

    else:
        # Indicamos que hubo un error
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp