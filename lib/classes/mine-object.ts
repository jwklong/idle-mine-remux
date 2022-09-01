// @ts-ignore
import Decimal from "break_infinity.js"
import game from "$lib/store/gamestore"

export default class MineObject{
    name: String
    hp: Decimal
    maxHp: Decimal
    def: Decimal
    value: Decimal

    constructor(name: String, hp: Decimal|number|string, def: Decimal|number|string, value: Decimal|number|string){
        this.name = name;
        this.hp = new Decimal(hp);
        this.maxHp = new Decimal(this.hp);
        this.def = new Decimal(def);
        this.value = new Decimal(value);
    }

    static clone(from: MineObject){
        return new MineObject(from.name, from.hp, from.def, from.value);
    }

    damage(dmg: Decimal){
        this.hp = this.hp.sub(dmg);
        if(this.hp.lte(0)){
            this.hp = this.maxHp;
            this.onDestroy();
        }
    }
    
    onDestroy(){
        game.update(g => {
            g.money.amount = g.money.amount.add(this.value);
            if(g.mineObjects.currentId == g.mineObjects.highestId){
                g.mineObjects.highestId++;
            }
            return g;
        });
    }
}