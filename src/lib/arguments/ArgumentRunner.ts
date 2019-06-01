import { Command } from '../structures/Command';
import { InlustrisClient } from '../Client';
import { List } from '../util/List';
import { Message } from 'discord.js';
import { Flag } from './Flag';

export interface ArgumentRunnerState {
    usedIndices: List<number>;
    phraseIndex: number;
    index: number;
}

export class ArgumentRunner {
    public command: Command;
    public constructor(command: Command) {
        /**
         * The command to run for
         * @type {Command}
         */
        this.command = command;
    }

    public get client(): InlustrisClient {
        return this.command.client;
    }

    public async run(message: Message, parsed: any, generator: GeneratorFunction): Promise<Flag | any> {
        const state: ArgumentRunnerState = {
            usedIndices: new List<number>(),
            phraseIndex:0,
            index:0
        };

        const augmentRes = (val): void => {
            if (Flag.is(val, 'continue')) {
                val.rest = parsed.all.slice(state.index).map((s): string => s.raw).join('');
            }
        };

        const iter = generator(message, parsed, state);
        let curr = await iter.next();
    }
}