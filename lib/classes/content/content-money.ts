import Decimal from "break_infinity.js"
import { MoneyUpgrade, Upgrade } from "../upgrade/upgrade";

export default class ContentMoney{
    private _amount: Decimal
    private _highestMoney: Decimal
    upgrades: {blacksmith: Upgrade}

    constructor(){
        this._amount = new Decimal(0);
        this._highestMoney = new Decimal(0);
        this.upgrades = {
            blacksmith: new MoneyUpgrade({
                getPrice: level => Decimal.pow(1.2, level).mul(30).add(level * 75),
                getEffect: level => Decimal.pow(1.09, level).mul(20).add(level * 10)
            })
        };
    }

    get highestMoney(){
        return this._highestMoney;
    }

    get amount(){
        return this._amount;
    }

    set amount(amount: Decimal){
        this._amount = amount;
        this._highestMoney = Decimal.max(amount, this._highestMoney);
    }
}