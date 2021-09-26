<script lang="ts">
  import Container from './shared/Container.svelte';
  import {
    isFreshData,
    isIterationFinished,
    iterationsCount,
    sudoku,
  } from '../stores';
  import Button from './shared/Button.svelte';
  import { getDefaultSudoku, getEmptySudoku } from '../helpers/getSudoku';

  const restart = () => {
    $isIterationFinished = false;
    $isFreshData = true;
    $sudoku = getDefaultSudoku();
    $iterationsCount = 0;
  };

  const clear = () => {
    $isIterationFinished = false;
    $isFreshData = true;
    $sudoku = getEmptySudoku();
    $iterationsCount = 0;
  };
</script>

<Container>
  <Button on:click="{restart}">Restart</Button>
  <Button on:click="{clear}">Wyczyść</Button>
</Container>
