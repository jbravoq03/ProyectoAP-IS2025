import { BitAccion } from "@/model/bitacAcciones";
import { bitacoraRec } from "@/model/bitacoraRecursos";
import { Solicitud } from "@/model/solicitudes";

const API_URL = "http://localhost:5000/tecnicencar";

// -------------------- STATUS --------------------
export const checkStatusTecnicEncar = async (): Promise<string> => {
  const res = await fetch(`${API_URL}/status`);
  return res.text();
};

// -------------------- SOLICITUDES --------------------
export const createSolicitud = async (sol: Solicitud) => {
  const res = await fetch(`${API_URL}/solicitudes/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sol),
  });
  return res.json();
};

export const readSolicitudes = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/solicitudes/read`);
  return res.json();
};

export const readSolicitud = async (idSolic: string): Promise<any> => {
  const res = await fetch(`${API_URL}/solicitudes/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idSolic }),
  });
  return res.json();
};

export const updateSolicitud = async (sol: Solicitud) => {
  const res = await fetch(`${API_URL}/solicitudes/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sol),
  });
  return res.json();
};

export const deleteSolicitud = async (idSolic: string) => {
  const res = await fetch(`${API_URL}/solicitudes/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idSolic }),
  });
  return res.json();
};

// -------------------- BITACORA ACCIONES --------------------
export const createBitAccion = async (bit: BitAccion) => {
  const res = await fetch(`${API_URL}/bitacacciones/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bit),
  });
  return res.json();
};

export const readBitAcciones = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/bitacacciones/read`);
  return res.json();
};

// -------------------- BITACORA RECURSOS --------------------
export const createBitRecurso = async (bit: bitacoraRec) => {
  const res = await fetch(`${API_URL}/bitacrecursos/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bit),
  });
  return res.json();
};

export const readBitRecursos = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/bitacrecursos/read`);
  return res.json();
};