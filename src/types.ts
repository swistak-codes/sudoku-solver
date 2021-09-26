export type AlgorithmGenerator = Generator<
  AlgorithmReturnType,
  AlgorithmReturnType
>;

export type Algorithm = (
  sudoku: number[][],
  hintsIndexes: Set<string>,
) => AlgorithmGenerator;

export type AlgorithmReturnType = {
  sudoku: number[][];
  iterationsCount: number;
};

export type DataUpdateCallback = (data: AlgorithmReturnType) => void;
