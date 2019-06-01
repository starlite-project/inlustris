import { Collection } from 'discord.js';
import { InlustrisClient } from '../Client';
import { Command } from '../structures/Command';
import { BaseRegistry } from './BaseRegistry';
/**
 * The registry for holding and loading commands.
 * @extends {BaseRegistry}
 */
export declare class CommandRegistry extends BaseRegistry<Command, typeof Command> {
    aliases: Collection<string, Command>;
    constructor(client: InlustrisClient);
    /**
     * Adds a Command to the registry, and it's aliases.
     * @param {Command} base The command to add
     * @returns {?Command}
     */
    add(base: Command): Command | null;
    /**
     * Gets a command by ID or an alias.
     * @param {string} key The command ID or alias
     * @returns {?Command}
     */
    get(key: string): Command | undefined;
    /**
     * Whether or not an ID or alias is in the command registry.
     * @param {string} name The ID or an alias of the command
     * @returns {boolean}
     */
    has(name: string): boolean;
    /**
     * Deletes a command from the registry, and clears it's aliases.
     * @param {string} key The ID or an alias of the command
     * @returns {boolean}
     */
    delete(key: string): boolean;
    /**
     * Clears the registry and the aliases.
     * @returns {void}
     */
    clear(): void;
}
