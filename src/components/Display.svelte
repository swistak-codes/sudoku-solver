<script>
  import {
    hintsIndexes,
    isFreshData,
    isValid,
    iterationsCount,
    sudoku,
  } from '../stores';
  import Container from './shared/Container.svelte';
</script>

<style lang="scss">
  $cell-size: 30px;
  $standard-border: 1px solid black;
  $box-border: 3px solid black;

  table {
    margin-top: 16px;
    border-collapse: collapse;
    border-spacing: 0;

    td {
      border: $standard-border;
      width: $cell-size;
      height: $cell-size;

      &:first-of-type {
        border-left: $box-border;
      }

      &:nth-of-type(3n) {
        border-right: $box-border;
      }

      &.hint {
        font-weight: bold;
        color: darken(#ff3e00, 20%);
      }
    }

    tr {
      &:first-of-type {
        td {
          border-top: $box-border;
        }
      }

      &:nth-of-type(3n) {
        border-bottom: $box-border;
      }
    }
  }

  input {
    width: $cell-size/2;
    height: $cell-size;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }

  .invalid {
    color: darken(#ff3e00, 20%);
  }
</style>

<Container>
  <table>
    <tbody>
      {#each $sudoku as row, i}
        <tr>
          {#each row as cell, j}
            <td class:hint="{$hintsIndexes.has(`${i},${j}`)}">
              {#if $isFreshData}
                <input
                  type="number"
                  min="1"
                  max="9"
                  minlength="1"
                  maxlength="1"
                  bind:value="{$sudoku[i][j]}"
                />
              {:else}
                {cell || ''}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</Container>
{#if !$isValid}
  <p class="invalid">Nieprawidłowo wypełnione sudoku!</p>
{/if}
<p>Liczba wykonanych iteracji: {$iterationsCount}</p>
