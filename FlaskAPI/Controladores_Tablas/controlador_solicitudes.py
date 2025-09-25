import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Solicitudes"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createUsuarios(pIdLab, pIdRec, pIdUsr, pFechaSoli, pEstado, pMotivo, pAdjunto, pFechaResp):
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

def readUsuarios():
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

def readOneUsuarios(pIdSolic):
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

def updateUsuarios(pIdSolic, pIdLab, pIdRec, pIdUsr, pFechaSoli, pEstado, pMotivo, pAdjunto, pFechaResp):
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

def deleteUsuarios(pIdSolic):
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