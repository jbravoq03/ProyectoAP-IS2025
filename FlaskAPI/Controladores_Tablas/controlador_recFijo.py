import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "RecFijo"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createRecFijo(pIdRec, pCodInv, pEstado, pultMante):

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

def readRecFijo():

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .execute()
    )
    return response

def readOneRecFijo(pIdFijo):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .eq("idFijo", pIdFijo)
        .execute()
    )
    return response

def updateRecFijo(pIdFijo, pIdRec, pCodInv, pEstado, pultMante):

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

def deleteRecFijo(pIdFijo):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .delete()
        .eq("idFijo", pIdFijo)
        .execute()
    )
    return response
