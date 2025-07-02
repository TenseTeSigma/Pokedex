import type { State } from "./state";
import { PokeAPI } from "./pokeapi";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    try {
        if (args[0] in state.pokedex) {
            const pokemonInfo = await state.pokeAPI.fetchPokemon(args[0]);

            if (pokemonInfo === undefined) {
                console.log(`${args} does not exist. Try again.`)
                return;
            }

            const pokemonName = args[0]
            console.log(`Name: ${pokemonName}`)
            console.log(`Height: ${pokemonInfo?.height}`)
            console.log(`Weight: ${pokemonInfo?.weight}`)
            console.log("Stats:")
            for (const stat of pokemonInfo.stats) {
                console.log(`   - ${stat.stat.name}: ${stat.base_stat}`)
            }
            console.log("Types:")
            for (const type of pokemonInfo.types) {
                console.log(`   - ${type.type.name}`)
            }
        }
        else {
            console.log(`${args} not in pokedex, use --catch ${args}-- to capture the pokemon.`)
        }
    } catch (err) {
    console.log(`Error throw ${err}`)
    }
}