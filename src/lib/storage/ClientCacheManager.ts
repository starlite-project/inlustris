import { Collection } from 'discord.js';
import { InlustrisClient } from '../Client';
import { InlustrisError } from '../util/InlustrisError';
import { List } from '../util/List';

/**
 * The cache manager for the client.
 * Only applied if `settings`, `internals`, or `defaults` is a loaded plugin.
 */
export class ClientCacheManager {
    public readonly client: InlustrisClient;
    private _cache: Collection<string, any>;
    private _keys: List<string>;
    /** @param {InlustrisClient} client */
    public constructor(client: InlustrisClient) {
        /**
         * The client
         * @type {InlustrisClient}
         * @name ClientCacheManager#client
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * The cache to pull from
         * **The cache should never be modified manually**
         * @type {Collection<string, any>}
         * @private
         */
        this._cache = new Collection<string, any>();

        /**
         * The keys of the cache
         * @type {List<string>}
         * @private
         */
        this._keys = new List<string>();
    }

    /**
     * The cache that is managed
     * @type {Collection<string, any>}
     * @readonly
     */
    public get cache(): Collection<string, any> {
        return new Collection<string, any>(this._cache.entries());
    }

    /**
     * An iterable keys object.
     * @generator
     * @yields {string}
     */
    public *keys(): IterableIterator<string> {
        yield* this._keys.values();
    }

    /**
     * An iterable values object.
     * @generator
     * @yields {any}
     */
    public *values(): IterableIterator<any> {
        yield* this.cache.values();
    }

    /**
     * Sets a key and value.
     * @param {string} key A key to be added
     * @param {any} val A value to be added
     * @returns {ClientCacheManager}
     */
    public set(key: string, val: any): this {
        if (typeof key !== 'string') throw new InlustrisError('INCORRECT_INPUT_TYPE', typeof key, 'string');
        this._cache.set(key, val);
        this._keys.add(key);
        return this;
    }

    /**
     * Whether a key is located in the cache.
     * @param {string} key The key to check for
     * @returns {boolean}
     */
    public has(key: string): boolean {
        return this._cache.has(key) || this._keys.has(key);
    }

    /**
     * Gets a value, and sets the default if the value isn't found.
     * @param {string} key The key to get
     * @param {any} [defaultVal] The default value to set
     * @returns {any}
     */
    public get(key: string, defaultVal: any): any {
        if (!this.has(key)) this.set(key, defaultVal);
        return this._cache.get(key);
    }

    /**
     * Deletes a key from the settings.
     * @param {string} key The key to delete
     * @param {boolean} [preserve=true] Whether to preserve the key in the keys list
     * @returns {boolean}
     */
    public delete(key: string, preserve: boolean = true): boolean {
        if (!preserve) this._keys.delete(key);
        return this._cache.delete(key);
    }
}