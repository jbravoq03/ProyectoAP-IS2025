export type Solicitud = {
  id: number;
  nombre: string;
  solicitante: string;
  fechasoli: string;
  fechaentreg: string;
  recsolicitado: string;

};

export const solicitudes: Solicitud[] = [
  {
    id: 1,
    nombre: 'Solicitud 1',
    solicitante: 'Juan',
    recsolicitado: 'Reparación de equipo de laboratorio',
    fechasoli: '22/09/25',
    fechaentreg: '23/09/25',
  },
  {
    id: 2,
    nombre: 'Solicitud 2',
    solicitante: 'Juan',
    recsolicitado: 'Compra de reactivos químicos',
    fechasoli: '23/09/25',
    fechaentreg: '23/09/25',
  },
  {
    id: 3,
    nombre: 'Solicitud 3',
    solicitante: 'Juan',
    recsolicitado: 'Mantenimiento preventivo de equipos',
    fechasoli: '23/09/25',
    fechaentreg: '23/09/25',
  },
];