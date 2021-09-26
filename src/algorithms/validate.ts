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

export const validate = (sudoku: number[][]) => {
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

const checkUniqueRow = (row: number, sudoku: number[][]) => {
  let visited = 0;
  const values = new Set<number>();
  for (let i = 0; i < sudoku.length; i++) {
    const value = sudoku[row][i];
    if (value) {
      visited++;
      values.add(value);
    }
  }

  return visited === values.size;
};

const checkUniqueColumn = (column: number, sudoku: number[][]) => {
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

const checkUniqueBox = (box: number, sudoku: number[][]) => {
  let visited = 0;
  const [startI, startJ, endI, endJ] = boxPositions[box];
  const values = new Set<number>();
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
