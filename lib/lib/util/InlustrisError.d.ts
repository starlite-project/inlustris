/**
 * An error class used to make error throwing universal.
 * @extends {Error}
 */
export declare class InlustrisError extends Error {
    private code;
    constructor(key: string, ...args: string[]);
    readonly name: string;
}
