import { join, extname, relative, sep } from 'path';
import { Collection, Constructable } from 'discord.js';
import * as fs from 'fs-nextra';
import { Util } from '../../util/Util';
import { Piece } from './Piece';
import { InlustrisClient } from '../../Client';
import { List } from '../../util/List';
const { isClass } = Util;

/**
 * The common base for all stores.
 * @extends {external:Collection}
 */
export abstract class Store<K, V extends Piece, VConstructor = Constructable<V>> extends Collection<K, V> {
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
        Object.defineProperty(this, 'name', { value: name })

        /**
         * The type of structure this store holds
         * @name Store#holds
         * @type {Piece}
         * @readonly
         */
        Object.defineProperty(this, 'holds', { value: holds })

        /**
         * The core directories pieces of this store can hold
         * @name Store#coreDirectories
         * @type {List<string>}
         * @readonly
         * @private
         */
        Object.defineProperty(this, 'coreDirectories', { value: new List<string>() })
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

    public load(directory: string, file: string[]): Piece | null {
        const loc = join(directory, ...file);
        let piece: any = null;
        try {
            const Piece = ((req): any => req.default || req)(require(loc));
            if (!isClass(Piece)) throw new TypeError('The exported structure is not a class');
            
        }
    }
}