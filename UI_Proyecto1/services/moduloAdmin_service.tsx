import { DptoCarrera } from "@/model/dptocar";
import { ParamGlob } from "@/model/paramGlob";
import { Rol } from "@/model/roles";
import { Etiqueta } from "@/model/etiqueta";

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

// -------------------- ETIQUETAS --------------------
export const createEtiqueta = async (etiqueta: Etiqueta) => {
  const res = await fetch(`${API_URL}/etiqueta/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(etiqueta),
  });
  return res.json();
};

export const readEtiquetas = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/etiqueta/read`);
  return res.json();
};

export const readEtiqueta = async (idEtiqueta: number): Promise<any> => {
  const res = await fetch(`${API_URL}/etiqueta/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idEtiqueta }),
  });
  return res.json();
};

export const updateEtiqueta = async (etiqueta: Etiqueta) => {
  const res = await fetch(`${API_URL}/etiqueta/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(etiqueta),
  });
  return res.json();
};

export const deleteEtiqueta = async (idEtiqueta: number) => {
  const res = await fetch(`${API_URL}/etiqueta/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idEtiqueta }),
  });
  return res.json();
};

// -------------------- MÉTRICAS DASHBOARD --------------------
export const getReservasTotales = async (params: string = ''): Promise<any> => {
  const res = await fetch(`${API_URL}/metricas/reservas_totales?${params}`);
  return res.json();
};

export const getMantenimientosActivos = async (params: string = ''): Promise<any> => {
  const res = await fetch(`${API_URL}/metricas/mantenimientos_activos?${params}`);
  return res.json();
};

export const getRecursosMasUsados = async (params: string = ''): Promise<any> => {
  const res = await fetch(`${API_URL}/metricas/recursos_mas_usados?${params}`);
  return res.json();
};