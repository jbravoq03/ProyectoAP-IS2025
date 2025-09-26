from flask import Blueprint, render_template, jsonify, request
from Controladores_Tablas.controlador_laboratorios import *
from Controladores_Tablas.controlador_responsables import *
from Controladores_Tablas.controlador_politicasLab import *
from Controladores_Tablas.controlador_recursos import *
from Controladores_Tablas.controlador_recFijo import *
from Controladores_Tablas.controlador_material import *

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

#Endpoint para leer laboratorios
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

#Endpoint para leer un laboratorio
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

    # Se modifica el laboratorio
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

#Endpoint para borrar un laboratorio
@laboratorios_bp.route('/delete', methods=['POST'])
def delete_laboratorio():

    # Lectura del JSON
    entrada = request.get_json()
    idLab = entrada["idLab"]

    # Borramos un laboratorio
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

#-------------------------------------
# Tabla de responsables

#Cuerpo del JSON para los POST:
"""
{
    "idResp": "",
    "idUsr": "",
    "idLab": "",
    "cargo": ""
}
"""

#Endpoint para crear responsables
@laboratorios_bp.route('/responsables/create', methods=['POST'])
def create_dptocar():

    # Lectura del JSON
    entrada = request.get_json()
    idUsr = entrada["idUsr"]
    idLab = entrada["idLab"]
    cargo = entrada["cargo"]

    # Creacion de responsables en la BD
    respuesta = createResponsables(idUsr, idLab, cargo)

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

#Endpoint que retorna todos los responsables
@laboratorios_bp.route('/responsables/read', methods=['GET'])
def read_dptocar():

    # Lectura de los responsables en la BD
    respuesta = readResponsables()

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint que retorna un responsables
@laboratorios_bp.route('/responsables/readu', methods=['POST'])
def readUnique_dptocar():

    # Lectura del JSON
    entrada = request.get_json()
    idResp = entrada["idResp"]

    # Lectura de un responsable en la BD
    respuesta = readOneResponsables(idResp)

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint para modificar responsables
@laboratorios_bp.route('/responsables/update', methods=['POST'])
def update_dptocar():

    #Lectura del JSON
    entrada = request.get_json()
    idResp = entrada["idResp"]
    idUsr = entrada["idUsr"]
    idLab = entrada["idLab"]
    cargo = entrada["cargo"]

    #Se modifica el responsable en la BD
    respuesta = updateResponsables(idResp, idUsr, idLab, cargo)

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

#Endpoint que elimina un responsables
@laboratorios_bp.route('/responsables/delete', methods=['POST'])
def delete_dptocar():

    #Lectura del JSON
    entrada = request.get_json()
    idResp = entrada["idResp"]

    #Se elimina el responsable en la BD
    respuesta = deleteResponsables(idResp)

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
# Tabla de politicasLab

#Cuerpo del JSON para los POST:
"""
{
    "idPolit": "",
    "idLab": "",
    "reqAcad": "",
    "reqSeg": "",
    "horarioAbre": "",
    "horarioCierre": "",
    "capacidadMax": ""
}
"""


#Endpoint para crear politicas de laboratorio
@laboratorios_bp.route('/politlab/create', methods=['POST'])
def create_politLab():

    # Lectura del JSON
    entrada = request.get_json()
    idLab = entrada["idLab"]
    reqAcad = entrada["reqAcad"]
    reqSeg = entrada["reqSeg"]
    horarioAbre = entrada["horarioAbre"]
    horarioCierre = entrada["horarioCierre"]
    capacidadMax = entrada["capacidadMax"]

    # Se crea la politica de laboratorio
    respuesta = createPoliticasLab(idLab, reqAcad, reqSeg, horarioAbre, horarioCierre, capacidadMax)

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

#Endpoint para leer politicas de laboratorio
@laboratorios_bp.route('/politlab/read', methods=['GET'])
def read_politLab():

    #Leemos la tabla politicaslab
    respuesta = readPoliticasLab()

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

#Endpoint para leer una politica de laboratorio
@laboratorios_bp.route('/politlab/readu', methods=['POST'])
def readUnique_politLab():

    # Lectura del JSON
    entrada = request.get_json()
    idPolit = entrada["idPolit"]

    # Leemos una politica de laboratorio
    respuesta = readOnePoliticasLab(idPolit)

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

#Endpoint para modificar politicas de laboratorio
@laboratorios_bp.route('/politlab/update', methods=['POST'])
def update_politLab():

    # Lectura del JSON
    entrada = request.get_json()
    idPolit = entrada["idPolit"]
    idLab = entrada["idLab"]
    reqAcad = entrada["reqAcad"]
    reqSeg = entrada["reqSeg"]
    horarioAbre = entrada["horarioAbre"]
    horarioCierre = entrada["horarioCierre"]
    capacidadMax = entrada["capacidadMax"]

    # Se modifica la politica de laboratorio
    respuesta = updatePoliticasLab(idPolit, idLab, reqAcad, reqSeg, horarioAbre, horarioCierre, capacidadMax)

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

#Endpoint para borrar politicas de laboratorio
@laboratorios_bp.route('/politlab/delete', methods=['POST'])
def delete_politLab():

    # Lectura del JSON
    entrada = request.get_json()
    idPolit = entrada["idPolit"]

    # Borramos una politica de laboratorio
    respuesta = deletePoliticasLab(idPolit)

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
# Tabla de Recursos

#Cuerpo del JSON para los POST:
"""
{
    "idRec": "",
    "idLab": "",
    "nombre": "",
    "imagen": "",
    "tipo": "",
    "descripcion": "",
    "estado": ""
}
"""


#Endpoint para crear recursos de laboratorio
@laboratorios_bp.route('/recursos/create', methods=['POST'])
def create_recursos():

    # Lectura del JSON
    entrada = request.get_json()
    idLab = entrada["idLab"]
    nombre = entrada["nombre"]
    imagen = entrada["imagen"]
    tipo = entrada["tipo"]
    descripcion = entrada["descripcion"]
    estado = entrada["estado"]

    # Se crea el recurso
    respuesta = createRecursos(idLab, nombre, imagen, tipo, descripcion, estado)

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

#Endpoint para leer recursos de laboratorio
@laboratorios_bp.route('/recursos/read', methods=['GET'])
def read_recursos():

    #Leemos la tabla recursos
    respuesta = readRecursos()

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

#Endpoint para leer un recurso de laboratorio
@laboratorios_bp.route('/recursos/readu', methods=['POST'])
def readUnique_recursos():

    # Lectura del JSON
    entrada = request.get_json()
    idRec = entrada["idRec"]

    # Leemos un recurso
    respuesta = readOneRecursos(idRec)

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

#Endpoint para modificar recursos de laboratorio
@laboratorios_bp.route('/recursos/update', methods=['POST'])
def update_recursos():

    # Lectura del JSON
    entrada = request.get_json()
    idRec = entrada["idRec"]
    idLab = entrada["idLab"]
    nombre = entrada["nombre"]
    imagen = entrada["imagen"]
    tipo = entrada["tipo"]
    descripcion = entrada["descripcion"]
    estado = entrada["estado"]

    # Se modifica el recurso
    respuesta = updateRecursos(idRec, idLab, nombre, imagen, tipo, descripcion, estado)

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

#Endpoint para borrar un recurso de laboratorio
@laboratorios_bp.route('/recursos/delete', methods=['POST'])
def delete_recursos():

    # Lectura del JSON
    entrada = request.get_json()
    idRec = entrada["idRec"]

    # Borramos un recurso
    respuesta = deleteRecursos(idRec)

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
# Tabla de Recursos Fijos

#Cuerpo del JSON para los POST:
"""
{
    "idFijo": "",
    "idRec": "",
    "codInv": "",
    "estado": "",
    "ultMante": ""
}
"""


#Endpoint para crear recursos fijos de laboratorio
@laboratorios_bp.route('/recfijos/create', methods=['POST'])
def create_recfijos():

    # Lectura del JSON
    entrada = request.get_json()
    idRec = entrada["idRec"]
    codInv = entrada["codInv"]
    estado = entrada["estado"]
    ultMante = entrada["ultMante"]

    # Se crea el recurso fijo
    respuesta = createRecFijo(idRec, codInv, estado, ultMante)

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

#Endpoint para leer recursos fijos de laboratorio
@laboratorios_bp.route('/recfijos/read', methods=['GET'])
def read_recfijos():

    #Leemos la tabla recursos fijos
    respuesta = readRecFijo()

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

#Endpoint para leer un recurso fijo de laboratorio
@laboratorios_bp.route('/recfijos/readu', methods=['POST'])
def readUnique_recfijos():

    # Lectura del JSON
    entrada = request.get_json()
    idFijo = entrada["idFijo"]

    # Leemos un recurso fijo
    respuesta = readOneRecFijo(idFijo)

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

#Endpoint para modificar recursos fijos de laboratorio
@laboratorios_bp.route('/recfijos/update', methods=['POST'])
def update_recfijos():

    # Lectura del JSON
    entrada = request.get_json()
    idFijo = entrada["idFijo"]
    idRec = entrada["idRec"]
    codInv = entrada["codInv"]
    estado = entrada["estado"]
    ultMante = entrada["ultMante"]

    # Se modifica el recurso fijo
    respuesta = updateRecFijo(idFijo, idRec, codInv, estado, ultMante)

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

#Endpoint para borrar un recurso fijo de laboratorio
@laboratorios_bp.route('/recfijos/delete', methods=['POST'])
def delete_recfijos():

    # Lectura del JSON
    entrada = request.get_json()
    idFijo = entrada["idFijo"]

    # Borramos un recurso dijo
    respuesta = deleteRecFijo(idFijo)

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
# Tabla de Materiales

#Cuerpo del JSON para los POST:
"""
{
    "idMat": "",
    "idRec": "",
    "cantidad": "",
    "medida": "",
    "reorden": ""
}
"""


#Endpoint para crear material de laboratorio
@laboratorios_bp.route('/materiales/create', methods=['POST'])
def create_materiales():

    # Lectura del JSON
    entrada = request.get_json()
    idRec = entrada["idRec"]
    cantidad = entrada["cantidad"]
    medida = entrada["medida"]
    reorden = entrada["reorden"]

    # Se crea el recurso fijo
    respuesta = createMaterial(idRec, cantidad, medida, reorden)

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

#Endpoint para leer materiales de laboratorio
@laboratorios_bp.route('/materiales/read', methods=['GET'])
def read_materiales():

    #Leemos la tabla materiales
    respuesta = readMaterial()

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

#Endpoint para leer un material de laboratorio
@laboratorios_bp.route('/materiales/readu', methods=['POST'])
def readUnique_materiales():

    # Lectura del JSON
    entrada = request.get_json()
    idMat = entrada["idMat"]

    # Leemos un material
    respuesta = readOneMaterial(idMat)

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

#Endpoint para modificar recursos fijos de laboratorio
@laboratorios_bp.route('/materiales/update', methods=['POST'])
def update_materiales():

    # Lectura del JSON
    entrada = request.get_json()
    idMat = entrada["idMat"]
    idRec = entrada["idRec"]
    cantidad = entrada["cantidad"]
    medida = entrada["medida"]
    reorden = entrada["reorden"]

    # Se modifica el material
    respuesta = updateMaterial(idMat, idRec, cantidad, medida, reorden)

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

#Endpoint para borrar un material de laboratorio
@laboratorios_bp.route('/materiales/delete', methods=['POST'])
def delete_materiales():

    # Lectura del JSON
    entrada = request.get_json()
    idMat = entrada["idMat"]

    # Borramos un material
    respuesta = deleteMaterial(idMat)

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