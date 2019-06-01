import { Message } from 'discord.js';
import { InlustrisClient } from '../Client';
import { CommandOptions } from '../interfaces/CommandOptions';
import { Base } from './Base';
/**
 * Command class for creating commands.
 * @extends {Base}
 */
export declare abstract class Command extends Base {
    options: CommandOptions;
    aliases: string[];
    constructor(client: InlustrisClient, registry: any, options: CommandOptions);
    /**
     * The run method for the command.
     * @param {external:Message} message The message that triggered the command
     * @abstract
     */
    abstract run(message: Message): any;
    /**
     * Abstract argument generator, needs to be used if arguments are needed with commands.
     * @abstract
     */
    args(): IterableIterator<any>;
}
/**
 * @external Message
 * @see {@link https://discord.js.org/#/docs/main/master/class/Message}
 */ 
