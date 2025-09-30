import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "RecFijo"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createRecFijo(pIdRec, pCodInv, pEstado, pultMante):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"idRec": pIdRec,
                     "codInv": pCodInv,
                     "estado": pEstado,
                     "ultMante": pultMante})
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readRecFijo():
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

def readOneRecFijo(pIdFijo):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idFijo", pIdFijo)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateRecFijo(pIdFijo, pIdRec, pCodInv, pEstado, pultMante):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"idRec": pIdRec,
                     "codInv": pCodInv,
                     "estado": pEstado,
                     "ultMante": pultMante})
            .eq("idFijo", pIdFijo)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteRecFijo(pIdFijo):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idFijo", pIdFijo)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501
