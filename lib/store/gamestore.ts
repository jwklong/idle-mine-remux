import { writable } from "svelte/store";
import Game from "../classes/game";

export default writable(new Game());