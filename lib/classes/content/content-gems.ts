import Decimal from "break_infinity.js"

export default class ContentGems{
    private _amount: Decimal
    private _highestGems: Decimal
    upgrades: Object

    constructor(){
        this._amount = new Decimal(5);
        this._highestGems = new Decimal(5);
        this.upgrades = {};
    }

    get amount(){
        return this._amount;
    }

    set amount(amount: Decimal){
        this._amount = amount;
        this._highestGems = Decimal.max(amount, this._highestGems);
    }

    get highestGems(){
        return this._highestGems;
    }
}