<script lang="ts">
import game from "$lib/store/gamestore";
import type Pickaxe from "$lib/classes/pickaxe/pickaxe";
import { generatePickaxe } from "$lib/modules/pickaxe-generator";
import Decimal from "break_infinity.js";

import Button from "./ui/Button.svelte";

$: gems = new Decimal(1);
$: canCraft = $game.gems.amount.gte(gems);

function craft(){
    if(!canCraft){
        console.log("Not enough Gems!");
        return;
    }

    const pick: Pickaxe = generatePickaxe(gems);
    if(pick.baseDamage.gt($game.pickaxe.baseDamage)){
        $game.pickaxe = pick;
        console.log(`Got a new Pickaxe! P: ${pick.pow} Q: ${pick.quality}`);
    }
    else{
        console.log(`Sorry, I crafted a dud! P: ${pick.pow} Q: ${pick.quality}`);
    }
    $game.gems.amount = $game.gems.amount.sub(gems);
}
</script>

<div class="w-72 flex justify-evenly">
    <Button>←</Button>
    <Button on:click={craft}>
        Craft a new Pickaxe<br/>
        {gems}
    </Button>
    <Button>→</Button>
</div>