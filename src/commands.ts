import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMapForward, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./inspect_command.js";
import { commandPokedex } from "./command_pokedex.js";
import { commandBattle } from "./command_battle.js";
import { savePokedex } from "./save_pokedex.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Get the next page of locations",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Get the previous page of locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Shows all pokemon in given location",
      callback: commandExplore
    },
    catch: {
      name: "catch",
      description: "Rolls a chance to catch requested pokemon",
      callback: commandCatch
    },
    inspect: {
      name: "inspect",
      description: "Displays the stats of given pokemon",
      callback: commandInspect
    },
    pokedex: {
      name: "pokedex",
      description: "Displays all captured pokemon",
      callback: commandPokedex
    },
    battle: {
      name: "battle",
      description: "battles two given pokemon",
      callback: commandBattle
    },
  };
}
