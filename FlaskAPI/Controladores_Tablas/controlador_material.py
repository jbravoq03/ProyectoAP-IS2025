import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Material"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createMaterial(pIdRec, pCantidad, pMedida, pReorden):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"idRec": pIdRec,
                     "cantidad": pCantidad,
                     "medida": pMedida,
                     "reorden": pReorden})
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readMaterial():
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

def readOneMaterial(pIdMat):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idMat", pIdMat)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateMaterial(pIdMat, pIdRec, pCantidad, pMedida, pReorden):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"idRec": pIdRec,
                     "cantidad": pCantidad,
                     "medida": pMedida,
                     "reorden": pReorden})
            .eq("idMat", pIdMat)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteMaterial(pIdMat):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idMat", pIdMat)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501


