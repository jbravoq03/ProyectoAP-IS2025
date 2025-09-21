import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Recursos"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createRecursos(pIdLab, pNombre, pImagen, pTipo, pDescripcion, pEstado):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .insert({"idLab": pIdLab,
                 "nombre": pNombre,
                 "imagen": pImagen,
                 "tipo": pTipo,
                 "descripcion": pDescripcion,
                 "estado": pEstado})
        .execute()
    )
    return response

def readRecursos():

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .execute()
    )
    return response

def readOneRecursos(pIdRec):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .eq("idRec", pIdRec)
        .execute()
    )
    return response

def updateRecursos(pIdRecurso, pIdLab, pNombre, pImagen, pTipo, pDescripcion, pEstado):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .update({"idLab": pIdLab,
                 "nombre": pNombre,
                 "imagen": pImagen,
                 "tipo": pTipo,
                 "descripcion": pDescripcion,
                 "estado": pEstado})
        .eq("idRec", pIdRecurso)
        .execute()
    )
    return response

def deleteRecursos(pIdRecurso):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .delete()
        .eq("idRec", pIdRecurso)
        .execute()
    )
    return response