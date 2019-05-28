import { Collection } from 'discord.js';
import { InlustrisClient } from '../../Client';
import { AliasPiece } from './AliasPiece';
import { Constructor, Store } from './Store';

/**
 * The common base for all stores with aliases.
 * @extends {Store}
 */
export abstract class AliasStore<K, V extends AliasPiece, VConstructor = Constructor<V>> extends Store<K, V, VConstructor> {
    public aliases: Collection<K, V>
    public constructor(client: InlustrisClient, name: string, holds: VConstructor) {
        super(client, name, holds);

        /**
         * The different aliases that represent the pieces in this store
         * @type {external:Collection}
         */
        this.aliases = new Collection();
    }

    /**
     * Gets a piece from the store, or from the alias collection if necessary.
     * @param {string} name The name or alias of the piece
     * @returns {?Piece}
     */
    public get(name: K): V | undefined {
        return super.get(name) || this.aliases.get(name);
    }

    /**
     * Returns a boolean if the piece or alias is found within the store.
     * @param {string} name A piece or alias name
     * @returns {boolean}
     */
    public has(name: K): boolean {
        return super.has(name) || this.aliases.has(name);
    }

    /**
     * Sets up an alias piece in this store.
     * @param {AliasPiece} piece Piece to set up
     * @returns {?AliasPiece}
     */
    // @ts-ignore
    public set(piece: V): V | undefined {
        const argument = super.set(piece);
        if (!argument) return undefined;
        for (const alias of argument.aliases) this.aliases.set(alias as unknown as K, argument);
        return argument;
    }

    /**
     * Deletes an alias piece from this store.
     * @param {AliasPiece | string} name An alias piece or a string representing an alias piece
     * @returns {boolean} Whether or not the piece was successfully deleted
     */
    public delete(name: K | V): boolean {
        const argument = this.resolve(name);
        if (!argument) return false;
        for (const alias of argument.aliases) this.aliases.delete(alias as unknown as K);
        return super.delete(argument);
    }

    /**
     * Clears the pieces and aliases from this store.
     * @returns {void}
     */
    public clear(): void {
        super.clear();
        this.aliases.clear();
    }
}