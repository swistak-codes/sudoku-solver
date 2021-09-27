import { derived, writable } from 'svelte/store';
import { getDefaultSudoku } from './helpers/getSudoku';
import { validateInput } from './algorithms/validate';

export const sudoku = writable<number[][]>(getDefaultSudoku());

export const iterationsCount = writable(0);

export const isIterationFinished = writable(false);
export const isFreshData = writable(true);

export const canExecuteIteration = derived(
  [isIterationFinished],
  ([$isIterationFinished]) => !$isIterationFinished,
);

export const hintsIndexes = writable<Set<string>>(new Set());

export const isValid = derived(
  [sudoku, isFreshData],
  ([$sudoku, $isFreshData]) => ($isFreshData ? validateInput($sudoku) : true),
);
