import Decimal from "break_infinity.js";
import ContentGems from "./content/content-gems";
import ContentMineObjects from "./content/content-mineobjects";
import ContentMoney from "./content/content-money";
import Pickaxe from "./pickaxe/pickaxe";

export default class Game{
    money: ContentMoney
    gems: ContentGems
    mineObjects: ContentMineObjects
    pickaxe: Pickaxe
    
    constructor(){
        this.money = new ContentMoney();
        this.gems = new ContentGems();
        this.mineObjects = new ContentMineObjects();
        this.pickaxe = new Pickaxe("Toy Pickaxe", new Decimal(20), new Decimal(1));
    }
}