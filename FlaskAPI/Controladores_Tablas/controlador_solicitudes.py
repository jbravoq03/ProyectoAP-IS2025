import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# 🔹 Cargar var.env
env_path = Path(__file__).parent / 'var.env'
load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Solicitudes"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createSolicitudes(pIdLab, pIdRec, pIdUsr, pFechaSoli, pEstado, pMotivo, pAdjunto, pFechaResp):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"idLab": pIdLab,
                     "idRec": pIdRec,
                     "idUsr": pIdUsr,
                     "fechaSoli": pFechaSoli,
                     "estado": pEstado,
                     "motivo": pMotivo,
                     "adjunto": pAdjunto,
                     "fechaResp": pFechaResp})
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readSolicitudes():
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

def readOneSolicitudes(pIdSolic):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idSolic", pIdSolic)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateSolicitudes(pIdSolic, pIdLab, pIdRec, pIdUsr, pFechaSoli, pEstado, pMotivo, pAdjunto, pFechaResp):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"idLab": pIdLab,
                     "idRec": pIdRec,
                     "idUsr": pIdUsr,
                     "fechaSoli": pFechaSoli,
                     "estado": pEstado,
                     "motivo": pMotivo,
                     "adjunto": pAdjunto,
                     "fechaResp": pFechaResp})
            .eq("idSolic", pIdSolic)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteSolicitudes(pIdSolic):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idSolic", pIdSolic)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501