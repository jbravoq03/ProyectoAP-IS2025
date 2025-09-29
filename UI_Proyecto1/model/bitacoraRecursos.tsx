export type bitacoraRec = {
  idBitac: Number;
  idRecurso: Number;
  idUsuario: Number;
  accion: string;
  fecha: Date;
  descripcion: string;
};

export const bitacRecursos: bitacoraRec[] = [
  {
    idBitac: 1,
    idRecurso: 1,
    idUsuario: 1,
    accion: "Limpieza general",
    fecha: new Date("2025-01-01"),
    descripcion: "No hubo problemas",
  },
  {
    idBitac: 2,
    idRecurso: 2,
    idUsuario: 1,
    accion: "Cambio de tinta",
    fecha: new Date("2025-01-01"),
    descripcion: "No hubo problemas",
  },
  {
    idBitac: 3,
    idRecurso: 3,
    idUsuario: 1,
    accion: "Limpieza",
    fecha: new Date("2025-01-01"),
    descripcion: "No hubo problemas",
  },
];