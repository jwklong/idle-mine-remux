<script>
import GameHeader from "$lib/components/GameHeader.svelte";

  import "../app.css";
</script>

<svelte:head>
  <title>Idle Mine: Remux</title>
</svelte:head>

<GameHeader/>

<slot />

<style>
  :global(.btn){
    @apply p-2 rounded-lg font-semibold uppercase bg-blue-400 border-b-8 border-b-blue-800 hover:bg-blue-500 active:bg-blue-600;
  }

  :global(.btn:disabled, .btn-disabled){
    @apply p-2 rounded-lg font-semibold uppercase bg-red-400 border-b-8 border-b-red-800 brightness-75;
  }
</style>