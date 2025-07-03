import { State } from "./state";

export async function commandBattle(state: State, ...args: string[]): Promise<void> {
    const poke1 = args[0];
    const poke2 = args[1];

    console.log("batteling... >");

    if (poke1 in state.pokedex) {
        if (poke2 in state.pokedex) {
            const pokemon1Info = await state.pokeAPI.fetchPokemon(poke1);
            const pokemon2Info = await state.pokeAPI.fetchPokemon(poke2);

            if (!pokemon1Info) {
                console.log(`${poke1} does not exist`);
                return;
            }

            if (!pokemon2Info) {
                console.log(`${poke2} does not exist`);
                return;
            }

            for (const stat of pokemon1Info.stats) {
                if (stat.stat.name === "hp") {
                    console.log(`HP: ${stat.base_stat}`);
                }
                if (stat.stat.name === "attack") {
                    console.log(`Attack: ${stat.base_stat}`);
                }
                if (stat.stat.name === "defense") {
                    console.log(`Defense: ${stat.base_stat}`);
                }
            }
            for (const stat of pokemon2Info.stats) {
                if (stat.stat.name === "hp") {
                    console.log(`HP: ${stat.base_stat}`);
                }
                if (stat.stat.name === "attack") {
                    console.log(`Attack: ${stat.base_stat}`);
                }
                if (stat.stat.name === "defense") {
                    console.log(`Defense: ${stat.base_stat}`);
                }
            }
        } else {
            console.log(`${poke2} not in pokedex`);
        }
    } else {
        console.log(`${poke1} not in pokedex`);
    }
}
