<script lang="ts">
    import type { Upgrade } from "$lib/classes/upgrade/upgrade";
    import Decimal from "break_infinity.js";

    import Button from "../ui/Button.svelte";

    export let upgrade: Upgrade|null = null;
    export let icon: string = "favicon.png";

    let screenWidth = 0;

    $: iconPath = `images/upgrades/${icon}`;
    $: price = upgrade?.price ?? new Decimal(0);
    $: isCompact = screenWidth > 1024;
    $: canBuy = upgrade?.canBuy;
</script>

<svelte:window bind:innerWidth={screenWidth}></svelte:window>

{#if isCompact}
    <button on:click={() => upgrade?.buy()} class="relative btn cursor-pointer group" disabled={!canBuy}>
        <img class="w-14 h-14" alt="UPG" src={iconPath}/>
        <span class="absolute right-1 bottom-0 font-bold text-lg z-10">{upgrade?.level}</span>
        <!-- Tooltip -->
        <div class="w-48 absolute top-full translate-y-4 scale-0 p-2 group-hover:scale-100 bg-black rounded-md transition-all z-10">
            <p class="font-semibold uppercase text-lg"><slot name="title">Title</slot></p>
            <p class="normal-case"><slot name="description">Description</slot></p>
            <p class="text-center text-lg"><slot name="resource">$</slot> <span class="font-mono">{price}</span></p>
        </div>
    </button>
{:else}
    <div class="upgrade-base upgrade-sm group">
        <img class="w-14 h-14" alt="UPG" src={iconPath}/>
        <div class="flex flex-col flex-grow">
            <p class="font-semibold uppercase text-lg"><slot name="title">Title</slot> Lv. {upgrade?.level}</p>
            <p><slot name="description">Description</slot></p>
        </div>
        <div class="m-1 w-full">
            <Button disabled={!canBuy} full={true} on:click={() => upgrade?.buy()}><slot name="resource">$</slot> {price}</Button>
        </div>
    </div>
{/if}

<style>
    .upgrade-base{
        @apply relative flex justify-between items-center flex-wrap p-2 rounded-md;
    }

    .upgrade-lg{
        @apply w-16 cursor-pointer;
    }

    .upgrade-sm{
        @apply w-72 cursor-pointer bg-gradient-to-br from-slate-600 to-slate-800;
    }
</style>