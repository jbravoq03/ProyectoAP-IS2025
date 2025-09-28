export type Material = {
  id: number;
  nombre: string;
  cantidad: number;
  estado: string;
  alerta: boolean;

};

export const materiales: Material[] = [
  {
    id: 1,
    nombre: 'Lapices',
    cantidad: 100,
    estado: '22/09/25',
    alerta: false,
  },
  {
    id: 2,
    nombre: 'Tinta',
    cantidad: 12,
    estado: 'Disponible',
    alerta: true,
  },
  {
    id: 3,
    nombre: 'Papel',
    cantidad: 20,
    estado: 'Disponible',
    alerta: false,
  },
  
];