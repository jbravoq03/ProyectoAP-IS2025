import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Material"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createMaterial(pIdRec, pCantidad, pMedida, pReorden):

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

def readMaterial():

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .execute()
    )
    return response

def readOneMaterial(pIdMat):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .eq("idMat", pIdMat)
        .execute()
    )
    return response

def updateMaterial(pIdMat, pIdRec, pCantidad, pMedida, pReorden):

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

def deleteMaterial(pIdMat):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .delete()
        .eq("idMat", pIdMat)
        .execute()
    )
    return response


