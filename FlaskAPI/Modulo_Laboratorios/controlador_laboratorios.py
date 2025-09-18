import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Laboratorios"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createLaboratorio(pIdDptoCar, pIdInterno, pNombre, pUbicacion, pDescripcion):

    supabase = conectarBD()
    response = (
        supabase.table("Laboratorios")
        .insert({"idDptoCar": pIdDptoCar,
                 "idInterno": pIdInterno,
                 "nombre": pNombre,
                 "ubicacion": pUbicacion,
                 "descripcion": pDescripcion})
        .execute()
    )
    return response

def readLaboratorio():

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .execute()
    )
    return response

def readOneLaboratorio(pIdLab):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .eq("idLab", pIdLab)
        .execute()
    )
    return response

def updateLaboratorio(pIdLab, pIdDptoCar, pIdInterno, pNombre, pUbicacion, pDescripcion):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .update({"idDptoCar": pIdDptoCar,
                 "idInterno": pIdInterno,
                 "nombre": pNombre,
                 "ubicacion": pUbicacion,
                 "descripcion": pDescripcion})
        .eq("idLab", pIdLab)
        .execute()
    )
    return response

def deleteLaboratorio(pIdLab):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .delete()
        .eq("idLab", pIdLab)
        .execute()
    )
    return response


