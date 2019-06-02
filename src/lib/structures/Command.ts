import { Message } from 'discord.js';
import { InlustrisClient } from '../Client';
import { CommandOptions } from '../interfaces/CommandOptions';
import { Base } from './Base';

/**
 * Command class for creating commands.
 * @extends {Base}
 */
export abstract class Command extends Base {
    public options: CommandOptions;

    public aliases: string[];

    public constructor(client: InlustrisClient, registry, options: CommandOptions) {
        super(client, registry, options);
        
        /**
         * The aliases of the command
         * @type {string[]}
         */
        this.aliases = options.aliases || [];

        if (typeof this.args !== 'function') throw new TypeError(`The args method has been incorrectly overwritten, it must be a generator function. (got type ${typeof this.args})`);
    }

    /**
     * The run method for the command.
     * @param {external:Message} message The message that triggered the command
     * @abstract
     */
    public abstract run(message: Message): any;

    /**
     * Abstract argument generator, needs to be used if arguments are needed with commands.
     * @abstract
     */
    public *args(): IterableIterator<any> {
        // Optional argument generator, if commands want arguments, they need to use generators.
    }
}

/**
 * @external Message
 * @see {@link https://discord.js.org/#/docs/main/master/class/Message}
 */
