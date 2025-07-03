import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { stringify } from "querystring";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  pokedex: Record<string, boolean>;
};

export function initState() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex > ",
  });

  return {
    readline: rl,
    commands: getCommands(),
    pokeAPI: new PokeAPI(1),
    nextLocationsURL: "",
    prevLocationsURL: "",
    pokedex: {}
  };
}
