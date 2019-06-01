import { Collection } from 'discord.js';
import { InlustrisClient } from '../Client';
import { Base } from '../structures/Base';
/**
 * The base registry for all stores to extend.
 * @abstract
 */
export declare abstract class BaseRegistry<V extends Base, VConstructor = typeof Base> extends Collection<string, V> {
    readonly holds: VConstructor;
    readonly client: InlustrisClient;
    readonly name: string;
    private readonly coreDirectories;
    /**
     * Creates a new BaseRegistry.
     * @param {InlustrisClient} client The client
     * @param {string} name The name of the registry
     * @param {Function} holds The class that the registry will use to create instances
     */
    constructor(client: InlustrisClient, name: string, holds: VConstructor);
    /**
     * Registers a core directory.
     * @param {string} directory The directory to register
     * @returns {this}
     */
    registerCoreDirectory(directory: string): this;
    /**
     * The directory where the bases are found
     * @type {string}
     */
    readonly userDirectory: string;
    /**
     * Loads all the bases found in the core directories.
     * @returns {Promise<number>}
     */
    loadAll(): Promise<number>;
    /**
     * Loads a base into the registry.
     * @param {string} directory The directory of the base
     * @param {string[]} file The file location of the base
     * @returns {?Base}
     */
    load(directory: string, file: string[]): V | null;
    /**
     * Adds a base to the registry.
     * @param {Base} base The base to be added
     * @returns {Base}
     */
    add(base: V): V | null;
    /**
     * Walks through a directory and loads all the bases into the provided registry
     * @param {BaseRegistry} registry The registry to load files in
     * @param {string} [directory=registry.userDirectory] The directory to load files from
     * @returns {Promise<Base[]>}
     * @private
     */
    private static walk;
    /** @private */
    static readonly [Symbol.species]: typeof Collection;
}
