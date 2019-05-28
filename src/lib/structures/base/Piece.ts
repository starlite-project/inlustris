import { Store } from './Store';
import { InlustrisClient } from '../../Client';
import { join } from 'path';

export interface PieceOptions {
    enabled?: boolean;
    name?: string;
}

/**
 * The base piece from which all pieces extend.
 */
export abstract class Piece {
    public readonly client: InlustrisClient;
    public name: string;
    public enabled: boolean;
    public store: Store<string, Piece, typeof Piece>;
    public directory: string;
    public file: string[];
    public constructor(store: Store<string, Piece, typeof Piece>, file: string[], directory: string, options: PieceOptions = {}) {
        /**
         * The client this Piece was created with
         * @type {InlustrisClient}
         */
        this.client = store.client;

        /**
         * The file location where this Piece is stored
         * @type {string[]}
         */
        this.file = file;

        /**
         * The name of the Piece
         * @type {string}
         */
        this.name = options.name || file[file.length - 1].slice(0, -3);

        /**
         * Whether the piece is enabled or not
         * @type {boolean}
         */
        this.enabled = options.enabled || true;

        /**
         * The store this Piece is from
         * @type {Store}
         */
        this.store = store;

        /**
         * The base directory this Piece is stored in
         */
        this.directory = directory;
    }

    /**
     * The type of Piece this is
     * @readonly
     * @type {string}
     */
    public get type(): string {
        return this.store.name.slice(0, -1);
    }

    /**
     * The absolute path this Piece is located at
     * @type {string}
     * @readonly
     */
    public get path(): string {
        return join(this.directory, ...this.file);
    }

    /**
     * Reloads this piece.
     * @returns {Promise<Piece>}
     */
    public async reload(): Promise<Piece> {
        const piece = this.store.load(this.directory, this.file)!;
        await piece.init();

        if (this.client.listenerCount('pieceReloaded')) this.client.emit('pieceReloaded', piece);
        return piece;
    }

    /**
     * Unloads this piece.
     * @returns {void}
     */
    public unload(): boolean {
        if (this.client.listenerCount('pieceUnloaded')) this.client.emit('pieceUnloaded', this);
        return this.store.delete(this);
    }

    /**
     * Disables this piece.
     * @chainable
     * @returns {this}
     */
    public disable(): this {
        if (this.client.listenerCount('pieceDisabled')) this.client.emit('pieceDisabled', this);
        this.enabled = false;
        return this;
    }

    /**
     * Enables this piece.
     * @chainable
     * @returns {this}
     */
    public enable(): this {
        if (this.client.listenerCount('pieceEnabled')) this.client.emit('pieceEnabled', this);
        this.enabled = true;
        return this;
    }

    /**
     * The init method to be optionally overwritten in actual pieces
     * @returns {*}
     * @abstract
     */
    public async init(): Promise<any> {
        // Optionally defined in child classes
    }

    /**
     * The `toString()` method of this piece.
     * @returns {string}
     */
    public toString(): string {
        return this.name;
    }

    /**
     * Defines the `JSON.stringify()` behavior of this piece.
     * @returns {Object}
     */
    public toJSON(): Record<string, any> {
        return {
            directory: this.directory,
            file: this.file, 
            path: this.path,
            name: this.name,
            type: this.type,
            enabled: this.enabled
        };
    }
}