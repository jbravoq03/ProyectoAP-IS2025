import { usuario } from "@/model/usuarios";

const API_URL = "http://10.0.2.2:5000/usuarios";

// -------------------- STATUS --------------------
export const checkStatusUsuarios = async (): Promise<string> => {
  const res = await fetch(`${API_URL}/status`);
  return res.text();
};

// -------------------- CRUD USUARIOS --------------------
export const createUsuario = async (usr: usuario): Promise<any> => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usr),
  });
  return res.json();
};

export const readUsuarios = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/read`);
  return res.json();
};

export const readUsuario = async (idUsr: string): Promise<any> => {
  const res = await fetch(`${API_URL}/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idUsr }),
  });
  return res.json();
};

export const updateUsuario = async (usr: usuario): Promise<any> => {
  const res = await fetch(`${API_URL}/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usr),
  });
  return res.json();
};

export const deleteUsuario = async (idUsr: string): Promise<any> => {
  const res = await fetch(`${API_URL}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idUsr }),
  });
  return res.json();
};

// -------------------- LOGIN --------------------
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