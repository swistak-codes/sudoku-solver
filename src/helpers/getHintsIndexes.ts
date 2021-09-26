export const getHintsIndexes = (sudoku: number[][], resultSet: Set<string>) => {
  resultSet.clear();
  for (let j = 0; j < sudoku.length; j++) {
    for (let i = 0; i < sudoku[j].length; i++) {
      if (sudoku[j][i] != null) {
        resultSet.add(`${j},${i}`);
      }
    }
  }
};
