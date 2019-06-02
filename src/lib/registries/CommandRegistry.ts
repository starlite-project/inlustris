import { Collection } from 'discord.js';
import { InlustrisClient } from '../Client';
import { Command } from '../structures/Command';
import { BaseRegistry } from './BaseRegistry';

/**
 * The registry for holding and loading commands.
 * @extends {BaseRegistry}
 */
export class CommandRegistry extends BaseRegistry<Command, typeof Command> {
    public aliases: Collection<string, Command>;
    public constructor(client: InlustrisClient) {
        super(client, 'commands', Command);

        /**
         * The collection of aliases for the commands
         * @type {Collection<string, Command>}
         */
        this.aliases = new Collection<string, Command>();
    }

    /**
     * Adds a Command to the registry, and it's aliases.
     * @param {Command} base The command to add
     * @returns {?Command}
     */
    public add(base: Command): Command | null {
        const command = super.add(base);
        if (!command) return null;
        for (const alias of command.aliases) this.aliases.set(alias, command);
        return command;
    }

    /**
     * Gets a command by ID or an alias.
     * @param {string} key The command ID or alias
     * @returns {?Command}
     */
    public get(key: string): Command | undefined {
        return super.get(key) || this.aliases.get(key);
    }

    /**
     * Whether or not an ID or alias is in the command registry.
     * @param {string} name The ID or an alias of the command
     * @returns {boolean}
     */
    public has(name: string): boolean {
        return super.has(name) || this.aliases.has(name);
    }

    /**
     * Deletes a command from the registry, and clears it's aliases.
     * @param {string} key The ID or an alias of the command
     * @returns {boolean}
     */
    public delete(key: string): boolean {
        const command = this.get(key);
        if (!command) return false;
        for (const alias of command.aliases) this.aliases.delete(alias);
        return super.delete(command.id);
    }

    /**
     * Clears the registry and the aliases.
     * @returns {void}
     */
    public clear(): void {
        this.aliases.clear();
        super.clear();
    }
}
