import os
from supabase import create_client, Client

SUPABASE_URL = "https://cgarjylyhudogjyphtck.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnYXJqeWx5aHVkb2dqeXBodGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NTU1ODAsImV4cCI6MjA3MzEzMTU4MH0.xMsbehMbPJvy39c2RudhVIkurDFEcagNkr14PkIJsug"

def conectarBD():
    url: str = SUPABASE_URL
    key: str = SUPABASE_KEY
    supabase: Client = create_client(url, key)
    return supabase

if conectarBD():
    print("Esta es la base de datos")
else:
    print("No esta la base de datos")
