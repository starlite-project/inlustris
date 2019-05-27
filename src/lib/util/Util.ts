import { Constructable } from 'discord.js';

export interface AnyObj {
    [K: string]: any;
}

export class Util {
    public static PRIMITIVE_TYPES: string[] = ['string', 'number', 'bigint', 'boolean'];

    public static isObject(inp: any): boolean {
        return inp && inp.constructor === Object;
    }

    public static isPrimitive(inp: any): inp is string | boolean | bigint | number {
        return this.PRIMITIVE_TYPES.includes(typeof inp);
    }

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
            const output = new (source.constructor() as Constructable<Map<any, any>>)();
            for (const [key, value] of source.entries()) output.set(key, this.deepClone(value));
            return output;
        }
        if (source instanceof Set) {
            const output = new (source.constructor() as Constructable<Set<any>>)();
            for (const value of source.values()) output.add(this.deepClone(value));
            return output;
        }
        return source;
    }

    public static mergeDefault<T>(def: AnyObj, given: AnyObj): T {
        if (!given) return this.deepClone(def);
        for (const key in def) {
            if (typeof given[key] === 'undefined') given[key] = this.deepClone(def[key]);
            else if (this.isObject(given[key])) given[key] = this.mergeDefault(def[key], given[key]);
        }

        return given as any;
    }
}