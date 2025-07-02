import type { State } from "./state";

export async function commandPokedex(state: State): Promise<void> {
    const pokedexKeys = Object.keys(state.pokedex);

    if (pokedexKeys.length === 0) {
        console.log(`Pokedex is empty!`);
        return;
    }

    console.log("Your Pokedex:");
    pokedexKeys.forEach((name) => {
        console.log(`- ${name}`);
    });
}
