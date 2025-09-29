import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="var.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

tabla = "Usuarios"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def createUsuarios(pIdRol, pIdDc, pIdInsti, pCorreoInsti, pNombre, pTelefono, pContrasena):

    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .insert({"idRol": pIdRol,
                     "idDC": pIdDc,
                     "idInsti": pIdInsti,
                     "correoInsti": pCorreoInsti,
                     "nombre": pNombre,
                     "telefono": pTelefono,
                     "contrasena": pContrasena})
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

def readOneUsuarios(pIdUsr):

    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("idUsr", pIdUsr)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def updateUsuarios(pIdUsr, pIdRol, pIdDc, pIdInsti, pCorreoInsti, pNombre, pTelefono, pContrasena):

    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .update({"idRol": pIdRol,
                     "idDC": pIdDc,
                     "idInsti": pIdInsti,
                     "correoInsti": pCorreoInsti,
                     "nombre": pNombre,
                     "telefono": pTelefono,
                     "contrasena": pContrasena})
            .eq("idUsr", pIdUsr)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def deleteUsuarios(pIdUsr):

    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .delete()
            .eq("idUsr", pIdUsr)
            .execute()
        )
        return response
    except Exception as error:
        print(error)
        return 501

def iniciarSesion(pCorreo, pContrasena):
    try:
        supabase = conectarBD()
        response = (
            supabase.table(tabla)
            .select("*")
            .eq("correoInsti", pCorreo)
            .eq("contrasena", pContrasena)
            .execute()
        )
        if response.data and len(response.data) > 0:
            return response
        else:
            return False

    except Exception as error:
        print(error)
        return 501