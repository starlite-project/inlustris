"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../structures/Command");
const BaseRegistry_1 = require("./BaseRegistry");
/**
 * The registry for holding and loading commands.
 * @extends {BaseRegistry}
 */
class CommandRegistry extends BaseRegistry_1.BaseRegistry {
    constructor(client) {
        super(client, 'commands', Command_1.Command);
        /**
         * The collection of aliases for the commands
         * @type {Collection<string, Command>}
         */
        this.aliases = new discord_js_1.Collection();
    }
    /**
     * Adds a Command to the registry, and it's aliases.
     * @param {Command} base The command to add
     * @returns {?Command}
     */
    add(base) {
        const command = super.add(base);
        if (!command)
            return null;
        for (const alias of command.aliases)
            this.aliases.set(alias, command);
        return command;
    }
    /**
     * Gets a command by ID or an alias.
     * @param {string} key The command ID or alias
     * @returns {?Command}
     */
    get(key) {
        return super.get(key) || this.aliases.get(key);
    }
    /**
     * Whether or not an ID or alias is in the command registry.
     * @param {string} name The ID or an alias of the command
     * @returns {boolean}
     */
    has(name) {
        return super.has(name) || this.aliases.has(name);
    }
    /**
     * Deletes a command from the registry, and clears it's aliases.
     * @param {string} key The ID or an alias of the command
     * @returns {boolean}
     */
    delete(key) {
        const command = this.get(key);
        if (!command)
            return false;
        for (const alias of command.aliases)
            this.aliases.delete(alias);
        return super.delete(command.id);
    }
    /**
     * Clears the registry and the aliases.
     * @returns {void}
     */
    clear() {
        this.aliases.clear();
        super.clear();
    }
}
exports.CommandRegistry = CommandRegistry;
