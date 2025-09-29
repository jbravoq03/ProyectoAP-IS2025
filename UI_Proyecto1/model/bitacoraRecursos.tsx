export type bitacoraRec = {
  idRec: number;
  nombre: string;
  idUsuario: number;
  nombreUsuario: string;
  accion: string;
  fecha: Date;
  descripcion: string;

};

export const bitacRecursos: bitacoraRec[] = [
  {
    idRec: 1,
    nombre: "Laptops",
    idUsuario: 1,
    nombreUsuario: 'U1',
    accion: "Limpieza general",
    fecha: new Date("2025-01-01T00:00:00"),
    descripcion: "No hubo problemas",
  },
  {
    idRec: 2,
    nombre: "Impresoras",
    idUsuario: 1,
    nombreUsuario: 'U1',
    accion: "Cambio de tinta",
    fecha: new Date("2025-01-01T00:00:00"),
    descripcion: "No hubo problemas",
  },
  {
    idRec: 3,
    nombre: "Laboratorio",
    idUsuario: 1,
    nombreUsuario: 'U1',
    accion: "Limpieza",
    fecha: new Date("2025-01-01T00:00:00"),
    descripcion: "No hubo problemas",
  },
  
];