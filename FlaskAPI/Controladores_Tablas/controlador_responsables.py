import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Responsables"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createResponsables(pIdUsr, pIdLab, pCargo):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"idUsr": pIdUsr,
                     "idLab": pIdLab,
                     "cargo": pCargo})
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readResponsables():
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

def readOneResponsables(pIdResp):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idUsr", pIdResp)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateResponsables(pIdResp, pIdUsr, pIdLab, pCargo):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"idUsr": pIdUsr,
                     "idLab": pIdLab,
                     "cargo": pCargo})
            .eq("idResp", pIdResp)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteResponsables(pIdResp):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idResp", pIdResp)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501