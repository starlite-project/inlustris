"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_nextra_1 = require("fs-nextra");
const path_1 = require("path");
const List_1 = require("../util/List");
const Util_1 = require("../util/Util");
const { isClass } = Util_1.Util;
/**
 * The base registry for all stores to extend.
 * @abstract
 */
class BaseRegistry extends discord_js_1.Collection {
    /**
     * Creates a new BaseRegistry.
     * @param {InlustrisClient} client The client
     * @param {string} name The name of the registry
     * @param {Function} holds The class that the registry will use to create instances
     */
    constructor(client, name, holds) {
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
        /**
         * The core directories where bases are located
         * @name BaseRegistry#coreDirectories
         * @type {List<string>}
         * @readonly
         * @private
         */
        Object.defineProperty(this, 'coreDirectories', { value: new List_1.List() });
    }
    /**
     * Registers a core directory.
     * @param {string} directory The directory to register
     * @returns {this}
     */
    registerCoreDirectory(directory) {
        this.coreDirectories.add(directory + this.name);
        return this;
    }
    /**
     * The directory where the bases are found
     * @type {string}
     */
    get userDirectory() {
        return path_1.join(this.client.userBaseDirectory, this.name);
    }
    /**
     * Loads all the bases found in the core directories.
     * @returns {Promise<number>}
     */
    async loadAll() {
        this.clear();
        for (const directory of this.coreDirectories)
            await BaseRegistry.walk(this, directory);
        await BaseRegistry.walk(this);
        return this.size;
    }
    /**
     * Loads a base into the registry.
     * @param {string} directory The directory of the base
     * @param {string[]} file The file location of the base
     * @returns {?Base}
     */
    load(directory, file) {
        const loc = path_1.join(directory, ...file);
        let base = null;
        try {
            const Base = ((req) => req.default || req)(require(loc));
            if (!isClass(Base))
                throw new TypeError('The exported structure is not a class.');
            base = this.add(new Base(this.client, this));
        }
        catch (err) {
            if (this.client.listenerCount('error'))
                this.client.emit('error', `Failed to load file ${loc}. Error:\n${err.stack || err}`);
            else
                throw err;
        }
        delete require.cache[loc];
        module.children.pop();
        return base;
    }
    /**
     * Adds a base to the registry.
     * @param {Base} base The base to be added
     * @returns {Base}
     */
    add(base) {
        // @ts-ignore
        if (!(base instanceof this.holds))
            throw new TypeError(`Only ${this} may be stored in this store`);
        const existing = this.get(base.id);
        if (existing)
            this.delete(existing.id);
        else if (this.client.listenerCount('baseLoaded'))
            this.client.emit('baseLoaded', base);
        this.set(base.id, base);
        return base;
    }
    /**
     * Walks through a directory and loads all the bases into the provided registry
     * @param {BaseRegistry} registry The registry to load files in
     * @param {string} [directory=registry.userDirectory] The directory to load files from
     * @returns {Promise<Base[]>}
     * @private
     */
    static async walk(registry, directory = registry.userDirectory) {
        const files = await fs_nextra_1.scan(directory, { filter: (stats, path) => stats.isFile() && path_1.extname(path) === '.js' })
            .catch(() => { fs_nextra_1.ensureDir(directory); });
        if (!files)
            return true;
        return Promise.all([...files.keys()].map((file) => registry.load(directory, path_1.relative(directory, file).split(path_1.sep))));
    }
    /** @private */
    static get [Symbol.species]() {
        return discord_js_1.Collection;
    }
}
exports.BaseRegistry = BaseRegistry;
