import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "BitacoraAcciones"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createBitAcciones(pIdUsuario, pAccion, pDescripcion, pFecha):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"idUsuario": pIdUsuario,
                     "accion": pAccion,
                     "descripcion": pDescripcion,
                     "fecha": pFecha
                     })
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readBitAcciones():
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

def readOneBitAcciones(pIdUsuario):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idUsuario", pIdUsuario)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateBitAcciones(pIdBitac, pIdUsuario, pAccion, pDescripcion, pFecha):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"idUsuario": pIdUsuario,
                     "accion": pAccion,
                     "descripcion": pDescripcion,
                     "fecha": pFecha
                     })
            .eq("idBitac", pIdBitac)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteBitAcciones(pIdBitac):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idBitac", pIdBitac)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

