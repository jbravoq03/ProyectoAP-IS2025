import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "PoliticasLab"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createPoliticasLab(pIdLab, pReqAcad, pReqSeg, pHorarioAbre, pHorarioCierre, pCapacidadMax):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"idLab": pIdLab,
                     "reqAcad": pReqAcad,
                     "reqSeg": pReqSeg,
                     "horarioAbre": pHorarioAbre,
                     "horarioCierre": pHorarioCierre,
                     "capacidadMax": pCapacidadMax})
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readPoliticasLab():
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

def readOnePoliticasLab(pIdPolit):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idPolit", pIdPolit)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501


def updatePoliticasLab(pIdPolit, pIdLab, pReqAcad, pReqSeg, pHorarioAbre, pHorarioCierre, pCapacidadMax):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"idLab": pIdLab,
                     "reqAcad": pReqAcad,
                     "reqSeg": pReqSeg,
                     "horarioAbre": pHorarioAbre,
                     "horarioCierre": pHorarioCierre,
                     "capacidadMax": pCapacidadMax})
            .eq("idPolit", pIdPolit)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deletePoliticasLab(pIdPolit):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idPolit", pIdPolit)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501