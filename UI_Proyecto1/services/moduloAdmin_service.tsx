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

// -------------------- GESTIÓN DE USUARIOS --------------------
export const readUsuarios = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/usuarios/read`);
  return res.json();
};

export const updateRolUsuario = async (idUsr: Number, idRol: Number): Promise<any> => {
  const res = await fetch(`${API_URL}/usuarios/update_rol`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idUsr, idRol }),
  });
  return res.json();
};

export const buscarUsuarios = async (nombre: string): Promise<any> => {
  const res = await fetch(`${API_URL}/usuarios/buscar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });
  return res.json();
};

// -------------------- BITÁCORA --------------------
export const readBitacoraAcciones = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/bitacora/read`);
  return res.json();
};

export const buscarBitacora = async (filtros: any = {}): Promise<any> => {
  const params = new URLSearchParams();
  
  if (filtros.usuario && filtros.usuario !== '') {
    params.append('usuario', filtros.usuario);
  }
  
  if (filtros.accion && filtros.accion !== 'Todas') {
    params.append('accion', filtros.accion);
  }
  
  if (filtros.modulo && filtros.modulo !== 'Todos') {
    params.append('modulo', filtros.modulo);
  }
  
  // Filtros de fecha ahora son opcionales individualmente
  if (filtros.a365dias) {
    params.append('365dias', filtros.a365dias);
  }
  
  if (filtros.mes) {
    params.append('mes', filtros.mes);
  }
  
  if (filtros.dia) {
    params.append('dia', filtros.dia);
  }
  
  const queryString = params.toString();
  const url = queryString ? `${API_URL}/bitacora/buscar?${queryString}` : `${API_URL}/bitacora/read`;
  
  const res = await fetch(url);
  return res.json();
};

export const get365DiasDisponiblesBitacora = async (): Promise<any> => {
  try {
    const res = await fetch(`${API_URL}/filtros/a365dias_disponibles_bitacora`);
    return res.json();
  } catch (error) {
    console.error('Error obteniendo 365 días disponibles:', error);
    // Retornar años recientes por defecto
    const currentYear = new Date().getFullYear();
    const a365dias = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      a365dias.push(i);
    }
    return {
      success: false,
      data: a365dias
    };
  }
};

// -------------------- REPORTES INSTITUCIONALES --------------------
export const getReporteUsoGlobal = async (filtros: any = {}): Promise<any> => {
  const params = new URLSearchParams();
  
  if (filtros.tipoRecurso && filtros.tipoRecurso !== 'Todos') {
    params.append('tipo_recurso', filtros.tipoRecurso);
  }
  
  if (filtros.laboratorio && filtros.laboratorio !== 'Todos') {
    params.append('laboratorio', filtros.laboratorio);
  }
  
  if (filtros.a365dias) {
    params.append('365dias', filtros.a365dias);
  }
  
  if (filtros.mes) {
    params.append('mes', filtros.mes);
  }
  
  if (filtros.dia) {
    params.append('dia', filtros.dia);
  }
  
  const queryString = params.toString();
  const res = await fetch(`${API_URL}/reportes/uso_global?${queryString}`);
  return res.json();
};

export const getReporteConsumoMateriales = async (filtros: any = {}): Promise<any> => {
  const params = new URLSearchParams();
  
  if (filtros.tipoRecurso && filtros.tipoRecurso !== 'Todos') {
    params.append('tipo_recurso', filtros.tipoRecurso);
  }
  
  if (filtros.laboratorio && filtros.laboratorio !== 'Todos') {
    params.append('laboratorio', filtros.laboratorio);
  }
  
  if (filtros.a365dias) {
    params.append('365dias', filtros.a365dias);
  }
  
  if (filtros.mes) {
    params.append('mes', filtros.mes);
  }
  
  if (filtros.dia) {
    params.append('dia', filtros.dia);
  }
  
  const queryString = params.toString();
  const res = await fetch(`${API_URL}/reportes/consumo_materiales?${queryString}`);
  return res.json();
};

export const getReporteDesempeno = async (filtros: any = {}): Promise<any> => {
  const params = new URLSearchParams();
  
  if (filtros.laboratorio && filtros.laboratorio !== 'Todos') {
    params.append('laboratorio', filtros.laboratorio);
  }

  if (filtros.a365dias) {
    params.append('365dias', filtros.a365dias);
  }
  
  if (filtros.mes) {
    params.append('mes', filtros.mes);
  }
  
  const queryString = params.toString();
  const res = await fetch(`${API_URL}/reportes/desempeno?${queryString}`);
  return res.json();
};

// -------------------- OPCIONES DE FILTROS PARA REPORTES --------------------
export const getTiposRecursos = async (): Promise<any> => {
  try {
    const res = await fetch(`${API_URL}/filtros/tipos_recursos`);
    return res.json();
  } catch (error) {
    console.error('Error obteniendo tipos de recursos:', error);
    return {
      success: false,
      data: ['Equipo', 'Material', 'Software', 'Herramienta'] // Valores por defecto
    };
  }
};

export const getLaboratorios = async (): Promise<any> => {
  try {
    const res = await fetch(`${API_URL}/filtros/laboratorios`);
    return res.json();
  } catch (error) {
    console.error('Error obteniendo laboratorios:', error);
    return {
      success: false,
      data: ['Lab de Computación', 'Lab de Química', 'Lab de Física', 'Lab de Biología'] // Valores por defecto
    };
  }
};

export const get365DiasDisponibles = async (): Promise<any> => {
  try {
    const res = await fetch(`${API_URL}/filtros/a365dias_disponibles`);
    return res.json();
  } catch (error) {
    console.error('Error obteniendo 365 días disponibles:', error);
    // Retornar años recientes por defecto
    const currentYear = new Date().getFullYear();
    const a365dias = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      a365dias.push(i);
    }
    return {
      success: false,
      data: a365dias
    };
  }
};

// -------------------- CONFIGURACIÓN PARÁMETROS --------------------
export const getConfiguracionParametros = async (): Promise<any> => {
  try {
    const res = await fetch(`${API_URL}/configuracion/read`);
    return res.json();
  } catch (error) {
    console.error('Error obteniendo configuración:', error);
    throw error;
  }
};

export const guardarConfiguracionCompleta = async (configuracion: any) => {
  try {
    const res = await fetch(`${API_URL}/configuracion/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(configuracion),
    });
    return res.json();
  } catch (error) {
    console.error('Error guardando configuración:', error);
    throw error;
  }
};

export const actualizarEtiqueta = async (etiqueta: any) => {
  try {
    if (etiqueta.idEtiqueta && etiqueta.idEtiqueta > 0) {
      return await updateEtiqueta(etiqueta);
    } else {
      return await createEtiqueta(etiqueta);
    }
  } catch (error) {
    console.error('Error actualizando etiqueta:', error);
    throw error;
  }
};