<style lang='scss'>
  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    > :global(*) {
      margin: 0 0.5em;
    }
  }
</style>

<div class="container">
  <slot />
</div>
