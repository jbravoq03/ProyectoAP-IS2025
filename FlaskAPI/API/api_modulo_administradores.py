from flask import Blueprint, render_template, jsonify, request
from Controladores_Tablas.controlador_roles import *
from Controladores_Tablas.controlador_dptoCarrera import *
from Controladores_Tablas.controlador_parametrosGlob import *
from Controladores_Tablas.controlador_etiquetas import *

# endpoints para dashboard
from Controladores_Tablas.controlador_solicitudes import readSolicitudes
from Controladores_Tablas.controlador_bitacoraRecursos import readBitRecursos
from Controladores_Tablas.controlador_recursos import readRecursos
from Controladores_Tablas.controlador_usuarios import readUsuarios, readOneUsuarios, updateUsuarios
from Controladores_Tablas.controlador_bitacoraAcciones import readBitAcciones
from Controladores_Tablas.controlador_laboratorios import readLaboratorio
from Controladores_Tablas.controlador_material import readMaterial
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
                            print(f"Error parseando fecha {fecha_bitacora}: {e}")
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

#-------------------------------------
# Tabla de Usuarios - Gestión de Usuarios

# Endpoint para obtener todos los usuarios con información de roles
@administradores_bp.route('/usuarios/read', methods=['GET'])
def read_usuarios():
    try:
        # Obtener todos los usuarios
        respuesta_usuarios = readUsuarios()
        
        if respuesta_usuarios != 501:
            # Obtener todos los roles para mapear idRol a nombre
            respuesta_roles = readRoles()
            
            if respuesta_roles != 501:
                # Crear diccionario de roles para búsqueda rápida
                roles_dict = {rol['idRol']: rol['nombre'] for rol in respuesta_roles.data}
                
                # Formatear respuesta con nombres de roles
                usuarios_formateados = []
                for usuario in respuesta_usuarios.data:
                    rol_nombre = roles_dict.get(usuario['idRol'], 'Desconocido')
                    usuarios_formateados.append({
                        "idUsr": usuario['idUsr'],
                        "nombre": usuario['nombre'],
                        "correoInsti": usuario['correoInsti'],
                        "telefono": usuario['telefono'],
                        "idRol": usuario['idRol'],
                        "rol": rol_nombre,
                        "idDC": usuario['idDC'],
                        "idInsti": usuario['idInsti'],
                        "contrasena": usuario['contrasena']  # Incluir si es necesario
                    })
                
                return jsonify({"data": usuarios_formateados})
            else:
                return "Error en la BD al leer roles", 500
        else:
            return "Error en la BD al leer usuarios", 500
            
    except Exception as e:
        print(f"Error en read_usuarios: {e}")
        return "Error interno del servidor", 500

# Endpoint para actualizar el rol de un usuario
@administradores_bp.route('/usuarios/update_rol', methods=['POST'])
def update_rol_usuario():
    try:
        # Lectura del JSON
        entrada = request.get_json()
        idUsr = entrada["idUsr"]
        idRol = entrada["idRol"]
        
        print(f"Actualizando rol del usuario {idUsr} a {idRol}")
        
        # Primero obtener el usuario actual para no perder los otros datos
        usuario_actual = readOneUsuarios(idUsr)
        
        if usuario_actual != 501 and usuario_actual.data:
            usuario_data = usuario_actual.data[0]
            
            # Actualizar solo el rol, manteniendo los demás datos
            respuesta = updateUsuarios(
                pIdUsr=idUsr,
                pIdRol=idRol,
                pIdDc=usuario_data['idDC'],
                pIdInsti=usuario_data['idInsti'],
                pCorreoInsti=usuario_data['correoInsti'],
                pNombre=usuario_data['nombre'],
                pTelefono=usuario_data['telefono'],
                pContrasena=usuario_data['contrasena']
            )
            
            if respuesta != 501:
                return jsonify({
                    "success": True,
                    "message": "Rol actualizado correctamente",
                    "data": respuesta.data
                })
            else:
                return "Error en la BD al actualizar", 500
        else:
            return "Usuario no encontrado", 404
            
    except Exception as e:
        print(f"Error en update_rol_usuario: {e}")
        return "Error interno del servidor", 500

# Endpoint para buscar usuarios por nombre
@administradores_bp.route('/usuarios/buscar', methods=['POST'])
def buscar_usuarios():
    try:
        entrada = request.get_json()
        nombre_busqueda = entrada.get("nombre", "").lower()
        
        # Obtener todos los usuarios
        respuesta_usuarios = readUsuarios()
        respuesta_roles = readRoles()
        
        if respuesta_usuarios != 501 and respuesta_roles != 501:
            # Crear diccionario de roles
            roles_dict = {rol['idRol']: rol['nombre'] for rol in respuesta_roles.data}
            
            # Filtrar usuarios por nombre
            usuarios_filtrados = []
            for usuario in respuesta_usuarios.data:
                if nombre_busqueda in usuario['nombre'].lower():
                    rol_nombre = roles_dict.get(usuario['idRol'], 'Desconocido')
                    usuarios_filtrados.append({
                        "idUsr": usuario['idUsr'],
                        "nombre": usuario['nombre'],
                        "correoInsti": usuario['correoInsti'],
                        "telefono": usuario['telefono'],
                        "idRol": usuario['idRol'],
                        "rol": rol_nombre,
                        "idDC": usuario['idDC'],
                        "idInsti": usuario['idInsti'],
                        "contrasena": usuario['contrasena']
                    })
            
            return jsonify({"data": usuarios_filtrados})
        else:
            return "Error en la BD", 500
            
    except Exception as e:
        print(f"Error en buscar_usuarios: {e}")
        return "Error interno del servidor", 500

#-------------------------------------
# Tabla de Bitácora de Acciones - Gestión de Bitácora

# Función para inferir el módulo basado en la acción o descripción
def inferir_modulo(accion, descripcion):
    accion_lower = accion.lower() if accion else ""
    descripcion_lower = descripcion.lower() if descripcion else ""
    
    # Mapeo de palabras clave a módulos
    if any(palabra in accion_lower or palabra in descripcion_lower 
           for palabra in ['reserva', 'solicitud', 'lab']):
        return "Reservas"
    elif any(palabra in accion_lower or palabra in descripcion_lower 
             for palabra in ['usuario', 'rol', 'perfil']):
        return "Usuarios"
    elif any(palabra in accion_lower or palabra in descripcion_lower 
             for palabra in ['recurso', 'material', 'inventario']):
        return "Recursos"
    elif any(palabra in accion_lower or palabra in descripcion_lower 
             for palabra in ['mantenimiento', 'reparacion']):
        return "Mantenimiento"
    elif any(palabra in accion_lower or palabra in descripcion_lower 
             for palabra in ['configuracion', 'parametro']):
        return "Configuración"
    elif any(palabra in accion_lower or palabra in descripcion_lower 
             for palabra in ['reporte', 'estadistica', 'metric']):
        return "Reportes"
    else:
        return "Sistema"

# Endpoint para obtener toda la bitácora de acciones
@administradores_bp.route('/bitacora/read', methods=['GET'])
def read_bitacora():
    try:
        # Obtener todas las bitácoras
        respuesta_bitacora = readBitAcciones()
        
        if respuesta_bitacora != 501:
            # Obtener todos los usuarios para mapear idUsuario a nombre
            respuesta_usuarios = readUsuarios()
            
            if respuesta_usuarios != 501:
                # Crear diccionario de usuarios para búsqueda rápida
                usuarios_dict = {usuario['idUsr']: usuario['nombre'] for usuario in respuesta_usuarios.data}
                
                # Formatear respuesta con nombres de usuarios
                bitacoras_formateadas = []
                for bitacora in respuesta_bitacora.data:
                    nombre_usuario = usuarios_dict.get(bitacora['idUsuario'], 'Usuario Desconocido')
                    
                    # Formatear fecha
                    fecha_bitacora = bitacora.get('fecha', '')
                    if 'T' in fecha_bitacora:
                        fecha_formateada = fecha_bitacora.split('T')[0]
                    else:
                        fecha_formateada = fecha_bitacora
                    
                    # Inferir módulo
                    modulo = inferir_modulo(bitacora.get('accion'), bitacora.get('descripcion'))
                    
                    bitacoras_formateadas.append({
                        "idBitac": bitacora['idBitac'],
                        "usuario": nombre_usuario,
                        "accion": bitacora['accion'],
                        "descripcion": bitacora['descripcion'],
                        "fecha": fecha_formateada,
                        "modulo": modulo,
                        "idUsuario": bitacora['idUsuario']
                    })
                
                return jsonify({"data": bitacoras_formateadas})
            else:
                return "Error en la BD al leer usuarios", 500
        else:
            return "Error en la BD al leer bitácora", 500
            
    except Exception as e:
        print(f"Error en read_bitacora: {e}")
        return "Error interno del servidor", 500

# Endpoint para buscar/filtrar bitácora
@administradores_bp.route('/bitacora/buscar', methods=['GET'])
def buscar_bitacora():
    try:
        # Obtener parámetros de filtro
        usuario_filtro = request.args.get('usuario', type=str)
        accion_filtro = request.args.get('accion', type=str)
        modulo_filtro = request.args.get('modulo', type=str)
        a365dias_filtro = request.args.get('anio', type=str)  # Cambiado de fecha a componentes separados
        mes_filtro = request.args.get('mes', type=str)
        dia_filtro = request.args.get('dia', type=str)

        print(f"Filtros aplicados - Usuario: {usuario_filtro}, Acción: {accion_filtro}, Módulo: {modulo_filtro}, Año: {a365dias_filtro}, Mes: {mes_filtro}, Día: {dia_filtro}")

        # Obtener todas las bitácoras
        respuesta_bitacora = readBitAcciones()
        
        if respuesta_bitacora != 501:
            # Obtener todos los usuarios
            respuesta_usuarios = readUsuarios()
            
            if respuesta_usuarios != 501:
                usuarios_dict = {usuario['idUsr']: usuario['nombre'] for usuario in respuesta_usuarios.data}
                
                # Aplicar filtros
                bitacoras_filtradas = []
                
                for bitacora in respuesta_bitacora.data:
                    nombre_usuario = usuarios_dict.get(bitacora['idUsuario'], 'Usuario Desconocido')
                    
                    # Inferir módulo
                    modulo = inferir_modulo(bitacora.get('accion'), bitacora.get('descripcion'))
                    
                    # Filtro por usuario
                    if usuario_filtro and usuario_filtro != "":
                        if usuario_filtro.lower() not in nombre_usuario.lower():
                            continue
                    
                    # Filtro por acción
                    if accion_filtro and accion_filtro != "Todas":
                        if accion_filtro.lower() not in bitacora['accion'].lower():
                            continue
                    
                    # Filtro por módulo
                    if modulo_filtro and modulo_filtro != "Todos":
                        if modulo_filtro != modulo:
                            continue
                    
                    # Filtro por fecha - AHORA ES OPCIONAL POR COMPONENTES
                    fecha_bitacora = bitacora.get('fecha', '')
                    if fecha_bitacora:
                        try:
                            # Convertir fecha de string a objeto datetime para comparación
                            if 'T' in fecha_bitacora:
                                fecha_obj = datetime.strptime(fecha_bitacora.split('T')[0], '%Y-%m-%d')
                            else:
                                fecha_obj = datetime.strptime(fecha_bitacora, '%Y-%m-%d')
                            
                            # Aplicar filtros de fecha individualmente
                            if a365dias_filtro:
                                if fecha_obj.year != int(a365dias_filtro):
                                    continue
                            
                            if mes_filtro:
                                if fecha_obj.month != int(mes_filtro):
                                    continue
                            
                            if dia_filtro:
                                if fecha_obj.day != int(dia_filtro):
                                    continue
                                    
                        except Exception as e:
                            print(f"Error parseando fecha {fecha_bitacora}: {e}")
                            # Si hay error parseando la fecha, incluir el registro por seguridad
                            pass
                    
                    # Formatear fecha para mostrar
                    if 'T' in fecha_bitacora:
                        fecha_formateada = fecha_bitacora.split('T')[0]
                    else:
                        fecha_formateada = fecha_bitacora
                    
                    bitacoras_filtradas.append({
                        "idBitac": bitacora['idBitac'],
                        "usuario": nombre_usuario,
                        "accion": bitacora['accion'],
                        "descripcion": bitacora['descripcion'],
                        "fecha": fecha_formateada,
                        "modulo": modulo,
                        "idUsuario": bitacora['idUsuario']
                    })
                
                print(f"Bitácoras encontradas: {len(bitacoras_filtradas)}")
                return jsonify({"data": bitacoras_filtradas})
            else:
                return "Error en la BD al leer usuarios", 500
        else:
            return "Error en la BD al leer bitácora", 500
            
    except Exception as e:
        print(f"Error en buscar_bitacora: {e}")
        return "Error interno del servidor", 500

# Endpoint para obtener años disponibles en las bitacoras
@administradores_bp.route('/filtros/a365dias_disponibles_bitacora', methods=['GET'])
def get_a365dias_disponibles_bitacora():
    try:
        print("Obteniendo años disponibles...")
        
        # Obtener datos de bitácora y solicitudes para extraer años
        respuesta_bitacora = readBitAcciones()
        respuesta_solicitudes = readSolicitudes()
        
        a365dias_set = set()
        
        # Extraer años de la bitácora
        if respuesta_bitacora != 501:
            for registro in respuesta_bitacora.data:
                fecha = registro.get('fecha')
                if fecha:
                    try:
                        if 'T' in fecha:
                            fecha_obj = datetime.strptime(fecha.split('T')[0], '%Y-%m-%d')
                        else:
                            fecha_obj = datetime.strptime(fecha, '%Y-%m-%d')
                        a365dias_set.add(fecha_obj.year)
                    except Exception as e:
                        print(f"Error parseando fecha bitácora {fecha}: {e}")
                        continue
        
        # Extraer años de las solicitudes
        if respuesta_solicitudes != 501:
            for solicitud in respuesta_solicitudes.data:
                fecha_soli = solicitud.get('fechaSoli')
                if fecha_soli:
                    try:
                        if 'T' in fecha_soli:
                            fecha_obj = datetime.strptime(fecha_soli.split('T')[0], '%Y-%m-%d')
                        else:
                            fecha_obj = datetime.strptime(fecha_soli, '%Y-%m-%d')
                        a365dias_set.add(fecha_obj.year)
                    except Exception as e:
                        print(f"Error parseando fecha solicitud {fecha_soli}: {e}")
                        continue
        
        # Convertir a lista y ordenar descendente
        a365dias_lista = sorted(list(a365dias_set), reverse=True)
        
        # Si no hay años, usar el año actual como mínimo
        if not a365dias_lista:
            a365dias_lista = [datetime.now().year]

        print(f"Años disponibles: {a365dias_lista}")
        return jsonify({
            "success": True,
            "data": a365dias_lista
        })
        
    except Exception as e:
        print(f"Error en get_a365dias_disponibles: {e}")
        return jsonify({
            "success": False,
            "error": "Error interno del servidor"
        }), 500

#-------------------------------------
# Tabla de Reportes Intitucionales - Gestión de Reportes

# Endpoint para Reporte de Uso Global
@administradores_bp.route('/reportes/uso_global', methods=['GET'])
def get_reporte_uso_global():
    try:
        # Obtener parámetros de filtro
        tipo_recurso_filtro = request.args.get('tipo_recurso', type=str)
        laboratorio_filtro = request.args.get('laboratorio', type=str)
        a365dias_filtro = request.args.get('a365dias', type=int)
        mes_filtro = request.args.get('mes', type=int)
        dia_filtro = request.args.get('dia', type=int)

        print(f"Reporte Uso Global - Filtros: tipo_recurso={tipo_recurso_filtro}, laboratorio={laboratorio_filtro}, a365dias={a365dias_filtro}, mes={mes_filtro}, día={dia_filtro}")

        # Obtener datos de bitácora de recursos y recursos
        respuesta_bitacora = readBitRecursos()
        respuesta_recursos = readRecursos()
        respuesta_laboratorios = readLaboratorio()
        
        if respuesta_bitacora != 501 and respuesta_recursos != 501 and respuesta_laboratorios != 501:
            # Crear diccionarios para búsqueda rápida
            recursos_dict = {r['idRec']: r for r in respuesta_recursos.data}
            laboratorios_dict = {l['idLab']: l for l in respuesta_laboratorios.data}
            
            # Filtrar solo salidas (usos de recursos)
            salidas = [s for s in respuesta_bitacora.data if s.get('accion') == 'Salida']
            
            # Aplicar filtros de fecha
            salidas_filtradas = []
            for salida in salidas:
                fecha_bitacora = salida.get('fecha')
                if fecha_bitacora:
                    try:
                        if 'T' in fecha_bitacora:
                            fecha_obj = datetime.strptime(fecha_bitacora.split('T')[0], '%Y-%m-%d')
                        else:
                            fecha_obj = datetime.strptime(fecha_bitacora, '%Y-%m-%d')
                        
                        # Filtro por año
                        if a365dias_filtro and fecha_obj.year != a365dias_filtro:
                            continue
                        
                        # Filtro por mes
                        if mes_filtro and fecha_obj.month != mes_filtro:
                            continue
                        
                        # Filtro por día
                        if dia_filtro and fecha_obj.day != dia_filtro:
                            continue
                            
                    except Exception as e:
                        print(f"Error parseando fecha {fecha_bitacora}: {e}")
                        continue
                
                salidas_filtradas.append(salida)
            
            # Contar usos por recurso
            usos_por_recurso = {}
            for salida in salidas_filtradas:
                id_recurso = salida.get('idRecurso')
                if id_recurso and id_recurso in recursos_dict:
                    recurso = recursos_dict[id_recurso]
                    
                    # Filtro por tipo de recurso
                    if tipo_recurso_filtro and tipo_recurso_filtro != "Todos":
                        if recurso.get('tipo') != tipo_recurso_filtro:
                            continue
                    
                    # Filtro por laboratorio
                    if laboratorio_filtro and laboratorio_filtro != "Todos":
                        id_lab = recurso.get('idLab')
                        if id_lab in laboratorios_dict:
                            lab_nombre = laboratorios_dict[id_lab].get('nombre', '')
                            if laboratorio_filtro not in lab_nombre:
                                continue
                    
                    nombre_recurso = recurso.get('nombre', f'Recurso {id_recurso}')
                    usos_por_recurso[nombre_recurso] = usos_por_recurso.get(nombre_recurso, 0) + 1
            
            # Formatear respuesta
            data = [{"servicio": servicio, "cantidad": cantidad} 
                   for servicio, cantidad in usos_por_recurso.items()]
            
            print(f"Datos Uso Global: {len(data)} servicios")
            return jsonify({"data": data})
        else:
            return "Error en la BD", 500
            
    except Exception as e:
        print(f"Error en reporte_uso_global: {e}")
        return "Error interno del servidor", 500

# Endpoint para Reporte de Consumo de Materiales
@administradores_bp.route('/reportes/consumo_materiales', methods=['GET'])
def get_reporte_consumo_materiales():
    try:
        # Obtener parámetros de filtro
        tipo_recurso_filtro = request.args.get('tipo_recurso', type=str)
        laboratorio_filtro = request.args.get('laboratorio', type=str)
        a365dias_filtro = request.args.get('a365dias', type=int)
        mes_filtro = request.args.get('mes', type=int)
        dia_filtro = request.args.get('dia', type=int)

        print(f"Reporte Consumo Materiales - Filtros: tipo_recurso={tipo_recurso_filtro}, laboratorio={laboratorio_filtro}, a365dias={a365dias_filtro}, mes={mes_filtro}, día={dia_filtro}")

        # Obtener datos de material y bitácora
        respuesta_material = readMaterial()
        respuesta_bitacora = readBitRecursos()
        respuesta_recursos = readRecursos()
        respuesta_laboratorios = readLaboratorio()
        
        # Verificar que todas las respuestas sean exitosas
        if any(resp == 501 for resp in [respuesta_material, respuesta_bitacora, respuesta_recursos, respuesta_laboratorios]):
            print("Error en una de las consultas a la BD")
            return jsonify({"data": []})  # Retornar array vacío en caso de error

        # Crear diccionarios para búsqueda rápida
        recursos_dict = {r['idRec']: r for r in respuesta_recursos.data}
        laboratorios_dict = {l['idLab']: l for l in respuesta_laboratorios.data}
        material_dict = {m['idRec']: m for m in respuesta_material.data}
        
        print(f"Datos cargados - Recursos: {len(recursos_dict)}, Laboratorios: {len(laboratorios_dict)}, Materiales: {len(material_dict)}, Bitácora: {len(respuesta_bitacora.data)}")
        
        # Filtrar salidas de material - NO filtrar por tipo en la carga inicial
        salidas_material = []
        for salida in respuesta_bitacora.data:
            if salida.get('accion') == 'Salida':
                id_recurso = salida.get('idRecurso')
                
                # Verificar si el recurso existe y es un material
                if id_recurso and id_recurso in recursos_dict and id_recurso in material_dict:
                    recurso = recursos_dict[id_recurso]
                    
                    # DEBUG: Mostrar información del recurso
                    print(f"🔍 Recurso {id_recurso}: {recurso.get('nombre')} - Tipo: {recurso.get('tipo')}")
                    
                    # Aplicar filtros de fecha
                    fecha_bitacora = salida.get('fecha')
                    fecha_cumple = True
                    
                    if fecha_bitacora:
                        try:
                            if 'T' in fecha_bitacora:
                                fecha_obj = datetime.strptime(fecha_bitacora.split('T')[0], '%Y-%m-%d')
                            else:
                                fecha_obj = datetime.strptime(fecha_bitacora, '%Y-%m-%d')
                            
                            # Filtro por año
                            if a365dias_filtro and fecha_obj.year != a365dias_filtro:
                                fecha_cumple = False
                            
                            # Filtro por mes
                            if fecha_cumple and mes_filtro and fecha_obj.month != mes_filtro:
                                fecha_cumple = False
                            
                            # Filtro por día
                            if fecha_cumple and dia_filtro and fecha_obj.day != dia_filtro:
                                fecha_cumple = False
                                
                        except Exception as e:
                            print(f"Error parseando fecha {fecha_bitacora}: {e}")
                            fecha_cumple = False
                    
                    # Si no cumple con los filtros de fecha, saltar
                    if not fecha_cumple:
                        continue
                    
                    # Filtro por tipo de recurso - SOLO aplicar si se especifica
                    if tipo_recurso_filtro and tipo_recurso_filtro != "Todos":
                        if recurso.get('tipo') != tipo_recurso_filtro:
                            continue
                    
                    # Filtro por laboratorio - SOLO aplicar si se especifica
                    if laboratorio_filtro and laboratorio_filtro != "Todos":
                        id_lab = recurso.get('idLab')
                        if id_lab in laboratorios_dict:
                            lab_nombre = laboratorios_dict[id_lab].get('nombre', '')
                            if laboratorio_filtro != lab_nombre:
                                continue
                        else:
                            continue  # Si no tiene laboratorio, saltar
                    
                    salidas_material.append(salida)
        
        print(f"Salidas de material filtradas: {len(salidas_material)}")
        
        # Contar consumo por material
        consumo_por_material = {}
        for salida in salidas_material:
            id_recurso = salida.get('idRecurso')
            if id_recurso in recursos_dict and id_recurso in material_dict:
                recurso = recursos_dict[id_recurso]
                material = material_dict[id_recurso]
                
                # Extraer cantidad de la descripción o usar 1 por defecto
                descripcion = salida.get('descripcion', '')
                cantidad = 1
                
                # Intentar extraer cantidad de la descripción
                if descripcion:
                    import re
                    numeros = re.findall(r'\d+', descripcion)
                    if numeros:
                        cantidad = int(numeros[0])
                    # También buscar patrones comunes
                    elif 'unidad' in descripcion.lower():
                        cantidad = 1
                    elif 'cantidad' in descripcion.lower():
                        # Buscar después de la palabra cantidad
                        match = re.search(r'cantidad[\s:]*(\d+)', descripcion.lower())
                        if match:
                            cantidad = int(match.group(1))
                
                nombre_material = recurso.get('nombre', f'Material {id_recurso}')
                consumo_por_material[nombre_material] = consumo_por_material.get(nombre_material, 0) + cantidad
                
                print(f"Material: {nombre_material}, Cantidad: {cantidad}, Descripción: {descripcion}")
        
        # Formatear respuesta
        data = [{"material": material, "cantidad": cantidad} 
               for material, cantidad in consumo_por_material.items()]
        
        print(f"Datos Consumo Materiales finales: {len(data)} materiales")
        return jsonify({"data": data})
        
    except Exception as e:
        print(f"Error en reporte_consumo_materiales: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"data": []})  # Retornar array vacío en caso de error

# Endpoint para Reporte de Desempeño
@administradores_bp.route('/reportes/desempeno', methods=['GET'])
def get_reporte_desempeno():
    try:
        # Obtener parámetros de filtro
        laboratorio_filtro = request.args.get('laboratorio', type=str)
        a365dias_filtro = request.args.get('a365dias', type=int)
        mes_filtro = request.args.get('mes', type=int)

        print(f"Reporte Desempeño - Filtros: laboratorio={laboratorio_filtro}, a365dias={a365dias_filtro}, mes={mes_filtro}")

        # Obtener datos de solicitudes y laboratorios
        respuesta_solicitudes = readSolicitudes()
        respuesta_laboratorios = readLaboratorio()
        
        if respuesta_solicitudes != 501 and respuesta_laboratorios != 501:
            # Crear diccionario de laboratorios
            laboratorios_dict = {l['idLab']: l for l in respuesta_laboratorios.data}
            
            # Filtrar solicitudes aprobadas
            solicitudes_aprobadas = [s for s in respuesta_solicitudes.data 
                                   if s.get('estado') == 'Aprobada']
            
            # Calcular tiempo de respuesta por laboratorio
            tiempos_por_laboratorio = {}
            conteo_por_laboratorio = {}
            
            for solicitud in solicitudes_aprobadas:
                id_lab = solicitud.get('idLab')
                if id_lab in laboratorios_dict:
                    # Filtro por laboratorio
                    if laboratorio_filtro and laboratorio_filtro != "Todos":
                        lab_nombre = laboratorios_dict[id_lab].get('nombre', '')
                        if laboratorio_filtro not in lab_nombre:
                            continue
                    
                    fecha_soli = solicitud.get('fechaSoli')
                    fecha_resp = solicitud.get('fechaResp')
                    
                    # Aplicar filtros de fecha
                    if fecha_soli:
                        try:
                            if 'T' in fecha_soli:
                                fecha_soli_obj = datetime.strptime(fecha_soli.split('T')[0], '%Y-%m-%d')
                            else:
                                fecha_soli_obj = datetime.strptime(fecha_soli, '%Y-%m-%d')
                            
                            # Filtro por año
                            if a365dias_filtro and fecha_soli_obj.year != a365dias_filtro:
                                continue
                            
                            # Filtro por mes
                            if mes_filtro and fecha_soli_obj.month != mes_filtro:
                                continue
                                
                        except Exception as e:
                            print(f"⚠️ Error parseando fecha {fecha_soli}: {e}")
                            continue
                    
                    # Calcular tiempo de respuesta (diferencia entre fechaSoli y fechaResp)
                    if fecha_soli and fecha_resp:
                        try:
                            if 'T' in fecha_soli:
                                fecha_soli_obj = datetime.strptime(fecha_soli.replace('T', ' ')[:19], '%Y-%m-%d %H:%M:%S')
                            else:
                                fecha_soli_obj = datetime.strptime(fecha_soli, '%Y-%m-%d %H:%M:%S')
                            
                            if 'T' in fecha_resp:
                                fecha_resp_obj = datetime.strptime(fecha_resp.replace('T', ' ')[:19], '%Y-%m-%d %H:%M:%S')
                            else:
                                fecha_resp_obj = datetime.strptime(fecha_resp, '%Y-%m-%d %H:%M:%S')
                            
                            tiempo_respuesta = (fecha_resp_obj - fecha_soli_obj).total_seconds() / 3600  # en horas
                            
                            lab_nombre = laboratorios_dict[id_lab].get('nombre', f'Laboratorio {id_lab}')
                            
                            if lab_nombre not in tiempos_por_laboratorio:
                                tiempos_por_laboratorio[lab_nombre] = 0
                                conteo_por_laboratorio[lab_nombre] = 0
                            
                            tiempos_por_laboratorio[lab_nombre] += tiempo_respuesta
                            conteo_por_laboratorio[lab_nombre] += 1
                            
                        except Exception as e:
                            print(f"Error calculando tiempo de respuesta: {e}")
                            continue
            
            # Calcular promedios
            data = []
            for lab_nombre, tiempo_total in tiempos_por_laboratorio.items():
                conteo = conteo_por_laboratorio[lab_nombre]
                if conteo > 0:
                    promedio_horas = tiempo_total / conteo
                    horas = int(promedio_horas)
                    minutos = int((promedio_horas - horas) * 60)
                    tiempo_formateado = f"{horas}h {minutos}m"
                    
                    data.append({
                        "laboratorio": lab_nombre,
                        "tiempo_promedio": tiempo_formateado
                    })
            
            print(f"Datos Desempeño: {len(data)} laboratorios")
            return jsonify({"data": data})
        else:
            return "Error en la BD", 500
            
    except Exception as e:
        print(f"Error en reporte_desempeno: {e}")
        return "Error interno del servidor", 500

# Endpoint para Exportar a PDF (placeholder)
@administradores_bp.route('/reportes/exportar_pdf', methods=['GET'])
def exportar_reporte_pdf():
    try:
        # Este es un placeholder - en producción generarías un PDF real
        print("Exportando reporte a PDF...")
        
        # Por ahora retornamos un mensaje de éxito
        return jsonify({
            "success": True,
            "message": "Reporte exportado correctamente (funcionalidad en desarrollo)",
            "download_url": "#"
        })
        
    except Exception as e:
        print(f"Error exportando PDF: {e}")
        return "Error interno del servidor", 500

#-------------------------------------
# OPCIONES DE FILTROS PARA REPORTES

# Endpoint para obtener tipos de recursos únicos
@administradores_bp.route('/filtros/tipos_recursos', methods=['GET'])
def get_tipos_recursos():
    try:
        print("Obteniendo tipos de recursos...")
        
        # Obtener todos los recursos
        respuesta_recursos = readRecursos()
        
        if respuesta_recursos != 501:
            # Extraer tipos únicos de recursos
            tipos_recursos = set()
            for recurso in respuesta_recursos.data:
                tipo = recurso.get('tipo')
                if tipo:
                    tipos_recursos.add(tipo)
            
            # Convertir a lista y ordenar
            tipos_lista = sorted(list(tipos_recursos))
            
            print(f"Tipos de recursos encontrados: {tipos_lista}")
            return jsonify({
                "success": True,
                "data": tipos_lista
            })
        else:
            return jsonify({
                "success": False,
                "error": "Error en la BD al leer recursos"
            }), 500
            
    except Exception as e:
        print(f"Error en get_tipos_recursos: {e}")
        return jsonify({
            "success": False,
            "error": "Error interno del servidor"
        }), 500

# Endpoint para obtener laboratorios únicos
@administradores_bp.route('/filtros/laboratorios', methods=['GET'])
def get_laboratorios():
    try:
        print("Obteniendo laboratorios...")
        
        # Obtener todos los laboratorios
        respuesta_laboratorios = readLaboratorio()
        
        if respuesta_laboratorios != 501:
            # Extraer nombres de laboratorios únicos
            laboratorios_set = set()
            for laboratorio in respuesta_laboratorios.data:
                nombre = laboratorio.get('nombre')
                if nombre:
                    laboratorios_set.add(nombre)
            
            # Convertir a lista y ordenar
            laboratorios_lista = sorted(list(laboratorios_set))
            
            print(f"Laboratorios encontrados: {laboratorios_lista}")
            return jsonify({
                "success": True,
                "data": laboratorios_lista
            })
        else:
            return jsonify({
                "success": False,
                "error": "Error en la BD al leer laboratorios"
            }), 500
            
    except Exception as e:
        print(f"Error en get_laboratorios: {e}")
        return jsonify({
            "success": False,
            "error": "Error interno del servidor"
        }), 500

# Endpoint para obtener años disponibles en los datos
@administradores_bp.route('/filtros/a365dias_disponibles', methods=['GET'])
def get_a365dias_disponibles():
    try:
        print("Obteniendo años disponibles...")
        
        # Obtener datos de bitácora y solicitudes para extraer años
        respuesta_bitacora = readBitRecursos()
        respuesta_solicitudes = readSolicitudes()
        
        a365dias_set = set()
        
        # Extraer años de la bitácora
        if respuesta_bitacora != 501:
            for registro in respuesta_bitacora.data:
                fecha = registro.get('fecha')
                if fecha:
                    try:
                        if 'T' in fecha:
                            fecha_obj = datetime.strptime(fecha.split('T')[0], '%Y-%m-%d')
                        else:
                            fecha_obj = datetime.strptime(fecha, '%Y-%m-%d')
                        a365dias_set.add(fecha_obj.year)
                    except Exception as e:
                        print(f"Error parseando fecha bitácora {fecha}: {e}")
                        continue
        
        # Extraer años de las solicitudes
        if respuesta_solicitudes != 501:
            for solicitud in respuesta_solicitudes.data:
                fecha_soli = solicitud.get('fechaSoli')
                if fecha_soli:
                    try:
                        if 'T' in fecha_soli:
                            fecha_obj = datetime.strptime(fecha_soli.split('T')[0], '%Y-%m-%d')
                        else:
                            fecha_obj = datetime.strptime(fecha_soli, '%Y-%m-%d')
                        a365dias_set.add(fecha_obj.year)
                    except Exception as e:
                        print(f"Error parseando fecha solicitud {fecha_soli}: {e}")
                        continue
        
        # Convertir a lista y ordenar descendente
        a365dias_lista = sorted(list(a365dias_set), reverse=True)
        
        # Si no hay años, usar el año actual como mínimo
        if not a365dias_lista:
            a365dias_lista = [datetime.now().year]

        print(f"Años disponibles: {a365dias_lista}")
        return jsonify({
            "success": True,
            "data": a365dias_lista
        })
        
    except Exception as e:
        print(f"Error en get_a365dias_disponibles: {e}")
        return jsonify({
            "success": False,
            "error": "Error interno del servidor"
        }), 500

#-------------------------------------
# Configuración del Sistema - Gestión de Parámetros y Etiquetas

# Endpoint para obtener configuración completa
@administradores_bp.route('/configuracion/read', methods=['GET'])
def read_configuracion():
    try:
        # Obtener parámetros globales
        respuesta_param = readParametrosGlob()
        # Obtener etiquetas
        respuesta_etiquetas = readEtiquetas()
        print(f"Respuesta parámetros: {respuesta_param}")
        print(f"Respuesta etiquetas: {respuesta_etiquetas}")

        if respuesta_param != 501 and respuesta_etiquetas != 501:
            return jsonify({
                "parametros": respuesta_param.data,
                "etiquetas": respuesta_etiquetas.data
            })
        else:
            return "Error en la BD", 500
    except Exception as e:
        print(f"Error en read_configuracion: {e}")
        return "Error interno del servidor", 500

# Endpoint para guardar configuración completa
@administradores_bp.route('/configuracion/update', methods=['POST'])
def update_configuracion():
    try:
        entrada = request.get_json()
        parametros = entrada.get("parametros", {})
        
        # Si no hay idParam, crear nuevo registro
        if not parametros.get("idParam"):
            respuesta = createParametrosGlob(
                pDuracionMaxima=parametros.get("duracionMaxima"),
                pAntelacion=parametros.get("antelacion"),
                pReservasSimultaneas=parametros.get("reservasSimultaneas"),
                pIdEtiqueta=parametros.get("idEtiqueta"),
                pCanalesEnvio=parametros.get("canalesEnvio"),
                pTiempoNotificar=parametros.get("tiempoNotificar")
            )
        else:
            # Actualizar registro existente
            respuesta = updateParametrosGlob(
                pIdParam=parametros.get("idParam"),
                pDuracionMaxima=parametros.get("duracionMaxima"),
                pAntelacion=parametros.get("antelacion"),
                pReservasSimultaneas=parametros.get("reservasSimultaneas"),
                pIdEtiqueta=parametros.get("idEtiqueta"),
                pCanalesEnvio=parametros.get("canalesEnvio"),
                pTiempoNotificar=parametros.get("tiempoNotificar")
            )
        
        if respuesta != 501:
            return jsonify({
                "success": True,
                "data": respuesta.data
            })
        else:
            return "Error en la BD", 500
            
    except Exception as e:
        print(f"Error en update_configuracion: {e}")
        return "Error interno del servidor", 500