import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Roles"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createRoles(pNombre):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"nombre": pNombre})
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def readRoles():
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

def readOneRoles(pIdRol):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idRol", pIdRol)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateRoles(pIdRol, pNombre):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"nombre": pNombre})
            .eq("idRol", pIdRol)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteRoles(pIdRol):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idRol", pIdRol)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501