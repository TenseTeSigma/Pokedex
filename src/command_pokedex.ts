import type { State } from "./state";
import { readFile } from "fs/promises";

export async function commandPokedex(state: State): Promise<void> {
    try {
        const fileContents = await readFile('pokedex.json', 'utf-8');
        const pokedexNames: string[] = fileContents === "" ? [] : JSON.parse(fileContents);

        // Rebuild state.pokedex as an object using the loaded names
        state.pokedex = {};
        pokedexNames.forEach((name: string) => {
            state.pokedex[name] = true;
        });

        if (pokedexNames.length === 0) {
            console.log("Pokedex is empty!");
            return;
        }

        console.log("Your Pokedex:");
        pokedexNames.forEach((name: string) => {
            console.log(`- ${name}`);
        });
    } catch (err: any) {
        if (err.code === "ENOENT") {
            state.pokedex = {};
            console.log("Pokedex is empty!");
        } else {
            console.log(`Error thrown: ${err}`);
        }
    }
}