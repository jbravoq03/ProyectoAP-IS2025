import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "ParametrosGlob"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createParametrosGlob(pDuracionMaxima, pAntelacion, pReservasSimultaneas, pIdEtiqueta, pCanalesEnvio, pTiempoNotificar):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({
                "duracionMaxima": pDuracionMaxima,
                "antelacion": pAntelacion,
                "reservasSimultaneas": pReservasSimultaneas,
                "idEtiqueta": pIdEtiqueta,
                "canalesEnvio": pCanalesEnvio,
                "tiempoNotificar": pTiempoNotificar
            })
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readParametrosGlob():
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

def readOneParametrosGlob(pIdParam):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idParam", pIdParam)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateParametrosGlob(pIdParam, pDuracionMaxima, pAntelacion, pReservasSimultaneas, pIdEtiqueta, pCanalesEnvio, pTiempoNotificar):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({
                "duracionMaxima": pDuracionMaxima,
                "antelacion": pAntelacion,
                "reservasSimultaneas": pReservasSimultaneas,
                "idEtiqueta": pIdEtiqueta,
                "canalesEnvio": pCanalesEnvio,
                "tiempoNotificar": pTiempoNotificar
            })
            .eq("idParam", pIdParam)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteParametrosGlob(pIdParam):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idParam", pIdParam)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501