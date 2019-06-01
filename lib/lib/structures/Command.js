"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
/**
 * Command class for creating commands.
 * @extends {Base}
 */
class Command extends Base_1.Base {
    constructor(client, registry, options) {
        super(client, registry, options);
        /**
         * The aliases of the command
         * @type {string[]}
         */
        this.aliases = options.aliases || [];
        if (typeof this.args !== 'function')
            throw new TypeError(`The args method has been incorrectly overwritten, it must be a generator function. (got type ${typeof this.args})`);
    }
    /**
     * Abstract argument generator, needs to be used if arguments are needed with commands.
     * @abstract
     */
    *args() {
        // Optional argument generator, if commands want arguments, they need to use generators.
    }
}
exports.Command = Command;
/**
 * @external Message
 * @see {@link https://discord.js.org/#/docs/main/master/class/Message}
 */ 
