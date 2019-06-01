import { Collection } from 'discord.js';
import { InlustrisClient } from '../Client';
/**
 * The cache manager for the client.
 * Only applied if `settings`, `internals`, or `defaults` is a loaded plugin.
 */
export declare class ClientCacheManager {
    readonly client: InlustrisClient;
    private _cache;
    private _keys;
    /** @param {InlustrisClient} client */
    constructor(client: InlustrisClient);
    /**
     * The cache that is managed
     * @type {Collection<string, any>}
     * @readonly
     */
    readonly cache: Collection<string, any>;
    /**
     * An iterable keys object.
     * @generator
     * @yields {string}
     */
    keys(): IterableIterator<string>;
    /**
     * An iterable values object.
     * @generator
     * @yields {any}
     */
    values(): IterableIterator<any>;
    /**
     * Sets a key and value.
     * @param {string} key A key to be added
     * @param {any} val A value to be added
     * @returns {ClientCacheManager}
     */
    set(key: string, val: any): this;
    /**
     * Whether a key is located in the cache.
     * @param {string} key The key to check for
     * @returns {boolean}
     */
    has(key: string): boolean;
    /**
     * Gets a value, and sets the default if the value isn't found.
     * @param {string} key The key to get
     * @param {any} [defaultVal] The default value to set
     * @returns {any}
     */
    get(key: string, defaultVal: any): any;
    /**
     * Deletes a key from the settings.
     * @param {string} key The key to delete
     * @param {boolean} [preserve=true] Whether to preserve the key in the keys list
     * @returns {boolean}
     */
    delete(key: string, preserve?: boolean): boolean;
    /**
     * Yields the `ClientCacheManager#values` generator.
     * @generator
     * @yields {IterableIterator<any>}
     */
    [Symbol.iterator](): IterableIterator<any>;
}
