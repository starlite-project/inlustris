/// <reference types="node" />
export interface AnyObj {
    [K: string]: any;
}
/**
 * Internal utility class.
 */
export declare class Util {
    /**
     * This class may not be initialized with new
     * @throws {Error}
     */
    private constructor();
    /**
     * Promisified version of `setTimeout` to be used with await.
     * @param {number} delay The amount of time in ms to delay
     * @param {*} [args] Any args to pass to the .then (mostly pointless in this form)
     * @returns {Promise<*>}
     * @method
     * @static
     */
    static sleep: typeof setTimeout.__promisify__;
    static PRIMITIVE_TYPES: string[];
    /**
     * Checks if a value is an [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).
     * @param {*} inp Input to check
     * @returns {boolean}
     */
    static isObject(inp: any): boolean;
    /**
     * Checks if a value is a [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) type.
     * @param {*} inp Input to check
     * @returns {boolean}
     */
    static isPrimitive(inp: any): inp is string | boolean | bigint | number;
    /**
     * Deeply clones a value.
     * @param {*} source Value to clone
     * @returns {*}
     */
    static deepClone(source: any): any;
    /**
     * Merges a given object with a set of defaults.
     * @param {Object} def Defaults to add
     * @param {Object} given Given object to add to
     * @returns {Object}
     */
    static mergeDefault<T>(def: AnyObj, given: AnyObj): T;
    /**
     * Checks if a given input is a class.
     * @param {Function} inp The input to check
     * @returns {boolean}
     */
    static isClass(inp: any): boolean;
    /**
     * Checks if a given input is a Promise.
     * @param {Promise} input The input to check
     * @returns {boolean}
     */
    static isThenable(input: any): boolean;
    /**
     * Checks if the given input is a Function.
     * @param {Function} input The input to check
     * @returns {boolean}
     */
    static isFunction(input: any): input is Function;
}
