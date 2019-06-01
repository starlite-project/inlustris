"use strict";
// Copyright (c) 2017-2019 Dirigeants. All rights reserved. MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
/**
 * Internal utility class.
 */
class Util {
    /**
     * This class may not be initialized with new
     * @throws {Error}
     */
    constructor() {
        throw new Error('This class may not be initiated with new');
    }
    /**
     * Checks if a value is an [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).
     * @param {*} inp Input to check
     * @returns {boolean}
     */
    static isObject(inp) {
        return inp && inp.constructor === Object;
    }
    /**
     * Checks if a value is a [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) type.
     * @param {*} inp Input to check
     * @returns {boolean}
     */
    static isPrimitive(inp) {
        return this.PRIMITIVE_TYPES.includes(typeof inp);
    }
    /**
     * Deeply clones a value.
     * @param {*} source Value to clone
     * @returns {*}
     */
    static deepClone(source) {
        if (source === null || this.isPrimitive(source))
            return source;
        if (Array.isArray(source)) {
            const output = [];
            for (const value of source)
                output.push(this.deepClone(value));
            return output;
        }
        if (this.isObject(source)) {
            const output = {};
            for (const [key, value] of Object.entries(source))
                output[key] = this.deepClone(value);
            return output;
        }
        if (source instanceof Map) {
            const output = new source.constructor();
            for (const [key, value] of source.entries())
                output.set(key, this.deepClone(value));
            return output;
        }
        if (source instanceof Set) {
            const output = new source.constructor();
            for (const value of source.values())
                output.add(this.deepClone(value));
            return output;
        }
        return source;
    }
    /**
     * Merges a given object with a set of defaults.
     * @param {Object} def Defaults to add
     * @param {Object} given Given object to add to
     * @returns {Object}
     */
    static mergeDefault(def, given) {
        if (!given)
            return this.deepClone(def);
        for (const key in def) {
            if (typeof given[key] === 'undefined')
                given[key] = this.deepClone(def[key]);
            else if (this.isObject(given[key]))
                given[key] = this.mergeDefault(def[key], given[key]);
        }
        return given;
    }
    /**
     * Checks if a given input is a class.
     * @param {Function} inp The input to check
     * @returns {boolean}
     */
    static isClass(inp) {
        return typeof inp === 'function' &&
            typeof inp.prototype === 'object' &&
            inp.toString().substring(0, 5) === 'class';
    }
    /**
     * Checks if a given input is a Promise.
     * @param {Promise} input The input to check
     * @returns {boolean}
     */
    static isThenable(input) {
        if (!input)
            return false;
        return (input instanceof Promise) ||
            (input !== Promise.prototype && Util.isFunction(input.then) && Util.isFunction(input.catch));
    }
    /**
     * Checks if the given input is a Function.
     * @param {Function} input The input to check
     * @returns {boolean}
     */
    static isFunction(input) {
        return typeof input === 'function';
    }
}
/**
 * Promisified version of `setTimeout` to be used with await.
 * @param {number} delay The amount of time in ms to delay
 * @param {*} [args] Any args to pass to the .then (mostly pointless in this form)
 * @returns {Promise<*>}
 * @method
 * @static
 */
Util.sleep = util_1.promisify(setTimeout);
Util.PRIMITIVE_TYPES = ['string', 'number', 'bigint', 'boolean'];
exports.Util = Util;
