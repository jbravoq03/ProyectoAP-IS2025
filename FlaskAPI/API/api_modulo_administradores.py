from flask import Blueprint, render_template, jsonify, request
from Controladores_Tablas.controlador_roles import *
from Controladores_Tablas.controlador_dptoCarrera import *
from Controladores_Tablas.controlador_parametrosGlob import *
from Controladores_Tablas.controlador_etiquetas import *

# endpoints para dashboard
from Controladores_Tablas.controlador_solicitudes import readSolicitudes
from Controladores_Tablas.controlador_bitacoraRecursos import readBitRecursos
from Controladores_Tablas.controlador_recursos import readRecursos, readOneRecursos
from datetime import datetime
import re

# Se define el blueprint
administradores_bp = Blueprint('administradores',
                            __name__,
                            url_prefix='/administradores')

#Comprobacion de estado del API
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

#-------------------------------------
# Tabla de Parametros Globales

#Cuerpo del JSON para los POST:
"""
{
    "idParam": "",
    "duracionMaxima": "",
    "antelacion": "",
    "reservasSimultaneas": "",
    "idEtiqueta": "",
    "canalesEnvio": "",
    "tiempoNotificar": ""
}
"""
#Endpoint para crear parametros globales
@administradores_bp.route('/paramglob/create', methods=['POST'])
def create_paramglob():

    # Lectura del JSON
    entrada = request.get_json()
    duracionMaxima = entrada["duracionMaxima"]
    antelacion = entrada["antelacion"]
    reservasSimultaneas = entrada["reservasSimultaneas"]
    idEtiqueta = entrada["idEtiqueta"]
    canalesEnvio = entrada["canalesEnvio"]
    tiempoNotificar = entrada["tiempoNotificar"]

    # Creacion del parametro global en la BD
    respuesta = createParametrosGlob(duracionMaxima, antelacion, reservasSimultaneas, idEtiqueta, canalesEnvio, tiempoNotificar)

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

#Endpoint que retorna todos los parametros globales
@administradores_bp.route('/paramglob/read', methods=['GET'])
def read_paramglob():

    # Lectura de los parametros globales en la BD
    respuesta = readParametrosGlob()

    if respuesta != 501:
        # Se convierte la respuesta en un JSON
        resp = jsonify({
            "data": respuesta.data
        })
    else:
        resp = "Error en la BD"

    # Retorno de la respuesta
    return resp

#Endpoint para modificar parametros globales
@administradores_bp.route('/paramglob/update', methods=['POST'])
def update_paramglob():
    #Lectura del JSON
    entrada = request.get_json()
    idParam = entrada["idParam"]
    duracionMaxima = entrada["duracionMaxima"]
    antelacion = entrada["antelacion"]
    reservasSimultaneas = entrada["reservasSimultaneas"]
    idEtiqueta = entrada["idEtiqueta"]
    canalesEnvio = entrada["canalesEnvio"]
    tiempoNotificar = entrada["tiempoNotificar"]

    #Se modifica el parametros globales en la BD
    respuesta = updateParametrosGlob(idParam, duracionMaxima, antelacion, reservasSimultaneas, idEtiqueta, canalesEnvio, tiempoNotificar)

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

#Endpoint para eliminar parametros globales
@administradores_bp.route('/paramglob/delete', methods=['POST'])
def delete_paramglob():

    #Lectura del JSON
    entrada = request.get_json()
    idParam = entrada["idParam"]

    #Se elimina el parametro global en la BD
    respuesta = deleteParametrosGlob(idParam)

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
# Tabla de Etiquetas

#Cuerpo del JSON para los POST:
"""
{
    "idEtiqueta": "",
    "tag": ""
}
"""
#Endpoint para crear etiquetas
@administradores_bp.route('/etiqueta/create', methods=['POST'])
def create_etiqueta():
    entrada = request.get_json()
    tag = entrada["tag"]

    respuesta = createEtiqueta(tag)

    if respuesta != 501:
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        resp = "Error en la BD"

    return resp

#Endpoint que retorna todas las etiquetas
@administradores_bp.route('/etiqueta/read', methods=['GET'])
def read_etiquetas():
    respuesta = readEtiquetas()

    if respuesta != 501:
        resp = jsonify({
            "data": respuesta.data
        })
    else:
        resp = "Error en la BD"

    return resp

#Endpoint que retorna una etiqueta
@administradores_bp.route('/etiqueta/readu', methods=['POST'])
def readUnique_etiqueta():
    entrada = request.get_json()
    idEtiqueta = entrada["idEtiqueta"]

    respuesta = readOneEtiqueta(idEtiqueta)

    if respuesta != 501:
        resp = jsonify({
            "data": respuesta.data
        })
    else:
        resp = "Error en la BD"

    return resp

#Endpoint para modificar etiquetas
@administradores_bp.route('/etiqueta/update', methods=['POST'])
def update_etiqueta():
    entrada = request.get_json()
    idEtiqueta = entrada["idEtiqueta"]
    tag = entrada["tag"]

    respuesta = updateEtiqueta(idEtiqueta, tag)

    if respuesta != 501:
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        resp = "Error en la BD"

    return resp

#Endpoint que elimina una etiqueta
@administradores_bp.route('/etiqueta/delete', methods=['POST'])
def delete_etiqueta():
    entrada = request.get_json()
    idEtiqueta = entrada["idEtiqueta"]

    respuesta = deleteEtiqueta(idEtiqueta)

    if respuesta != 501:
        resp = jsonify({
            "data": respuesta.data,
            "count": getattr(respuesta, "count", None)
        })
    else:
        resp = "Error en la BD"

    return resp

#-------------------------------------
# Endpoints para métricas del dashboard

# Endpoint para reservas totales
@administradores_bp.route('/metricas/reservas_totales', methods=['GET'])
def get_reservas_totales():
    try:
        # Obtener parámetros de fecha (opcionales)
        year = request.args.get('year', type=int)
        month = request.args.get('month', type=int)
        
        # Obtener todas las solicitudes
        respuesta = readSolicitudes()
        
        if respuesta != 501:
            # Filtrar solo las aprobadas
            solicitudes_aprobadas = [s for s in respuesta.data if s.get('estado') == 'Aprobada']
            
            # Filtrar por fecha solo si se proporcionan ambos parámetros y no son None
            if year is not None and month is not None:
                solicitudes_filtradas = []
                for solicitud in solicitudes_aprobadas:
                    fecha_soli = solicitud.get('fechaSoli')
                    if fecha_soli:
                        # Convertir fecha string a objeto datetime
                        try:
                            # Manejar diferentes formatos de fecha
                            if 'T' in fecha_soli:
                                # Formato: 2025-09-29T00:00:00
                                fecha_obj = datetime.strptime(fecha_soli.split('T')[0], '%Y-%m-%d')
                            else:
                                # Formato: 2025-09-29
                                fecha_obj = datetime.strptime(fecha_soli, '%Y-%m-%d')
                            
                            if fecha_obj.year == year and fecha_obj.month == month:
                                solicitudes_filtradas.append(solicitud)
                        except Exception as e:
                            print(f"Error parseando fecha {fecha_soli}: {e}")
                            continue
                solicitudes_aprobadas = solicitudes_filtradas
            
            # Contar por laboratorio
            conteo_laboratorios = {}
            for solicitud in solicitudes_aprobadas:
                id_lab = solicitud.get('idLab')
                if id_lab:
                    conteo_laboratorios[id_lab] = conteo_laboratorios.get(id_lab, 0) + 1
            
            # Formatear respuesta
            data = [{"laboratorio": f"Laboratorio {lab_id}", "reservas": count} 
                   for lab_id, count in conteo_laboratorios.items()]
            return jsonify({"data": data})
        else:
            print("Error en la BD al leer solicitudes")
            return "Error en la BD", 500
            
    except Exception as e:
        print(f"Error en reservas_totales: {e}")
        return "Error interno del servidor", 500

# Endpoint para mantenimientos activos
@administradores_bp.route('/metricas/mantenimientos_activos', methods=['GET'])
def get_mantenimientos_activos():
    try:
        # Obtener parámetros de fecha (opcionales)
        year = request.args.get('year', type=int)
        month = request.args.get('month', type=int)
        
        # Obtener toda la bitácora y recursos
        respuesta_bitacora = readBitRecursos()
        respuesta_recursos = readRecursos()
        
        if respuesta_bitacora != 501 and respuesta_recursos != 501:
            # Crear diccionario de recursos para búsqueda rápida
            recursos_dict = {r['idRec']: r for r in respuesta_recursos.data}
            
            # Filtrar solo mantenimientos
            mantenimientos = [m for m in respuesta_bitacora.data if m.get('accion') == 'Mantenimiento']
            
            # Filtrar por fecha solo si se proporcionan ambos parámetros y no son None
            if year is not None and month is not None:
                mantenimientos_filtrados = []
                for mantenimiento in mantenimientos:
                    fecha_bitacora = mantenimiento.get('fecha')
                    if fecha_bitacora:
                        try:
                            # Manejar diferentes formatos de fecha
                            if 'T' in fecha_bitacora:
                                fecha_obj = datetime.strptime(fecha_bitacora.split('T')[0], '%Y-%m-%d')
                            else:
                                fecha_obj = datetime.strptime(fecha_bitacora, '%Y-%m-%d')
                            
                            if fecha_obj.year == year and fecha_obj.month == month:
                                mantenimientos_filtrados.append(mantenimiento)
                        except Exception as e:
                            print(f"Error parseando fecha {fecha_bitacora}: {e}")
                            continue
                mantenimientos = mantenimientos_filtrados
            
            # Filtrar recursos que estén en estado "Mantenimiento" y obtener nombres
            recursos_mantenimiento = {}
            for mant in mantenimientos:
                id_recurso = mant.get('idRecurso')
                if id_recurso and id_recurso in recursos_dict:
                    recurso = recursos_dict[id_recurso]
                    if recurso.get('estado') == 'Mantenimiento':
                        # Usar el nombre del recurso en lugar del ID
                        nombre_recurso = recurso.get('nombre', f'Recurso {id_recurso}')
                        fecha_mant = mant.get('fecha', 'Fecha no disponible')
                        
                        # Solo agregar una vez por recurso (evitar duplicados)
                        if id_recurso not in recursos_mantenimiento:
                            recursos_mantenimiento[id_recurso] = {
                                "recurso": nombre_recurso, 
                                "estado": "En mantenimiento",
                                "fecha_inicio": fecha_mant
                            }
            
            # Convertir a lista
            data = list(recursos_mantenimiento.values())
            return jsonify({"data": data})
        else:
            print("Error en la BD al leer bitácora o recursos")
            return "Error en la BD", 500
            
    except Exception as e:
        print(f"Error en mantenimientos_activos: {e}")
        return "Error interno del servidor", 500

# Endpoint para recursos más usados - ACTUALIZADO
@administradores_bp.route('/metricas/recursos_mas_usados', methods=['GET'])
def get_recursos_mas_usados():
    try:
        # Obtener parámetros de fecha (opcionales)
        year = request.args.get('year', type=int)
        month = request.args.get('month', type=int)
        
        # Obtener toda la bitácora y recursos
        respuesta_bitacora = readBitRecursos()
        respuesta_recursos = readRecursos()
        
        if respuesta_bitacora != 501 and respuesta_recursos != 501:
            # Filtrar solo salidas
            salidas = [s for s in respuesta_bitacora.data if s.get('accion') == 'Salida']
            
            # Filtrar por fecha solo si se proporcionan ambos parámetros y no son None
            if year is not None and month is not None:
                salidas_filtradas = []
                for salida in salidas:
                    fecha_bitacora = salida.get('fecha')
                    if fecha_bitacora:
                        try:
                            # Manejar diferentes formatos de fecha
                            if 'T' in fecha_bitacora:
                                fecha_obj = datetime.strptime(fecha_bitacora.split('T')[0], '%Y-%m-%d')
                            else:
                                fecha_obj = datetime.strptime(fecha_bitacora, '%Y-%m-%d')
                            
                            if fecha_obj.year == year and fecha_obj.month == month:
                                salidas_filtradas.append(salida)
                        except Exception as e:
                            print(f"⚠️ Error parseando fecha {fecha_bitacora}: {e}")
                            continue
                salidas = salidas_filtradas
            
            # Contar usos por recurso
            usos_por_recurso = {}
            for salida in salidas:
                id_recurso = salida.get('idRecurso')
                descripcion = salida.get('descripcion', '')
                
                # Extraer número de la descripción usando regex
                numeros = re.findall(r'\d+', descripcion)
                cantidad = int(numeros[0]) if numeros else 1
                
                usos_por_recurso[id_recurso] = usos_por_recurso.get(id_recurso, 0) + cantidad
            
            # Obtener nombres de recursos
            recursos_dict = {r['idRec']: r['nombre'] for r in respuesta_recursos.data}
            
            # Formatear respuesta
            data = []
            for id_recurso, usos in usos_por_recurso.items():
                nombre_recurso = recursos_dict.get(id_recurso, f"Recurso {id_recurso}")
                data.append({"recurso": nombre_recurso, "usos": usos})
            
            # Ordenar por usos (descendente) y tomar top 5
            data.sort(key=lambda x: x['usos'], reverse=True)
            data = data[:5]
            return jsonify({"data": data})
        else:
            print("Error en la BD al leer bitácora o recursos")
            return "Error en la BD", 500
            
    except Exception as e:
        print(f"Error en recursos_mas_usados: {e}")
        return "Error interno del servidor", 500