import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Recursos"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createRecursos(pIdLab, pNombre, pImagen, pTipo, pDescripcion, pEstado):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"idLab": pIdLab,
                     "nombre": pNombre,
                     "imagen": pImagen,
                     "tipo": pTipo,
                     "descripcion": pDescripcion,
                     "estado": pEstado})
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readRecursos():
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

def readOneRecursos(pIdRec):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idRec", pIdRec)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateRecursos(pIdRecurso, pIdLab, pNombre, pImagen, pTipo, pDescripcion, pEstado):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"idLab": pIdLab,
                     "nombre": pNombre,
                     "imagen": pImagen,
                     "tipo": pTipo,
                     "descripcion": pDescripcion,
                     "estado": pEstado})
            .eq("idRec", pIdRecurso)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteRecursos(pIdRecurso):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idRec", pIdRecurso)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501