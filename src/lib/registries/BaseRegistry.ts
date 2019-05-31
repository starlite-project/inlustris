import { Collection } from 'discord.js';
import { scan, ensureDir } from 'fs-nextra';
import { join, extname, relative, sep } from 'path';
import { InlustrisClient } from '../Client';
import { Base } from '../structures/Base';
import { List } from '../util/List';
import { Util } from '../util/Util';
const { isClass } = Util;

/**
 * The base registry for all stores to extend.
 * @abstract
 */
export abstract class BaseRegistry<V extends Base, VConstructor = typeof Base> extends Collection<string, V> {
    public readonly holds: VConstructor;
    public readonly client: InlustrisClient;
    public readonly name: string;
    private readonly coreDirectories: List<string>;
    /**
     * Creates a new BaseRegistry.
     * @param {InlustrisClient} client The client
     * @param {string} name The name of the registry
     * @param {Function} holds The class that the registry will use to create instances
     */
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

        /**
         * The core directories where bases are located
         * @name BaseRegistry#coreDirectories
         * @type {List<string>}
         * @readonly
         * @private
         */
        Object.defineProperty(this, 'coreDirectories', { value: new List<string>() });
    }

    /**
     * Registers a core directory.
     * @param {string} directory The directory to register
     * @returns {this}
     */
    public registerCoreDirectory(directory: string): this {
        this.coreDirectories.add(directory + this.name);
        return this;
    }

    /**
     * The directory where the bases are found
     * @type {string}
     */
    public get userDirectory(): string {
        return join(this.client.userBaseDirectory, this.name);
    }

    /**
     * Loads all the bases found in the core directories.
     * @returns {Promise<number>}
     */
    public async loadAll(): Promise<number> {
        this.clear();
        for (const directory of this.coreDirectories) await BaseRegistry.walk(this as unknown as BaseRegistry<Base, typeof Base>, directory);
        await BaseRegistry.walk(this as unknown as BaseRegistry<Base, typeof Base>);
        return this.size;
    }

    /**
     * Loads a base into the registry.
     * @param {string} directory The directory of the base
     * @param {string[]} file The file location of the base
     * @returns {?Base}
     */
    public load(directory: string, file: string[]): V | null {
        const loc = join(directory, ...file);
        let base: V | null = null;
        try {
            const Base = ((req): any => req.default || req)(require(loc));
            if (!isClass(Base)) throw new TypeError('The exported structure is not a class.');
            base = this.add(new Base(this.client, this));
        } catch (err) {
            if (this.client.listenerCount('error')) this.client.emit('error', `Failed to load file ${loc}. Error:\n${err.stack || err}`);
            else throw err;
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
    public add(base: V): V | null {
        // @ts-ignore
        if (!(base instanceof this.holds)) throw new TypeError(`Only ${this} may be stored in this store`);
        const existing = this.get(base.id);
        if (existing) this.delete(existing.id);
        else if (this.client.listenerCount('baseLoaded')) this.client.emit('baseLoaded', base);
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
    private static async walk<V extends Base, T extends BaseRegistry<V>>(registry: T, directory = registry.userDirectory): Promise<true | (V | null)[]> {
        const files = await scan(directory, { filter: (stats, path): boolean => stats.isFile() && extname(path) === '.js' })
            .catch((): void => { ensureDir(directory); });
        if (!files) return true;
        return Promise.all([...files.keys()].map((file): V | null => registry.load(directory, relative(directory, file).split(sep))));
    }
    
    /** @private */
    public static get [Symbol.species](): typeof Collection {
        return Collection;
    }
}