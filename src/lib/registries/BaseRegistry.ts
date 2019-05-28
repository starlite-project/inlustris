import { Collection } from 'discord.js';
import { Base } from '../structures/Base';
import { InlustrisClient } from '../Client';
import { join } from 'path';

/**
 * The base registry for all stores to extend.
 * @extends {external:Collection}
 * @abstract
 */
export abstract class BaseRegistry<V extends Base, VConstructor = typeof Base> extends Collection<string, V> {
    public readonly holds: VConstructor;
    public readonly client: InlustrisClient;
    public readonly name: string;
    public constructor(client: InlustrisClient, name: string, holds: VConstructor) {
        super();

        /**
         * The client that this Registry is for
         * @type {InlustrisClient}
         * @name BaseRegistry#holds
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * The name of the Registry
         * @name BaseRegistry#name
         * @type {string}
         * @readonly
         */
        Object.defineProperty(this, 'name', { value: name });

        /**
         * What this Registry holds
         * @name BaseRegistry#holds
         * @type {Base}
         * @readonly
         */
        Object.defineProperty(this, 'holds', { value: holds });
    }

    /**
     * The directory where the bases are found
     * @type {string}
     */
    public get userDirectory(): string {
        return join(this.client.userBaseDirectory, this.name);
    }

    public static get [Symbol.species](): typeof Collection {
        return Collection;
    }
}