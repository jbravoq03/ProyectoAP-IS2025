import { usuario } from "@/model/usuarios";
const API_URL = "http://localhost:5000/usuarios";

// Comprobación de estado
export const checkStatusUsuarios = async (): Promise<string> => {
  const res = await fetch(`${API_URL}/status`);
  return res.text();
};

// Crear usuario
export const createUsuario = async (usr: usuario): Promise<any> => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usr),
  });
  return res.json();
};

// Leer todos los usuarios
export const readUsuarios = async (): Promise<usuario[]> => {
  const res = await fetch(`${API_URL}/read`);
  const data = await res.json();
  return data.data;
};

// Leer un usuario por id
export const readUsuario = async (idUsr: string): Promise<usuario> => {
  const res = await fetch(`${API_URL}/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idUsr }),
  });
  const data = await res.json();
  return data.data;
};

// Actualizar usuario
export const updateUsuario = async (usr: usuario): Promise<any> => {
  const res = await fetch(`${API_URL}/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usr),
  });
  return res.json();
};

// Eliminar usuario
export const deleteUsuario = async (idUsr: string): Promise<any> => {
  const res = await fetch(`${API_URL}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idUsr }),
  });
  return res.json();
};

// Login de usuario
export const loginUsuario = async (
  correoInsti: string,
  contrasena: string
): Promise<any> => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correoInsti, contrasena }),
  });
  return res.json();
};