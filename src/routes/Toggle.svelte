<script lang="ts">
  import { slide } from "svelte/transition";

  let shouldShow = $state(false);

  function toggleShouldShow() {
    shouldShow = !shouldShow;
  }
</script>

<button onclick={toggleShouldShow}>Click</button>

{#if shouldShow}
  <div transition:slide={{ duration: 200 }}>Hi</div>
{/if}
