import { State } from "./state";
import { writeFile } from "fs/promises";

export async function savePokedex(state: State): Promise<void> {
    try {
        const names = Object.keys(state.pokedex);
        await writeFile('pokedex.json', JSON.stringify(names, null, 2));
    } catch (err) {
        console.log(`Error thrown: ${err}`);
    }
}