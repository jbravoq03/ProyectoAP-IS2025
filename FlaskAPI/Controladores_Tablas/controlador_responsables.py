import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Responsables"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createResponsables(pIdUsr, pIdLab, pCargo):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .insert({"idUsr": pIdUsr,
                 "idLab": pIdLab,
                 "cargo": pCargo})
        .execute()
    )
    return response

def readResponsables():

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .execute()
    )
    return response

def readOneResponsables(pIdResp):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .eq("idResp", pIdResp)
        .execute()
    )
    return response

def updateResponsables(pIdResp, pIdUsr, pIdLab, pCargo):

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

def deleteResponsables(pIdResp):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .delete()
        .eq("idResp", pIdResp)
        .execute()
    )
    return response