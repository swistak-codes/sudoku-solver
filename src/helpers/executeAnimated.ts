import type {
  AlgorithmGenerator,
  DataUpdateCallback,
  AlgorithmReturnType,
} from '../types';

let forceStop = false;

/**
 * Funkcja wykonująca algorytm krok po kroku generując animację
 */
export async function executeAnimated(
  iterator: AlgorithmGenerator,
  delay = 17,
  callback: DataUpdateCallback,
) {
  // zmienna do przechowywania aktualnej zawartości tablicy
  let result: IteratorResult<AlgorithmReturnType>;
  // restartujemy zmienną zatrzymującą animację
  forceStop = false;
  // przechodzimy pętlą tak długo, aż otrzymamy końcowy stan
  do {
    // pobieramy kolejny krok algorytmu
    result = iterator.next();
    if (result.value) {
      // przesyłamy aktualną tablicę do wykresu
      callback(result.value);
    }
    // czekamy wskazaną wartość opóźnienia
    await new Promise<void>((resolve) => setTimeout(() => resolve(), delay));
  } while (!result.done && !forceStop);
}

/**
 * Funkcja przerywająca animację
 */
export function stopAnimation() {
  forceStop = true;
}
