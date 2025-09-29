export type Material = {
  idMat: Number;
  idRec: Number;
  cantidad: string;
  medida: string;
  reorden: boolean;
};

export const materiales: Material[] = [
  {
    idMat: 1,
    idRec: 1,
    cantidad: "100",
    medida: 'Cajas',
    reorden: false,
  },
  {
    idMat: 2,
    idRec: 2,
    cantidad: "12",
    medida: 'Botellas',
    reorden: true,
  },
  {
    idMat: 3,
    idRec: 3,
    cantidad: "20",
    medida: 'Disponible',
    reorden: false,
  },
  
];