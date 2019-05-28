import { Piece, PieceOptions } from './Piece';
import { Store } from './Store';

export interface AliasPieceOptions extends PieceOptions {
    aliases?: string[];
}

/**
 * The base piece for all pieces with aliases.
 * @extends {Piece}
 */
export abstract class AliasPiece extends Piece {
    public aliases: string[]
    public constructor(store: Store<string, Piece, typeof Piece>, file: string[], directory: string, options: AliasPieceOptions = {}) {
        super(store, file, directory, options);

        /**
         * The aliases for this piece
         * @type {string[]}
         */
        this.aliases = options.aliases || [];
    }

    /**
     * Defines the `JSON.stringify` behavior of this piece.
     * @returns {Object}
     */
    public toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            aliases: this.aliases.slice(0)
        };
    }
}