import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "BitacoraRecursos"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createBitRecursos(pIdRecurso, pIdUsuario, pAccion, pFecha, pDescripcion):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .insert({"idRecurso": pIdRecurso,
                 "idUsuario": pIdUsuario,
                 "accion": pAccion,
                 "fecha": pFecha,
                 "descripcion": pDescripcion
                 })
        .execute()
    )
    return response

def readBitRecursos():

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .execute()
    )
    return response

def readOneBitRecursos(pIdRecurso):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .eq("idRecurso", pIdRecurso)
        .execute()
    )
    return response

def updateBitRecursos(pIdBitac, pIdRecurso, pIdUsuario, pAccion, pFecha, pDescripcion):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .update({"idRecurso": pIdUsuario,
                 "idUsuario": pIdUsuario,
                 "accion": pAccion,
                 "fecha": pFecha,
                 "descripcion": pDescripcion
                 })
        .eq("idBitac", pIdBitac)
        .execute()
    )
    return response

def deleteBitRecursos(pIdBitac):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .delete()
        .eq("idBitac", pIdBitac)
        .execute()
    )
    return response
