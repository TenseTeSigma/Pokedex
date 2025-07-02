import type { State } from "./state";
import { PokeAPI } from "./pokeapi";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log(`you must provide an area name to the explore command`)
        return;
    };
    const areaName = args[0];
    const areaInfo = await state.pokeAPI.fetchLocation(areaName);
    if (areaInfo === undefined) {
        console.log(`${areaName} does not exist. Try again.`)
        return;
    }
    console.log(`Exploring ${areaName}...`)
    console.log(`Found pokemon:`)
    for (const poke of areaInfo.pokemon_encounters) {
        console.log(`- ${poke.pokemon.name}`)
    }
}