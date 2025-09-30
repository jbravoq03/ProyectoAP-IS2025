import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Laboratorios"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createLaboratorio(pIdDptoCar, pIdUsrLab, pIdInterno, pNombre, pUbicacion, pDescripcion):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"idDptoCar": pIdDptoCar,
                     "idUsrLab": pIdUsrLab,
                     "idInterno": pIdInterno,
                     "nombre": pNombre,
                     "ubicacion": pUbicacion,
                     "descripcion": pDescripcion})
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readLaboratorio():
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readOneLaboratorio(pIdLab):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idLab", pIdLab)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateLaboratorio(pIdLab, pIdDptoCar, pIdUsrLab, pIdInterno, pNombre, pUbicacion, pDescripcion):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"idDptoCar": pIdDptoCar,
                     "idUsrLab": pIdUsrLab,
                     "idInterno": pIdInterno,
                     "nombre": pNombre,
                     "ubicacion": pUbicacion,
                     "descripcion": pDescripcion})
            .eq("idLab", pIdLab)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteLaboratorio(pIdLab):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idLab", pIdLab)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501


