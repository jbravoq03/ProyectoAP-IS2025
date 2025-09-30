import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Etiquetas"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createEtiqueta(pTag):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"tag": pTag})
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readEtiquetas():
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

def readOneEtiqueta(pIdEtiqueta):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idEtiqueta", pIdEtiqueta)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateEtiqueta(pIdEtiqueta, pTag):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"tag": pTag})
            .eq("idEtiqueta", pIdEtiqueta)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteEtiqueta(pIdEtiqueta):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idEtiqueta", pIdEtiqueta)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501