<style lang='scss'>
  .item {
    display: flex;
    flex-direction: column;

    > :global(label) {
      display: block;
    }

    > :global(input) {
      display: block;
      width: 75px;
      margin: auto;
    }
  }
</style>

<div class="item">
  <slot />
</div>
