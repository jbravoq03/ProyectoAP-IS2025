export type Solicitud = {
  idSolic: Number;
  idLab: Number;
  idRec: Number;
  idUsr: Number;
  fechaSoli: Date;
  estado: string;
  motivo: string;
  adjunto: string;
  fechaResp?: Date;
};

export const solicitudes: Solicitud[] = [
  {
    idSolic: 1,
    idUsr: 1,
    idRec: 101,
    idLab: 1,
    estado: 'Pendiente',
    motivo: 'Problema con el equipo',
    adjunto: '',
    fechaSoli: new Date("2025-09-22"),
    fechaResp: new Date("2025-09-23"),
  },
  {
    idSolic: 2,
    idUsr: 1,
    idRec: 102,
    idLab: 2,
    estado: 'Completada',
    motivo: 'Necesidad de reactivos para experimentos',
    adjunto: '',
    fechaSoli: new Date("2025-09-23"),
    fechaResp: new Date("2025-09-23"),
  },
  {
    idSolic: 3,
    idUsr: 1,
    idRec: 103,
    idLab: 3,
    estado: 'En proceso',
    motivo: 'Revisión periódica de equipos',
    adjunto: '',
    fechaSoli: new Date("2025-09-23"),
    fechaResp: new Date("2025-09-23"),
  },
];