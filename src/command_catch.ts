import type { State } from "./state.js";
import { savePokedex } from "./save_pokedex.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void>{
    if (args[0] in state.pokedex) {
        console.log(`${args[0]} has already been caught!`)
        return;
    }
    console.log(`Throwing a Pokeball at ${args}...`)
    const MAX_BASE_EXP = 400;
    const pokemonInfo = await state.pokeAPI.fetchPokemon(args[0]);
    if (pokemonInfo === undefined) {
        console.log(`${args} does not exist. Try again.`)
        return;
    }
    const catchThreshold = 1 - (pokemonInfo.base_experience / MAX_BASE_EXP)
    const random = Math.random();

    console.log(`Catch chance: ${(catchThreshold * 100).toFixed(2)}%`);
    console.log(`Random roll: ${(random * 100).toFixed(2)}%`);

    if (random < catchThreshold) {
        console.log(`${args} was caught`);
        state.pokedex[args[0]] = true;
        await savePokedex(state)
        
    } else {
        console.log(`${args} escaped!`);
  }
}