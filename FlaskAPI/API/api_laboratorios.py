from flask import Blueprint, render_template
from Modulo_Laboratorios.controlador_laboratorios import *

laboratorios_bp = Blueprint('laboratorios',
                            __name__,
                            url_prefix='/laboratorios')

@laboratorios_bp.route('/status', methods=['GET'])
def statusAPILaboratorios():
    return "¡API de Laboratorios funcionando!"

@laboratorios_bp.route('/create', methods=['POST'])
def create_laboratorio():

    return "Crear"

@laboratorios_bp.route('/read', methods=['GET'])
def read_laboratorio():

    return "leer"

@laboratorios_bp.route('/readu', methods=['POST'])
def readUnique_laboratorio():

    return "leer uno"

@laboratorios_bp.route('/delete', methods=['POST'])
def delete_laboratorio():

    return "borrar"