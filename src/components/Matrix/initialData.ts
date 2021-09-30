export const listMock = [
  'Guardar sus pertenencias',
  'Lavar la ropa',
  'Doblar y guardar la ropa limpia',
  'Pasar la aspiradora, barrer, quitar el polvo',
  'Poner la mesa',
  'Recoger la mesa',
  'Lavar y guardar los platos',
  'Alimentar, sacar a caminar a las mascotas de la familia; limpiar las jaulas de las aves y limpiar los areneros',
  'Trapear los pisos',
  'Limpiar el lavabo, el inodoro, la tina del baño, la ducha',
  'Preparar sus propias loncheras para la escuela',
  'Jugar de cocinero y preparar la comida una noche a la semana',
  'Hacer el jardín',
  'Lavar el auto familiar',
];

interface Matrix {
  1: string[];
  2: string[];
  3: string[];
  4: string[];
}

export function ramdomizeLists(): Matrix {
  const defaultMatrix = {
    1: [] as string[],
    2: [] as string[],
    3: [] as string[],
    4: [] as string[],
  };
  listMock.forEach(mock => {
    const random = (Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4;
    defaultMatrix[random].push(mock);
  });
  return defaultMatrix;
}
