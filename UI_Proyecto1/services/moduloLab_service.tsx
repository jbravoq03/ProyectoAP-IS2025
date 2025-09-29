import { Laboratorio } from "@/model/laboratorios";
import { Material } from "@/model/materiales";
import { PoliticaLab } from "@/model/politicasLab";
import { RecursoFijo } from "@/model/recFijos";
import { Recurso } from "@/model/recursos";
import { Responsable } from "@/model/responsables";

const API_URL = "http://localhost:5000/laboratorios";

// -------------------- STATUS --------------------
export const checkStatusLaboratorios = async (): Promise<string> => {
  const res = await fetch(`${API_URL}/status`);
  return res.text();
};

// -------------------- LABORATORIOS --------------------
export const createLaboratorio = async (lab: Laboratorio) => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lab),
  });
  return res.json();
};

export const readLaboratorios = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/read`);
  return res.json();
};

export const readLaboratorio = async (idLab: string): Promise<any> => {
  const res = await fetch(`${API_URL}/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idLab }),
  });
  return res.json();
};

export const updateLaboratorio = async (lab: Laboratorio) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lab),
  });
  return res.json();
};

export const deleteLaboratorio = async (idLab: string) => {
  const res = await fetch(`${API_URL}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idLab }),
  });
  return res.json();
};

// -------------------- RESPONSABLES --------------------
export const createResponsable = async (resp: Responsable) => {
  const res = await fetch(`${API_URL}/responsables/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resp),
  });
  return res.json();
};

export const readResponsables = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/responsables/read`);
  return res.json();
};

export const readResponsable = async (idResp: string): Promise<any> => {
  const res = await fetch(`${API_URL}/responsables/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idResp }),
  });
  return res.json();
};

export const updateResponsable = async (resp: Responsable) => {
  const res = await fetch(`${API_URL}/responsables/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resp),
  });
  return res.json();
};

export const deleteResponsable = async (idResp: string) => {
  const res = await fetch(`${API_URL}/responsables/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idResp }),
  });
  return res.json();
};

// -------------------- POLITICAS DE LAB --------------------
export const createPoliticaLab = async (pol: PoliticaLab) => {
  const res = await fetch(`${API_URL}/politlab/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pol),
  });
  return res.json();
};

export const readPoliticasLab = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/politlab/read`);
  return res.json();
};

export const readPoliticaLab = async (idPolit: string): Promise<any> => {
  const res = await fetch(`${API_URL}/politlab/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idPolit }),
  });
  return res.json();
};

export const updatePoliticaLab = async (pol: PoliticaLab) => {
  const res = await fetch(`${API_URL}/politlab/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pol),
  });
  return res.json();
};

export const deletePoliticaLab = async (idPolit: string) => {
  const res = await fetch(`${API_URL}/politlab/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idPolit }),
  });
  return res.json();
};

// -------------------- RECURSOS --------------------
export const createRecurso = async (rec: Recurso) => {
  const res = await fetch(`${API_URL}/recursos/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rec),
  });
  return res.json();
};

export const readRecursos = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/recursos/read`);
  return res.json();
};

export const readRecurso = async (idRec: string): Promise<any> => {
  const res = await fetch(`${API_URL}/recursos/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idRec }),
  });
  return res.json();
};

export const updateRecurso = async (rec: Recurso) => {
  const res = await fetch(`${API_URL}/recursos/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rec),
  });
  return res.json();
};

export const deleteRecurso = async (idRec: string) => {
  const res = await fetch(`${API_URL}/recursos/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idRec }),
  });
  return res.json();
};

// -------------------- RECURSOS FIJOS --------------------
export const createRecursoFijo = async (rf: RecursoFijo) => {
  const res = await fetch(`${API_URL}/recfijos/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rf),
  });
  return res.json();
};

export const readRecFijos = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/recfijos/read`);
  return res.json();
};

export const readRecFijo = async (idFijo: string): Promise<any> => {
  const res = await fetch(`${API_URL}/recfijos/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idFijo }),
  });
  return res.json();
};

export const updateRecursoFijo = async (rf: RecursoFijo) => {
  const res = await fetch(`${API_URL}/recfijos/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rf),
  });
  return res.json();
};

export const deleteRecursoFijo = async (idFijo: string) => {
  const res = await fetch(`${API_URL}/recfijos/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idFijo }),
  });
  return res.json();
};

// -------------------- MATERIALES --------------------
export const createMaterial = async (mat: Material) => {
  const res = await fetch(`${API_URL}/materiales/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mat),
  });
  return res.json();
};

export const readMateriales = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/materiales/read`);
  return res.json();
};

export const readMaterial = async (idMat: string): Promise<any> => {
  const res = await fetch(`${API_URL}/materiales/readu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idMat }),
  });
  return res.json();
};

export const updateMaterial = async (mat: Material) => {
  const res = await fetch(`${API_URL}/materiales/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mat),
  });
  return res.json();
};

export const deleteMaterial = async (idMat: string) => {
  const res = await fetch(`${API_URL}/materiales/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idMat }),
  });
  return res.json();
};
