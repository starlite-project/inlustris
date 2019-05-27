
/**
 * A Set with additional utility methods.
 * @extends {Set}
 */
export class List<V> extends Set<V> {
    private _array: V[] | null;
    public static readonly default: typeof List = List;
    public constructor(iterable?: readonly V[]) {
        super(iterable);

        /**
         * Cached array for the `array()` method - will be reset to `null` whenever `add()` or `delete()` is called
         * @name List#_array
         * @type {?Array}
         * @private
         */
        Object.defineProperty(this, '_array', { value: null, writable: true, configurable: true });
    }

    
    public add(value: V): this {
        this._array = null;
        return super.add(value);
    }

    public delete(value: V): boolean {
        this._array = null;
        return super.delete(value);
    }

    /**
     * Creates an ordered array of the values of this list, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the list, or if you change the length of the array
     * itself. If you don't want this caching behavoir, use `[...list.values()]` or
     * `Array.from(list.values())` instead.
     * @returns {Array}
     */
    public array(): V[] {
        if (!this._array || this._array.length !== this.size) this._array = [...this.values()];
        return this._array;
    }

    /**
     * Obtains the first value(s) in this list.
     * @param {number} [amount] Amount of values to obtain from the beginning
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values, starting from the end if
     * amount is negative
     */
    public first(): V | undefined;
    public first(amount: number): V[];
    public first(amount?: number): V | V[] | undefined {
        if (typeof amount === 'undefined') return this.values().next().value;
        if (amount < 0) return this.last(amount * -1);
        amount = Math.min(this.size, amount);
        const iter = this.values();
        return Array.from({ length: amount }, (): V => iter.next().value);
    }

    /**
     * Obtains the last value(s) in this list. This relies on {@link List#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of values to obtain from the end
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values, starting from the start if
     * amount is negative
     */
    public last(): V | undefined;
    public last(amount: number): V[];
    public last(amount?: number): V | V[] | undefined {
        const arr = this.array();
        if (typeof amount === 'undefined') return arr[arr.length - 1];
        if (amount < 0) return this.first(amount * -1);
        if (!amount) return [];
        return arr.slice(-amount);
    }

    /**
     * Obtains unique random value(s) from this list. This relies on {@link List#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of values to obtain randomly
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values
     */
    public random(): V;
    public random(amount: number): V[];
    public random(amount?: number): V | V[] | undefined {
        let arr = this.array();
        if (typeof amount === 'undefined') return arr[Math.floor(Math.random() * arr.length)];
        if (arr.length === 0 || !amount) return [];
        arr = arr.slice();
        return Array.from({ length: amount }, (): V => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }

    /**
     * Searches for a single item where the given function returns a truthy value. This behaves like
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * @param {Function} fn The function to test with (should return boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {*}
     * @example list.find(user => user.username === 'Bob');
     */
    public find(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): V | undefined {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [val1, val2] of this.entries()) {
            if (fn(val1, val2, this)) return val1;
        }
        return undefined;
    }

    /**
     * Removes entries that satisfy the provided filter function.
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {*} [thisArg] Value used as `this` when executing function
     * @returns {number} The number of removed entries
     */
    public sweep(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): number {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        const previousSize = this.size;
        for (const [val1, val2] of this.entries()) {
            if (fn(val1, val2, this)) this.delete(val1);
        }
        return previousSize - this.size;
    }

    /**
     * Identical to
     * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
     * but returns a {@link List} instead of an Array.
     * @param {Function} fn The function used to test with (should return boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List}
     * @example list.filter(user => user.username === 'Bob');
     */
    public filter(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): List<V> {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        // @ts-ignore
        const results = new this.constructor[Symbol.species]();
        for (const [val1, val2] of this.entries()) {
            if (fn(val1, val2, this)) results.add(val1);
        }
        return results;
    }

    /**
     * Partitions the list into two lists where the first list
     * contains the items that passed and the second contains the items that failed.
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List[]}
     * @example const [big, small] = list.partition(guild => guild.memberCount > 250);
     */
    public partition(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): [List<V>, List<V>] {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        // @ts-ignore
        const results: [List<V>, List<V>] = [new this.constructor[Symbol.species](), new this.constructor[Symbol.species]()];
        for (const [val1, val2] of this.entries()) {
            if (fn(val1, val2, this)) {
                results[0].add(val1);
            } else {
                results[1].add(val1);
            }
        }
        return results;
    }

    /**
     * Maps each item to another value into an array. Identical in behavior to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     * @param {Function} fn Function that produces an element of the new array, taking three arguments
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {Array}
     * @example list.map(user => user.tag);
     */
    public map<T>(fn: (val1: V, val2: V, list: this) => T, thisArg?: any): T[] {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        const iter = this.entries();
        return Array.from({ length: this.size }, (): T => {
            const [val1, val2] = iter.next().value;
            return fn(val1, val2, this);
        });
    }

    /**
     * Maps each item to another into a list. Identical in behavior to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     * @param {Function} fn Function that produces an element of the new list, taking three arguments
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List}
     * @example list.mapValues(user => user.tag);
     */
    public mapValues<T>(fn: (val1: V, val2: V, list: this) => T, thisArg?: any): List<T> {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        // @ts-ignore
        const list = new this.constructor[Symbol.species]();
        for (const [val1, val2] of this.entries()) list.add(fn(val1, val2, this));
        return list;
    }

    /**
     * Checks if there exists an item that passes a test. Identical in behavior to
     * [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {boolean}
     * @example list.some(user => user.discriminator === '0000');
     */
    public some(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): boolean {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [val1, val2] of this.entries()) {
            if (fn(val1, val2, this)) return true;
        }
        return false;
    }

    /**
     * Checks if all items pass a test. Identical in behavior to
     * [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {boolean}
     * @example list.every(user => !user.bot);
     */
    public every(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): boolean {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [val1, val2] of this.entries()) {
            if (!fn(val1, val2, this)) return false;
        }
        return true;
    }

    /**
     * Applies a function to produce a single value. Identical in behavior to
     * [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
     * @param {Function} fn Function used to reduce, taking four arguments; `accumulator`, `currentValue`, `currentValue`,
     * and `list`
     * @param {*} [initialValue] Starting value for the accumulator
     * @returns {*}
     * @example list.reduce((acc, guild) => acc + guild.memberCount, 0);
     */
    public reduce<T>(fn: (accumulator: any, val1: V, val2: V, list: this) => T, initialValue?: T): T {
        let accumulator!: T;
        if (typeof initialValue !== 'undefined') {
            accumulator = initialValue;
            for (const [val1, val2] of this.entries()) accumulator = fn(accumulator, val1, val2, this);
            return accumulator;
        }
        let first = true;
        for (const [val1, val2] of this.entries()) {
            if (first) {
                accumulator = val1 as unknown as T;
                first = false;
                continue;
            }
            accumulator = fn(accumulator, val1, val2, this);
        }

        if (first) {
            throw new TypeError('Reduce of empty list with no initial value');
        }
        return accumulator;
    }

    /**
     * Identical to
     * [Set.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach),
     * but returns the list instead of undefined.
     * @param {Function} fn Function to execute for each element
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List}
     * @example
     * list
     *  .each(user => console.log(user.username))
     *  .filter(user => user.bot)
     *  .each(user => console.log(user.username));
     */
    public each(fn: (val1: V, val2: V, list: Set<V>) => any, thisArg?: any): this {
        this.forEach(fn, thisArg);
        return this;
    }

    /**
     * Runs a function on the list and returns the list.
     * @param {Function} fn Function to execute
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List}
     * @example
     * list
     *  .tap(list => console.log(list.size))
     *  .filter(user => user.bot)
     *  .tap(list => console.log(list.size));
     */
    public tap(fn: (list: this) => any, thisArg?: any): this {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        fn(this);
        return this;
    }

    /**
     * Creates an identical shallow copy of this list.
     * @returns {List}
     * @example const newList = someList.clone();
     */
    public clone(): List<V> {
        // @ts-ignore
        return new this.constructor[Symbol.species](this);
    }

    /**
     * Combines this list with others into a new list. None of the source lists are modified.
     * @param {...List} lists Lists to merge
     * @returns {List}
     * @example const newList = someList.concat(someOtherList, anotherList, ohBoyAList);
     */
    public concat(...lists: List<V>[]): List<V> {
        const newList = this.clone();
        for (const list of lists) {
            for (const value of this.values()) newList.add(value);
        }
        return newList;
    }

    /**
     * Checks if this list shares identical value-value parings with another.
     * This is different to checking for equality using equal-signs, because
     * the collections may be different objects, but contain the same data.
     * @param {List} list List to compare with
     * @returns {boolean} Whether the collections have identical contents
     */
    public equals(list: List<V>): boolean {
        if (!list) return false;
        if (this === list) return true;
        if (this.size !== list.size) return false;
        for (const val of this.values()) {
            if (!list.has(val)) return false;
        }
        return true;
    }

    /**
     * The sort() method sorts the elements of a list and returns it.
     * The sort is not necessarily stable. The default sort order is according to string Unicode points.
     * @param {Function} [compareFunction] Specifies a function that defines the sort order.
     * If omitted, the list is sorted according to each character's Unicode point value,
     * according to the string conversion of each element.
     * @returns {List}
     */
    public sort(compareFunction: (firstValue: V, secondValue: V, firstValue2: V, secondValue2: V) => number = (x, y): number => Number(x > y) || Number(x === y) - 1): this {
        const entries = [...this.entries()];
        entries.sort((a, b): number => compareFunction(a[1], b[1], a[0], b[0]));
        this.clear();
        for (const val of this.values()) {
            this.add(val);
        }
        return this;
    }
}