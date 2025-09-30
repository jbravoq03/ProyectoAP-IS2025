import { bitacoraRec } from "./bitacoraRecursos";
import { Material } from "./materiales";
import { RecursoFijo } from "./recFijos";
import { Recurso } from "./recursos";
import { Responsable } from "./responsables";
import { Solicitud } from "./solicitudes";
import { usuario } from "./usuarios";

export let solicitudes: Solicitud[] = [];
export let recursos: Recurso[] = [];
export let usuarios: usuario[] = [];
export let materiales: Material[] = [];
export let bitacoraRecursos: bitacoraRec[] = [];
export let recursosFijos: RecursoFijo[] = [];

export let responsable: Responsable | null = null;

export const getRecfijos = () => recursosFijos;
export const setRecFijos = (nuevaLista: RecursoFijo[]) => {
  recursosFijos = nuevaLista;
};

export const getBitRec = () => bitacoraRecursos;
export const setBitRec = (nuevaLista: bitacoraRec[]) => {
  bitacoraRecursos = nuevaLista;
};

export const getSolicitudes = () => solicitudes;
export const setSolicitudes = (nuevaLista: Solicitud[]) => {
  solicitudes = nuevaLista;
};

export const getRecursos = () => recursos;
export const setRecursos = (nuevaLista: Recurso[]) => {
  recursos = nuevaLista;
};

export const getMateriales = () => materiales;
export const setMateriales = (nuevaLista: Material[]) => {
  materiales = nuevaLista;
};

export const getUsuarios = () => usuarios;
export const setUsuarios = (nuevaLista: usuario[]) => {
  usuarios = nuevaLista;
};

export const getResponsables = () => responsable;
export const setResponsable = (nuevo: Responsable) => {
  responsable = nuevo;
};