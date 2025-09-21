import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "ParametrosLab"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createParametrosGlob(pNombre, pValor, pDescrpcion):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .insert({"nombre": pNombre,
                 "valor": pValor,
                 "descripcion": pDescrpcion})
        .execute()
    )
    return response

def readParametrosGlob():

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .execute()
    )
    return response

def readOneParametrosGlob(pIdParam):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .eq("idParam", pIdParam)
        .execute()
    )
    return response

def updateParametrosGlob(pIdParam, pNombre, pValor, pDescrpcion):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .update({"nombre": pNombre,
                 "valor": pValor,
                 "descripcion": pDescrpcion})
        .eq("idParam", pIdParam)
        .execute()
    )
    return response

def deleteParametrosGlob(pIdParam):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .delete()
        .eq("idParam", pIdParam)
        .execute()
    )
    return response