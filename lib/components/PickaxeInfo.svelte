<script lang="ts">
    import type Pickaxe from "$lib/classes/pickaxe/pickaxe";
import StatName from "./ui/StatName.svelte";

    export let pickaxe: Pickaxe;
</script>

<div class="flex flex-col">
    <p class="font-semibold">{pickaxe.name}</p>
    <div class="flex justify-between">
        <p><StatName color="text-orange-500">pow</StatName> {pickaxe.pow}</p>
        <p><StatName color="text-sky-500">q</StatName> {pickaxe.quality}</p>
    </div>
    <p><StatName color="text-red-500">BaseDMG</StatName> {pickaxe.baseDamage}</p>
</div>