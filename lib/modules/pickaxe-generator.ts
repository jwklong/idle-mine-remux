import Pickaxe from "$lib/classes/pickaxe/pickaxe";
import gamestore from "$lib/store/gamestore";
import Decimal from "break_infinity.js";
import { get } from "svelte/store";

function getBasePower(forGems: Decimal){
    /** +20 % pow per Gem */
    const powMultiplier = new Decimal(0.8).add(forGems.mul(0.2));
    return get(gamestore).money.upgrades.blacksmith.applied.mul(powMultiplier);
}

export function generateName(forQuality: Decimal){
    const qualities: string[] = ["Bad", "Sturdy", "Normal", "Rare", "Epic", "Legendary", "Superb",
    "Cosmic", "Divine", "Ultimate", "Godly", "Demigodly", "Supergodly", "OMEGA"];
    
    let qualityIndex = Math.min(qualities.length - 1, Decimal.log(forQuality, 1.4));
    qualityIndex = Math.floor(qualityIndex + Math.random());
    const qualityName: String = qualities[qualityIndex];

    return `${qualityName} Pickaxe`;
}

export function generatePickaxe(inputGems: Decimal){
    const pow = getBasePower(inputGems).mul(0.5 + 1.5 * Math.random());
    const quality: Decimal = new Decimal(1);

    return new Pickaxe(
        generateName(quality),
        pow,
        quality);
}