// pozycje narożników kwadratów: [lewy-górny-x, lewy-górny-y, prawy-dolny-x, prawy-dolny-y]
const boxPositions = {
  0: [0, 0, 2, 2],
  1: [3, 0, 5, 2],
  2: [6, 0, 8, 2],
  3: [0, 3, 2, 5],
  4: [3, 3, 5, 5],
  5: [6, 3, 8, 5],
  6: [0, 6, 2, 8],
  7: [3, 6, 5, 8],
  8: [6, 6, 8, 8],
};

/**
 * Funkcja sprawdzająca poprawność sudoku (dla backtrackingu)
 * @param sudoku
 */
export const validate = (sudoku: number[][]) => {
  // mamy 9 wierszy, kolumn i kwadratów, więc wystarczy jedna iteracja od 0 do 9
  for (let i = 0; i < 9; i++) {
    if (
      !checkUniqueRow(i, sudoku) ||
      !checkUniqueColumn(i, sudoku) ||
      !checkUniqueBox(i, sudoku)
    ) {
      return false;
    }
  }
  return true;
};

/**
 * Funkcja sprawdzająca poprawność sudoku (dla walidacji)
 * @param sudoku
 */
export const validateInput = (sudoku: number[][]) => {
  return validate(sudoku) && checkValues(sudoku);
};

/**
 * Funkcja sprawdzająca czy w wierszu są same unikalne liczby
 * @param row
 * @param sudoku
 */
const checkUniqueRow = (row: number, sudoku: number[][]) => {
  // funkcja odliczająca ile liczb spisaliśmy
  let visited = 0;
  // tablica haszowana do spisywania liczb
  const values = new Set<number>();
  // iterujemy po kolejnych wartościach
  for (let i = 0; i < sudoku.length; i++) {
    // wartość w aktualnej komórce
    const value = sudoku[row][i];
    if (value) {
      // jeżeli w aktualnej komórce jest wartość, to zwiększamy licznik
      visited++;
      // oraz dodajemy wartość do tablicy haszowanej
      values.add(value);
    }
  }

  // tablica haszowana nie zawiera duplikatów, więc jeśli jest inna wielkość niż w liczniku
  // to oznacza, że nie było unikalnych wartości
  return visited === values.size;
};

/**
 * Funkcja sprawdzająca czy w kolumnie są same unikalne liczby
 * @param column
 * @param sudoku
 */
const checkUniqueColumn = (column: number, sudoku: number[][]) => {
  // działanie jest analogiczne jak w poprzedniej funkcji
  let visited = 0;
  const values = new Set<number>();
  for (let i = 0; i < sudoku.length; i++) {
    const value = sudoku[i][column];
    if (value) {
      visited++;
      values.add(value);
    }
  }

  return visited === values.size;
};

/**
 * Funkcja sprawdzająca czy w kwadracie są same unikalne liczby
 * @param box
 * @param sudoku
 */
const checkUniqueBox = (box: number, sudoku: number[][]) => {
  // znowu działanie jest analogiczne
  let visited = 0;
  // pobieramy współrzędne kwadratu z tablicy
  const [startI, startJ, endI, endJ] = boxPositions[box];
  const values = new Set<number>();
  // tym razem iterujemy po dwóch wymiarach
  for (let i = startI; i <= endI; i++) {
    for (let j = startJ; j <= endJ; j++) {
      const value = sudoku[i][j];
      if (value) {
        visited++;
        values.add(value);
      }
    }
  }

  return visited === values.size;
};

/**
 * Funkcja sprawdzająca, czy są użyte jedynie liczby pomiędzy 1 a 9
 * @param sudoku
 */
const checkValues = (sudoku: number[][]) => {
  // iterujemy po wszystkich wartościach w tablicy
  for (let i = 0; i < sudoku.length; i++) {
    for (let j = 0; j < sudoku[i].length; j++) {
      // ściągamy wartość z komórki
      const value = sudoku[i][j];
      if (
        value != null &&
        (typeof value !== 'number' || value < 1 || value > 9)
      ) {
        // jeśli komórka nie jest pusta, a nie zawiera liczby, albo zawiera liczbę spoza zakresu [1;9]
        // to jest błędny stan
        return false;
      }
    }
  }
  // przeszliśmy wszystkie wartości bez zarzutów, więc zwracamy, że wszystko jest ok
  return true;
};
