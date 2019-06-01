"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const InlustrisError_1 = require("../util/InlustrisError");
const List_1 = require("../util/List");
/**
 * The cache manager for the client.
 * Only applied if `settings`, `internals`, or `defaults` is a loaded plugin.
 */
class ClientCacheManager {
    /** @param {InlustrisClient} client */
    constructor(client) {
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
        this._cache = new discord_js_1.Collection();
        /**
         * The keys of the cache
         * @type {List<string>}
         * @private
         */
        this._keys = new List_1.List();
    }
    /**
     * The cache that is managed
     * @type {Collection<string, any>}
     * @readonly
     */
    get cache() {
        return new discord_js_1.Collection(this._cache.entries());
    }
    /**
     * An iterable keys object.
     * @generator
     * @yields {string}
     */
    *keys() {
        yield* this._keys.values();
    }
    /**
     * An iterable values object.
     * @generator
     * @yields {any}
     */
    *values() {
        yield* this.cache.values();
    }
    /**
     * Sets a key and value.
     * @param {string} key A key to be added
     * @param {any} val A value to be added
     * @returns {ClientCacheManager}
     */
    set(key, val) {
        if (typeof key !== 'string')
            throw new InlustrisError_1.InlustrisError('INCORRECT_INPUT_TYPE', typeof key, 'string');
        this._cache.set(key, val);
        this._keys.add(key);
        return this;
    }
    /**
     * Whether a key is located in the cache.
     * @param {string} key The key to check for
     * @returns {boolean}
     */
    has(key) {
        return this._cache.has(key) || this._keys.has(key);
    }
    /**
     * Gets a value, and sets the default if the value isn't found.
     * @param {string} key The key to get
     * @param {any} [defaultVal] The default value to set
     * @returns {any}
     */
    get(key, defaultVal) {
        if (!this.has(key))
            this.set(key, defaultVal);
        return this._cache.get(key);
    }
    /**
     * Deletes a key from the settings.
     * @param {string} key The key to delete
     * @param {boolean} [preserve=true] Whether to preserve the key in the keys list
     * @returns {boolean}
     */
    delete(key, preserve = true) {
        if (!preserve)
            this._keys.delete(key);
        return this._cache.delete(key);
    }
    /**
     * Yields the `ClientCacheManager#values` generator.
     * @generator
     * @yields {IterableIterator<any>}
     */
    *[Symbol.iterator]() {
        yield* this.values();
    }
}
exports.ClientCacheManager = ClientCacheManager;
