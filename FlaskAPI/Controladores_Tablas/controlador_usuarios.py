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

def readUsuarios():

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .execute()
    )
    return response

def readOneUsuarios(pIdUsr):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .select("*")
        .eq("idUsr", pIdUsr)
        .execute()
    )
    return response

def updateUsuarios(pIdUsr, pIdRol, pIdDc, pIdInsti, pCorreoInsti, pNombre, pTelefono, pContrasena):

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

def deleteUsuarios(pIdUsr):

    supabase = conectarBD()
    response = (
        supabase.table(tabla)
        .delete()
        .eq("idUsr", pIdUsr)
        .execute()
    )
    return response

def iniciarSesion(pCorreo, pContrasena):
    pass