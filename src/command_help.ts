import { getCommands } from "./commands_register";
import type { CLICommand } from "./command";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex\n\n");
    const allCommands = getCommands();
    for (const cmd of Object.values(allCommands)) {
    console.log(`${cmd.name}: ${cmd.description}`)
    }
}