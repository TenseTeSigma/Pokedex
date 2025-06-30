import readline from 'node:readline'
import { getCommands } from './commands_register';

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export function startREPL() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > '
        });

    console.log("Welcome to the Pokedex!")
    
    rl.prompt()

    try {
    rl.on('line', (input: string)=> {
        const vaildCommands = getCommands()
        const cleaned = cleanInput(input);
        if (cleaned[0] in vaildCommands) {
            vaildCommands[cleaned[0]].callback;
        }
        
    });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err)
        }
        else {
            console.log("Unknown Command")
        }
    }
}