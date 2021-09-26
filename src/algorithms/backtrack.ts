import type { Algorithm } from '../types';
import { validate } from './validate';

export const backtrack: Algorithm = function* (sudoku, hintsIndexes) {
  // będziemy operować na spłaszczonej tablicy dla ułatwienia cofania
  const result = sudoku.flat();
  // zmienna zliczająca liczbę iteracji
  let counter = 0;
  // przygotowujemy zmienne do kontroli pętli
  let i = 0;
  let isGoingBack = false;
  // iterujemy po wszystkich elementach
  while (i >= 0 && i < result.length) {
    // podnosimy licznik iteracji
    counter++;
    // wydobywamy oryginalny indeks z tablicy 2D
    const originalIndex = get2dIndex(i);
    // sprawdzamy, czy pole nie było wstępnie wypełnione
    if (hintsIndexes.has(`${originalIndex[0]},${originalIndex[1]}`)) {
      // decydujemy, czy się cofamy czy idziemy dalej
      if (!isGoingBack) {
        i++;
      } else {
        i--;
      }
      // przechodzimy do kolejnej iteracji
      continue;
    }
    // jeśli liczba na aktualnej pozycji wynosi 9, cofamy się
    if (result[i] === 9) {
      // resetujemy wartość
      result[i] = null;
      // oznaczamy że cofamy się
      isGoingBack = true;
      // cofamy indeks
      i--;
      // przechodzimy do kolejnej iteracji
      continue;
    }
    // resetujemy oznaczenie, czy cofamy się
    isGoingBack = false;
    // ustawiamy nową wartość aktualnego elementu jako o 1 większą niż poprzednia
    result[i] = (result[i] || 0) + 1;
    // zwracamy częściowy rezultat
    const result2d = flatArrayTo2d(result);
    yield {
      sudoku: result2d,
      iterationsCount: counter,
    };
    // sprawdzamy, czy stan jest prawidłowy
    const isValid = validate(result2d);
    if (isValid) {
      // w przypadku prawidłowego stanu, przeskakujemy na kolejną komórkę
      i++;
    }
  }
  // zwracamy ostateczny rezultat
  return {
    sudoku: flatArrayTo2d(result),
    iterationsCount: counter,
  };
};

const get2dIndex = (index: number) => [Math.floor(index / 9), index % 9];

const flatArrayTo2d = (flatSudoku: number[]) => {
  const result: number[][] = [];
  for (let i = 0; i < flatSudoku.length; i++) {
    const [row, column] = get2dIndex(i);
    if (!result[row]) {
      result[row] = [];
    }
    result[row][column] = flatSudoku[i];
  }
  return result;
};
