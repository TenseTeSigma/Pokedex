import { commandExit } from "./command_exit";
import { commandHelp } from "./command_help";
import type { CLICommand } from "./command";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
        name: "help",
        description: "Prints a help message to the console",
        callback: commandHelp
        }
  };
}