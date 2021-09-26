import type {
  DataUpdateCallback,
  AlgorithmGenerator,
  AlgorithmReturnType,
} from '../types';

/**
 * Funkcja wykonująca całość algorytmu na raz
 */
export function executeWhole(
  iterator: AlgorithmGenerator,
  callback: DataUpdateCallback,
) {
  // zmienna do przechowywania aktualnej zawartości tablicy
  let result: IteratorResult<AlgorithmReturnType>;
  // zmienna do przechowywania ostatniej wartości
  let lastValue: AlgorithmReturnType;
  // przechodzimy pętlą tak długo, aż otrzymamy końcowy stan
  do {
    // pobieramy kolejny krok algorytmu
    result = iterator.next();
    if (result.value) {
      lastValue = result.value;
    }
  } while (!result.done);

  // przesyłamy ostateczną tablicę do rysunku
  callback(lastValue);
}
