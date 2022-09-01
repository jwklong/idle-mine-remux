import Decimal from "break_infinity.js";
import game from "$lib/store/gamestore";
import { get } from "svelte/store";

interface UpgradeDefinition{
    name?: string,
    description?: string,
    getPrice: ((level: number) => Decimal),
    getEffect: ((level: number) => Decimal),
    maxLevel?: number
}

export enum UpgradeResource{
    NONE, MONEY
}

export class Upgrade{
    name: String
    description: string
    /** return the `price` for a given `upgrade level` */
    getPrice: ((level: number) => Decimal)
    /** return the `price` for a given `upgrade level` */
    getEffect: ((level: number) => Decimal)

    private _level: number = 0
    maxLevel: number = Infinity
    resource: UpgradeResource = UpgradeResource.NONE

    price: Decimal = new Decimal(0)
    nextLevelPrice: Decimal = new Decimal(0)
    effect: Decimal = new Decimal(0)
    nextLevelEffect: Decimal = new Decimal(0)

    constructor({name, description, getPrice, getEffect, maxLevel}: UpgradeDefinition){
        this.name = name ?? "";
        this.description = description ?? "";
        this.getPrice = getPrice;
        this.getEffect = getEffect;
        this.maxLevel = maxLevel ?? Infinity;

        this.update();
    }

    get level(){
        return this._level;
    }

    set level(level: number){
        this._level = level;
        this.update();
    }

    /** Cache Prices and Effects into class members to save recalculations */
    update(){
        this.price = this.getPrice(this.level);
        this.nextLevelPrice = this.getPrice(this.level + 1);
        this.effect = this.getEffect(this.level);
        this.nextLevelEffect = this.getEffect(this.level + 1);
    }

    private getResourceAmount(){
        return get(game).money.amount;
    }

    private subPriceFromResource(){
        return game.update(game => {
            game.money.amount = game.money.amount.sub(this.price);
            return game;
        });
    }

    /** Does the Player have enough Resources? (Money, Gems, etc.) */
    get canAfford(){
        return this.getResourceAmount().gte(this.price);
    }

    /** Does the Player have enough Resources **and** are all other requirements fulfilled? */
    get canBuy(){
        return this.canAfford && this.level < this.maxLevel;
    }

    /** Synonymous for `effect`, but easier to grasp in context */
    get applied(){
        return this.effect;
    }

    buy(){
        if(this.canBuy){
            this.subPriceFromResource();
            this.level++;
        }
    }
}

export class MoneyUpgrade extends Upgrade{
    constructor(config: UpgradeDefinition){
        super(config);
        this.resource = UpgradeResource.MONEY
    }
}