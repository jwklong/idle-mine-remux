<script lang="ts">
    import game from "$lib/store/gamestore"

    $: money = $game.money.amount;
    $: gems = $game.gems.amount;
</script>

<header class="bg-slate-300 flex justify-evenly font-semibold text-2xl dark:bg-slate-700">
    <span><span class="text-green-500 font-extrabold">$</span> <span class="font-mono">{money}</span></span>
    <span><span class="text-sky-500 font-extrabold">G</span> <span class="font-mono">{gems}</span></span>
</header>