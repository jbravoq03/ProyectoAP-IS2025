from flask import Blueprint, render_template, jsonify, request
from Controladores_Tablas.controlador_laboratorios import *

# Se define el blueprint
laboratorios_bp = Blueprint('laboratorios',
                            __name__,
                            url_prefix='/laboratorios')

# Comprobacion de estado del API
@laboratorios_bp.route('/status', methods=['GET'])
def statusAPILaboratorios():
    return "¡API de Laboratorios funcionando!"

#-------------------------------------
# Tabla de Laboratorios

#Cuerpo del JSON para los POST:
"""
{
    "idLab": "",
    "idDc": "",
    "idUsrLab": "",
    "idInterno": "",
    "nombre": "",
    "ubicacion": "",
    "descripcion": ""
}
"""

#Endpoint para crear laboratorios
@laboratorios_bp.route('/create', methods=['POST'])
def create_laboratorio():

    # Lectura del JSON
    entrada = request.get_json()
    idDc = entrada["idDc"]
    idUsrLab = entrada["idUsrLab"]
    idInterno = entrada["idInterno"]
    nombre = entrada["nombre"]
    ubicacion = entrada["ubicacion"]
    descripcion = entrada["descripcion"]

    # Se crea el laboratorio
    respuesta = createLaboratorio(idDc, idUsrLab, idInterno, nombre, ubicacion, descripcion)

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

@laboratorios_bp.route('/read', methods=['GET'])
def read_laboratorio():

    #Leemos la tabla laboratorios
    respuesta = readLaboratorio()

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

@laboratorios_bp.route('/readu', methods=['POST'])
def readUnique_laboratorio():

    # Lectura del JSON
    entrada = request.get_json()
    idLab = entrada["idLab"]

    # Leemos un laboratorio
    respuesta = readOneLaboratorio(idLab)

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

#Endpoint para modificar laboratorios
@laboratorios_bp.route('/update', methods=['POST'])
def update_laboratorio():

    # Lectura del JSON
    entrada = request.get_json()
    idLab = entrada["idLab"]
    idDc = entrada["idDc"]
    idUsrLab = entrada["idUsrLab"]
    idInterno = entrada["idInterno"]
    nombre = entrada["nombre"]
    ubicacion = entrada["ubicacion"]
    descripcion = entrada["descripcion"]

    # Se crea el laboratorio
    respuesta = updateLaboratorio(idLab, idDc, idUsrLab, idInterno, nombre, ubicacion, descripcion)

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

@laboratorios_bp.route('/delete', methods=['POST'])
def delete_laboratorio():

    # Lectura del JSON
    entrada = request.get_json()
    idLab = entrada["idLab"]

    # Leemos un laboratorio
    respuesta = deleteLaboratorio(idLab)

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