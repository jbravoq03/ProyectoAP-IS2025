import { DptoCarrera } from "@/model/dptocar";
import { ParamGlob } from "@/model/paramGlob";
import { Rol } from "@/model/roles";

const API_URL = "http://localhost:5000/administradores";

// -------------------- STATUS --------------------
export const checkStatusAdministradores = async (): Promise<string> => {
  const res = await fetch(`${API_URL}/status`);
  return res.text();
};

// -------------------- ROLES --------------------
export const createRol = async (rol: Rol) => {
  const res = await fetch(`${API_URL}/rol/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rol),
  });
  return res.json();
};

export const readRoles = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/rol/read`);
  return res.json();
};

export const readRol = async (idRol: string): Promise<any> => {
  const res = await fetch(`${API_URL}/rol/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idRol }),
  });
  return res.json();
};

export const updateRol = async (rol: Rol) => {
  const res = await fetch(`${API_URL}/rol/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rol),
  });
  return res.json();
};

export const deleteRol = async (idRol: string) => {
  const res = await fetch(`${API_URL}/rol/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idRol }),
  });
  return res.json();
};

// -------------------- DEPARTAMENTOS/CARRERAS --------------------
export const createDptoCarrera = async (dpto: DptoCarrera) => {
  const res = await fetch(`${API_URL}/dptocar/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dpto),
  });
  return res.json();
};

export const readDptoCarreras = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/dptocar/read`);
  return res.json();
};

export const readDptoCarrera = async (idDc: string): Promise<any> => {
  const res = await fetch(`${API_URL}/dptocar/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idDc }),
  });
  return res.json();
};

export const updateDptoCarrera = async (dpto: DptoCarrera) => {
  const res = await fetch(`${API_URL}/dptocar/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dpto),
  });
  return res.json();
};

export const deleteDptoCarrera = async (idDc: string) => {
  const res = await fetch(`${API_URL}/dptocar/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idDc }),
  });
  return res.json();
};

// -------------------- PARAMETROS GLOBALES --------------------
export const createParamGlob = async (param: ParamGlob) => {
  const res = await fetch(`${API_URL}/paramglob/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param),
  });
  return res.json();
};

export const readParamGlobs = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/paramglob/read`);
  return res.json();
};

export const updateParamGlob = async (param: ParamGlob) => {
  const res = await fetch(`${API_URL}/paramglob/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param),
  });
  return res.json();
};

export const deleteParamGlob = async (idParam: string) => {
  const res = await fetch(`${API_URL}/paramglob/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idParam }),
  });
  return res.json();
};
