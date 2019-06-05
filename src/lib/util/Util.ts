// Copyright (c) 2017-2019 Dirigeants. All rights reserved. MIT License.

import { Constructable, Guild, GuildResolvable, GuildMember, GuildChannel, Message } from 'discord.js';
import { promisify } from 'util';
import { InlustrisClient } from '../Client';

const TOTITLECASE: RegExp = /[A-Za-zÀ-ÖØ-öø-ÿ]\S*/g;

export interface AnyObj {
    [K: string]: any;
}

/**
 * Internal utility class.
 */
export class Util {
    /**
     * Object with certain title case variants for words
     * @type {Object<string, string>}
     * @static
     */
    public static titleCaseVariants: { [s: string]: string } = {
        textchannel: 'TextChannel',
        voicechannel: 'VoiceChannel',
        categorychannel: 'CategoryChannel',
        guildmember: 'GuildMember'
    };

    /**
     * This class may not be initialized with new
     * @throws {Error}
     */
    private constructor() {
        throw new Error('This class may not be initiated with new');
    }

    /**
     * Promisified version of `setTimeout` to be used with await.
     * @param {number} delay The amount of time in ms to delay
     * @param {*} [args] Any args to pass to the .then (mostly pointless in this form)
     * @returns {Promise<*>}
     * @method
     * @static
     */
    public static sleep = promisify(setTimeout);

    public static PRIMITIVE_TYPES: string[] = ['string', 'number', 'bigint', 'boolean'];

    /**
     * Checks if a value is an [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).
     * @param {*} inp Input to check
     * @returns {boolean}
     */
    public static isObject(inp: any): boolean {
        return inp && inp.constructor === Object;
    }

    /**
     * Checks if a value is a [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) type.
     * @param {*} inp Input to check
     * @returns {boolean}
     */
    public static isPrimitive(inp: any): inp is string | boolean | bigint | number {
        return this.PRIMITIVE_TYPES.includes(typeof inp);
    }

    /**
     * Converts a string to Title Case.
     * @param {string} str The string to convert to title case
     * @returns {string}
     */
    public static toTitleCase(str: string): string {
        return str.replace(TOTITLECASE, (txt): string => Util.titleCaseVariants[txt] || txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    /**
     * Merges two objects.
     * @param {*} objTarget The object to be merged
     * @param {*} objSource The object to merge
     * @returns {*}
     */
    // @ts-ignore
    public static mergeObjects<T = Record<string, any>, S = Record<string, any>>(objTarget: T = {}, objSource: S): T & S {
        // @ts-ignore
        for (const key in objSource) objTarget[key] = Util.isObject(objSource[key]) ? Util.mergeObjects(objTarget[key], objSource[key]) : objSource[key];
        return objTarget as T & S;
    }

    /**
     * Turns a dotted path into a json object.
     * @param {string} path The dotted path
     * @param {*} value The value
     * @param {Object<string, *>} [obj={}] The object to edit
     * @returns {*}
     */
    public static makeObject<T = Record<string, any>, S = Record<string, any>>(path: string, value: any, obj: Record<string, any> = {}): T & S {
        if (path.indexOf('.') === 1) {
            obj[path] = value;
        } else {
            const route = path.split('.');
            const lastKey = route.pop();
            let reference = obj;
            for (const key of route) {
                if (!reference[key]) reference[key] = {};
                reference = reference[key];
            }
            reference[lastKey!] = value;
        }
        return obj as T & S;
    }

    /**
     * Deeply clones a value.
     * @param {*} source Value to clone
     * @returns {*}
     */
    public static deepClone(source: any): any {
        if (source === null || this.isPrimitive(source)) return source;
        if (Array.isArray(source)) {
            const output: any[] = [];
            for (const value of source) output.push(this.deepClone(value));
            return output;
        }
        if (this.isObject(source)) {
            const output: AnyObj = {};
            for (const [key, value] of Object.entries(source)) output[key] = this.deepClone(value);
            return output;
        }
        if (source instanceof Map) {
            const output = new (source.constructor as Constructable<Map<any, any>>)();
            for (const [key, value] of source.entries()) output.set(key, this.deepClone(value));
            return output;
        }
        if (source instanceof Set) {
            const output = new (source.constructor as Constructable<Set<any>>)();
            for (const value of source.values()) output.add(this.deepClone(value));
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
    public static mergeDefault<T>(def: AnyObj, given: AnyObj): T {
        if (!given) return this.deepClone(def);
        for (const key in def) {
            if (typeof given[key] === 'undefined') given[key] = this.deepClone(def[key]);
            else if (this.isObject(given[key])) given[key] = this.mergeDefault(def[key], given[key]);
        }

        return given as any;
    }

    /**
     * Checks if a given input is a class.
     * @param {Function} inp The input to check
     * @returns {boolean}
     */
    public static isClass(inp: any): boolean {
        return typeof inp === 'function' &&
            typeof inp.prototype === 'object' &&
            inp.toString().substring(0, 5) === 'class';
    }

    /**
     * Checks if a given input is a Promise.
     * @param {Promise} input The input to check
     * @returns {boolean}
     */
    public static isThenable(input: any): boolean {
        if (!input) return false;
        return (input instanceof Promise) ||
            (input !== Promise.prototype && Util.isFunction(input.then) && Util.isFunction(input.catch));
    }

    /**
     * Checks if the given input is a Function.
     * @param {Function} input The input to check
     * @returns {boolean}
     */
    public static isFunction(input: any): input is Function {
        return typeof input === 'function';
    }

    /**
     * Convert an object to a tuple.
     * @param {Object<string, *>} obj The object to convert
     * @param {string} [prefix=''] The prefix for the key
     * @returns {Array<Array<*>>}
     */
    public static objectToTuples(obj: Record<string, any>, prefix: string = ''): [string, any][] {
        const entries: [string, any][] = [];
        for (const [key, value] of Object.entries(obj)) {
            if (Util.isObject(value)) {
                entries.push(...Util.objectToTuples(value, `${prefix}${key}.`));
            } else {
                entries.push([`${prefix}${key}`, value]);
            }
        }

        return entries;
    }

    /**
     * Compares if both arrays are strictly equal.
     * @param {any[]} arr1 The first array to compare
     * @param {any[]} arr2 The second array to compare
     * @returns {boolean}
     */
    public static arrayStrictEquals(arr1: any[], arr2: any[]): boolean {
        if (arr1 === arr2) return true;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    public static calcShards(shards: number, guildsPerShard: number): number {
        return Math.ceil(shards * (1000 / guildsPerShard));
    }
}
