import { join, extname, relative, sep } from 'path';
import { Collection, Constructable } from 'discord.js';
import * as fs from 'fs-nextra';
import { Util } from '../../util/Util';
import { Piece } from './Piece';
import { InlustrisClient } from '../../Client';
import { List } from '../../util/List';
const { isClass } = Util;

export interface Constructor<C> {
    new(...args: any[]): C;
}

/**
 * The common base for all stores.
 * @extends {external:Collection}
 */
export abstract class Store<K, V extends Piece, VConstructor = Constructor<V>> extends Collection<K, V> {
    public readonly client: InlustrisClient;
    public readonly holds: VConstructor;
    public readonly name: string;
    private readonly coreDirectories: List<string>;

    public constructor(client: InlustrisClient, name: string, holds: VConstructor) {
        super();

        /**
         * The client that initialized this store
         * @type {InlustrisClient}
         * @name Store#client
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * The name of what this holds
         * @type {string}
         * @name Store#name
         * @readonly
         */
        Object.defineProperty(this, 'name', { value: name });

        /**
         * The type of structure this store holds
         * @name Store#holds
         * @type {Piece}
         * @readonly
         */
        Object.defineProperty(this, 'holds', { value: holds });

        /**
         * The core directories pieces of this store can hold
         * @name Store#coreDirectories
         * @type {List<string>}
         * @readonly
         * @private
         */
        Object.defineProperty(this, 'coreDirectories', { value: new List<string>() });
    }

    /**
     * The directory of local pieces relative to where you run Inlustris from.
     * @type {string}
     * @readonly
     */
    public get userDirectory(): string {
        return join(this.client.userBaseDirectory, this.name);
    }

    /**
     * Registers a core directory to check for pieces
     * @param {string} directory The directory to check for core pieces
     * @returns {this}
     */
    public registerCoreDirectory(directory: string): this {
        this.coreDirectories.add(directory + this.name);
        return this;
    }

    /**
     * Initializes all pieces in this store.
     * @returns {Promise<Array<*>>}
     */
    public init(): Promise<any[]> {
        return Promise.all(this.map((piece): any => piece.enabled ? piece.init() : piece.unload()));
    }

    /**
     * Sets up a piece in the store.
     * @param {Piece} piece The piece to set up
     * @returns {?Piece}
     */
    // @ts-ignore
    public set(piece: V): V | null {
        // @ts-ignore
        if (!(piece instanceof this.holds)) throw new TypeError(`Only ${this} may be stored in this Store.`);
        const existing = this.get(piece.name as unknown as K);
        if (existing) this.delete(existing);
        else if (this.client.listenerCount('pieceLoaded')) this.client.emit('pieceLoaded', piece);
        super.set(piece.name as unknown as K, piece);
        return piece;
    }

    /**
     * Resolves a string or piece into a piece instance.
     * @param {Piece | string} name The name of the piece object or the piece instance
     * @returns {?Piece}
     */
    public resolve(name: V | K): V | undefined {
        // @ts-ignore
        if (name instanceof this.holds) return name as V;
        return this.get(name as K);
    }

    /**
     * Deletes a piece from the store.
     * @param {Piece | string} name The name of the piece, or a piece instance
     * @returns {boolean}
     */
    public delete(name: K | V): boolean {
        const piece = this.resolve(name);
        if (!piece) return false;
        super.delete(piece.name as unknown as K);
        return true;
    }

    /**
     * The `toString()` method of this store.
     * @returns {string}
     */
    public toString(): string {
        return this.name;
    }

    /**
     * Loads a piece into Inlustris so it can be saved in the store.
     * @param {string} directory The directory the file is located in
     * @param {string[]} file A string or array of strings showing where the file is located
     * @returns {?Piece}
     */
    public load(directory: string, file: string[]): V | null {
        const loc = join(directory, ...file);
        let piece: V | null = null;
        try {
            const Piece = ((req): any => req.default || req)(require(loc));
            if (!isClass(Piece)) throw new TypeError('The exported structure is not a class.');
            piece = this.set(new Piece(this, file, directory));
        } catch (err) {
            throw err;
        }
        delete require.cache[loc];
        module.children.pop();
        return piece;
    }

    /**
     * Loads all of the Pieces from both the user and core directories.
     * @returns {Promise<number>} The number of pieces loaded
     */
    public async loadAll(): Promise<number> {
        this.clear();
        for (const directory of this.coreDirectories) await Store.walk(this as any, directory);
        await Store.walk(this as any);
        return this.size;
    }

    /**
     * Walks through the core directories to load all the pieces for the store.
     * @param {Store} store The store we're loading into
     * @param {string} [directory=store.userDirectory] The directory to walk in
     * @returns {Promise<Array<Piece>>}
     * @private
     */
    private static async walk<K, V extends Piece, T extends Store<K, V>>(store: T, directory: string = store.userDirectory): Promise<true | (V | null)[]> {
        const files = await fs.scan(directory, { filter: (stats, path): boolean => stats.isFile() && extname(path) === '.js' })
            .catch((): void => { if (store.client.options.createPiecesFolders) fs.ensureDir(directory).catch((err): boolean => store.client.emit('error', err)); });

        if (!files) return true;
        return Promise.all([...files.keys()].map((file): V | null => store.load(directory, relative(directory, file).split(sep))));
    }

    public static get [Symbol.species](): typeof Collection {
        return Collection;
    }
}