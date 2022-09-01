import { generatePickaxe } from "$lib/modules/pickaxe-generator";
import Decimal from "break_infinity.js"
import { get } from "svelte/store";
import game from "$lib/store/gamestore";

/** Pickaxes are used to deal Damage to `MineObject`s. */
export default class Pickaxe{
    name: String
    /** The base Power of the Pickaxe. Will be multiplied by `quality` */
    pow: Decimal
    /** The Quality of the Pickaxe. Acts as a multiplier to `pow` */
    quality: Decimal
    
    constructor(name: String, pow: Decimal, quality: Decimal){
        this.name = name;
        this.pow = pow;
        this.quality = quality;
    }

    /** Return a new generated Pickaxe Instance. */
    static craft(){
        return generatePickaxe(new Decimal(1));
    }

    /** Base Damage calculated by `power * quality`. Does not include Upgrade effects. */
    get baseDamage(){
        return this.pow.mul(this.quality);
    }

    /** Final Damage applied to a `MineObject` for a **single Active Click** */
    get clickDamage(){
        const def = get(game).mineObjects.current?.def ?? new Decimal(0);
        return this.baseDamage.sub(def);
    }

    /** Final Damage applied to a `MineObject` for a **single Idle Click** */
    get idleDamage(){
        const def = get(game).mineObjects.current?.def ?? new Decimal(0);
        return this.baseDamage.sub(def);
    }
}