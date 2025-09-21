import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "DptoCarrera"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createDptoCarrera(pNombre):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .insert({"nombre": pNombre
                 })
        .execute()
    )
    return response

def readDptoCarrera():

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .execute()
    )
    return response

def readOneDptoCarrera(pIdDc):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .eq("idDC", pIdDc)
        .execute()
    )
    return response

def updateDptoCarrera(pIdDc, pNombre):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .update({"nombre": pNombre
                 })
        .eq("idDC", pIdDc)
        .execute()
    )
    return response

def deleteDptoCarrera(pIdDc):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .delete()
        .eq("idDC", pIdDc)
        .execute()
    )
    return response