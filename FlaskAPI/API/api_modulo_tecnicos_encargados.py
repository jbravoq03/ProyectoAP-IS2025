from flask import Blueprint, render_template, jsonify, request
from Controladores_Tablas.controlador_solicitudes import *
from Controladores_Tablas.controlador_bitacoraAcciones import *
from Controladores_Tablas.controlador_bitacoraRecursos import *

# Se define el blueprint
tecnicencar_bp = Blueprint('tecnicencar',
                            __name__,
                            url_prefix='/tecnicencar')

#Comprobacion de estado del API
@tecnicencar_bp.route('/status', methods=['GET'])
def statusAPITecniEncar():
    return "¡API de tecnicos y encargados funcionando!"

#-------------------------------------
# Tabla de Solicitudes

#Cuerpo del JSON para los POST:
"""
{
    "idSolic": "",
    "idLab": "",
    "idRec": "",
    "idUsr": "",
    "fechaSoli": "",
    "estado": "",
    "motivo": "",
    "adjunto": "",
    "fechaResp":""
}
"""

#Endpoint para crear solicitudes
@tecnicencar_bp.route('/solicitudes/create', methods=['POST'])
def create_solicitudes():

    # Lectura del JSON
    entrada = request.get_json()
    idLab = entrada["idLab"]
    idRec = entrada["idRec"]
    idUsr = entrada["idUsr"]
    fechaSoli = entrada["fechaSoli"]
    estado = entrada["estado"]
    motivo = entrada["motivo"]
    adjunto = entrada["adjunto"]
    fechaResp = entrada["fechaResp"]

    #Creacion de solicitud
    respuesta = createSolicitudes(idLab, idRec, idUsr, fechaSoli, estado, motivo, adjunto, fechaResp)

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

#Endpoint para leer solicitudes
@tecnicencar_bp.route('/solicitudes/read', methods=['GET'])
def read_solicitudes():

    # Leer solicitudes
    respuesta = readSolicitudes()

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

#Endpoint para leer una solicitud
@tecnicencar_bp.route('/solicitudes/readu', methods=['POST'])
def readUnique_solicitudes():

    # Lectura del JSON
    entrada = request.get_json()
    idSolic = entrada["idSolic"]

    # Leer una solicitud
    respuesta = readOneSolicitudes(idSolic)

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

#Endpoint para modificar una solicitud
@tecnicencar_bp.route('/solicitudes/update', methods=['POST'])
def update_solicitudes():

    # Lectura del JSON
    entrada = request.get_json()
    idSolic = entrada["idSolic"]
    idLab = entrada["idLab"]
    idRec = entrada["idRec"]
    idUsr = entrada["idUsr"]
    fechaSoli = entrada["fechaSoli"]
    estado = entrada["estado"]
    motivo = entrada["motivo"]
    adjunto = entrada["adjunto"]
    fechaResp = entrada["fechaResp"]

    # Modificacion de solicitud
    respuesta = updateSolicitudes(idSolic, idLab, idRec, idUsr, fechaSoli, estado, motivo, adjunto, fechaResp)

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

#Endpoint para borrar una solicitud
@tecnicencar_bp.route('/solicitudes/delete', methods=['POST'])
def delete_solicitudes():

    # Lectura del JSON
    entrada = request.get_json()
    idSolic = entrada["idSolic"]

    # Borrado de solicitud
    respuesta = deleteSolicitudes(idSolic)

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

#-------------------------------------
# Tabla de BitacoraAcciones

#Cuerpo del JSON para los POST:
"""
{
    "idBitac": "",
    "idUsuario": "",
    "accion": "",
    "descripcion": "",
    "fecha": ""
}
"""

#Endpoint para crear una entrada en la bitacora de acciones
@tecnicencar_bp.route('/bitacacciones/create', methods=['POST'])
def create_bitacacciones():

    # Lectura del JSON
    entrada = request.get_json()
    idUsuario = entrada["idUsuario"]
    accion = entrada["accion"]
    descripcion = entrada["descripcion"]
    fecha = entrada["fecha"]

    # Creacion de entrada en bitacora acciones
    respuesta = createBitAcciones(idUsuario, accion, descripcion, fecha)

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

#Endpoint para leer las entradas en la bitacora de acciones
@tecnicencar_bp.route('/bitacacciones/read', methods=['GET'])
def read_bitacacciones():

    # Leer entradas en bitacora acciones
    respuesta = readBitAcciones()

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

#-------------------------------------
# Tabla de BitacoraRecursos

#Cuerpo del JSON para los POST:
"""
{
    "idBitac": "",
    "idRecurso": "",
    "idUsuario": "",
    "accion": "",
    "fecha": "",
    "descripcion": ""
}
"""

#Endpoint para crear una entrada en la bitacora de recursos
@tecnicencar_bp.route('/bitacrecursos/create', methods=['POST'])
def create_bitacrecursos():

    # Lectura del JSON
    entrada = request.get_json()
    idRecurso = entrada["idRecurso"]
    idUsuario = entrada["idUsuario"]
    accion = entrada["accion"]
    fecha = entrada["fecha"]
    descripcion = entrada["descripcion"]

    # Creacion de entrada en bitacora recursos
    respuesta = createBitRecursos(idRecurso, idUsuario, accion, fecha, descripcion)

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

#Endpoint para leer las entradas en la bitacora de recursos
@tecnicencar_bp.route('/bitacrecursos/read', methods=['GET'])
def read_bitacrecursos():

    # Leer entradas en bitacora recursos
    respuesta = readBitRecursos()

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

