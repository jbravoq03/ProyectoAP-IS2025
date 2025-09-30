import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "DptoCarrera"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createDptoCarrera(pNombre):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"nombre": pNombre
                     })
            .execute()
        )
        return response

    except Exception as error:
        print(error)
        return 501
def readDptoCarrera():
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
def readOneDptoCarrera(pIdDc):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idDC", pIdDc)
            .execute()
        )
        return response

    except Exception as error:
        print(error)
        return 501
def updateDptoCarrera(pIdDc, pNombre):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"nombre": pNombre
                     })
            .eq("idDC", pIdDc)
            .execute()
        )
        return response

    except Exception as error:
        print(error)
        return 501

def deleteDptoCarrera(pIdDc):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idDC", pIdDc)
            .execute()
        )
        return response

    except Exception as error:
        print(error)
        return 501