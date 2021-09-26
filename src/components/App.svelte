<script lang="ts">
  import Parameters from './Parameters.svelte';
  import Controls from './Controls.svelte';
  import Display from './Display.svelte';
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<main>
  <h1>Sudoku</h1>
  <Parameters />
  <Display />
  <Controls />
</main>
