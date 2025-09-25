from flask import Blueprint, render_template, jsonify, request
from Controladores_Tablas.controlador_roles import *
from Controladores_Tablas.controlador_dptoCarrera import *

# Se define el blueprint
administradores_bp = Blueprint('administradores',
                            __name__,
                            url_prefix='/administradores')

#Comprobacion de estado de los endpoints
@administradores_bp.route('/status', methods=['GET'])
def statusAPIAdministradores():
    return "¡API de administradores funcionando!"

#-------------------------------------
# Tabla de Roles

#Cuerpo del JSON para los POST:
"""
{
    "idRol": "",
    "nombre": ""
}
"""
#Endpoint para crear roles
@administradores_bp.route('/rol/create', methods=['POST'])
def create_roles():
    # Lectura del JSON
    entrada = request.get_json()
    nombre = entrada["nombre"]

    # Creacion del rol en la BD
    respuesta = createRoles(nombre)

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint que retorna todos los roles
@administradores_bp.route('/rol/read', methods=['GET'])
def read_roles():
    # Lectura de los roles en la BD
    respuesta = readRoles()

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint que retorna un rol
@administradores_bp.route('/rol/readu', methods=['POST'])
def readUnique_roles():
    # Lectura del JSON
    entrada = request.get_json()
    idRol = entrada["idRol"]

    # Lectura de un rol en la BD
    respuesta = readOneRoles(idRol)

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint para modificar roles
@administradores_bp.route('/rol/update', methods=['POST'])
def update_roles():
    #Lectura del JSON
    entrada = request.get_json()
    idRol = entrada["idRol"]
    nombre = entrada["nombre"]

    #Se modifica el rol en la BD
    respuesta = updateRoles(idRol, nombre)

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint que elimina un rol
@administradores_bp.route('/rol/delete', methods=['POST'])
def delete_roles():
    #Lectura del JSON
    entrada = request.get_json()
    idRol = entrada["idRol"]

    #Se elimina el rol en la BD
    respuesta = deleteRoles(idRol)

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#-------------------------------------
# Tabla de Departamentos/Carreras

#Cuerpo del JSON para los POST:
"""
{
    "idDc": "",
    "nombre": ""
}
"""
#Endpoint para crear departamentos/carreras
@administradores_bp.route('/dptocar/create', methods=['POST'])
def create_dptocar():
    # Lectura del JSON
    entrada = request.get_json()
    nombre = entrada["nombre"]

    # Creacion del departamento/carrera en la BD
    respuesta = createDptoCarrera(nombre)

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint que retorna todos los departamentos/carreras
@administradores_bp.route('/dptocar/read', methods=['GET'])
def read_dptocar():
    # Lectura de los departamentos/carreras en la BD
    respuesta = readDptoCarrera()

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint que retorna un departamento/carrera
@administradores_bp.route('/dptocar/readu', methods=['POST'])
def readUnique_dptocar():
    # Lectura del JSON
    entrada = request.get_json()
    idDc = entrada["idDc"]

    # Lectura de un departamento/carrera en la BD
    respuesta = readOneDptoCarrera(idDc)

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint para modificar departamento/carrera
@administradores_bp.route('/dptocar/update', methods=['POST'])
def update_dptocar():
    #Lectura del JSON
    entrada = request.get_json()
    idDc = entrada["idDc"]
    nombre = entrada["nombre"]

    #Se modifica el departamento/carrera en la BD
    respuesta = updateDptoCarrera(idDc, nombre)

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint que elimina un departamento/carrera
@administradores_bp.route('/dptocar/delete', methods=['POST'])
def delete_dptocar():
    #Lectura del JSON
    entrada = request.get_json()
    idDc = entrada["idDc"]

    #Se elimina el departamento/carrera en la BD
    respuesta = deleteDptoCarrera(idDc)

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp